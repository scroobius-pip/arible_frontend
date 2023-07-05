import { Masonry } from 'masonic'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import GeneratedItem from './GeneratedItem'
import { Button, Progress } from '@nextui-org/react';
import { Category, Delete, Heart, Plus } from '@odyssoft/iconly-clone';
import { ModalContext } from '@/lib/ModalState';
import { AppContext } from '@/lib/AppState';
import GenerateButton from '../GenerateButton';
import { addPoseImage, ApiService, getImageSize, randomizeStyle } from '@/lib/api';
import { Generated, Person } from '@/types';
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from "debounce";
import { useImageDropCompressed } from '@/lib/useImageDropCompressed';

const listItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
};

function isSubmittedOrDone({ created_at, status }: Generated): boolean {
    const thirtyMinutes = 60 * 30 //seconds
    const now = new Date().getTime() / 1000 //seconds
    const diff = now - created_at

    // REMOVE PENDING JOBS THAT ARE OLDER THAN 30 MINUTES
    return (
        (typeof status === 'object' && 'Done' in status) ||
        (typeof status === 'object' && 'Submitted' in status) ||
        (typeof status === 'string' && 'Pending' === status && diff < thirtyMinutes)
    );
}


export default () => {
    const { setSelectedGenerated, setLoginModalVisible } = useContext(ModalContext)
    const { generatedList, selectedPerson, operations: { generateIStyle, deleteGenerated }, user, demoGeneratedCount } = useContext(AppContext)
    const { onDrop, result: results, uploading } = useImageDropCompressed()
    const [processedDroppedFileUrls, setProcessedDroppedFileUrls] = useState<string[]>([])

    const renderedList = useMemo(() => {
        return {
            ...generatedList,
            data: generatedList.data
                ?.filter(isSubmittedOrDone)
                .sort((a, b) => b.created_at - a.created_at) ?? []
        }
    }, [generatedList, selectedPerson,])


    const handleUnprocessed = (fileName: string, styleID: string) => {
        ApiService.getStyle(styleID).then(style => {
            if (style.data && selectedPerson) {
                const { width, height } = getImageSize(style.data)
                // const cloudinaryResizeUrl = `https://res.cloudinary.com/disn5401t/image/fetch/c_fill,h_${height},w_${width},f_auto,g_auto:faces/${fileName}`
                const cloudinaryResizeUrl = `https://cyggfpyiva.cloudimg.io/${fileName}?w=${width}&h=${height}&func=crop`
                const newStyle = addPoseImage(randomizeStyle(style.data), cloudinaryResizeUrl)
                if (!user && demoGeneratedCount >= 10) {
                    setLoginModalVisible(true)
                    return
                }
                generateIStyle(newStyle, selectedPerson.id)
            }
            setProcessedDroppedFileUrls(prev => [...prev, fileName])
        }).catch(console.log)
    }

    useEffect(() => {
        if (results) {
            const unprocessed = results.filter(r => !processedDroppedFileUrls.includes(r.fileName))
            unprocessed.forEach(r => {
                handleUnprocessed(r.fileName, r.styleID)
            })
        }
    }, [results])

    const _copyGenerated = (generated: Generated, imageFiles?: File[]) => {
        const { style_id } = generated

        if (imageFiles) {
            onDrop(imageFiles.map(f => ({
                file: f,
                styleID: style_id
            })))
            console.log('dropped file count: ', imageFiles.length)
            return
        }

        ApiService.getStyle(style_id).then(style => {
            if (style.data && selectedPerson) {
                const newStyle = randomizeStyle(style.data)
                console.log(demoGeneratedCount)
                if (!user && demoGeneratedCount >= 10) {
                    setLoginModalVisible(true)
                    return
                }
                generateIStyle(newStyle, selectedPerson.id)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const copyGeneratedDebounced = debounce(_copyGenerated, 1000, true)


    return <div className='p-4' style={{
        // height: 'calc(100vh - 20rem)'
    }}>
        {/* {!user && <h5 className='text-purple-500 font-medium'>Demo Mode: Login To Create Your Own Avatars</h5>} */}
        {/* <h6 className='animate-pulse'>Loading Might Get Stuck: Please Reload The Page Every Few Minutes</h6> */}
        {!user && !generatedList.loading && <Button size={'md'} className='font-extrabold py-4' auto color={'gradient'} icon={<Plus set="bold" />} onClick={() => {
            setLoginModalVisible(true)
        }}>Create Your Own Avatars <span className='p-2 text-xs font-bold text-neutral-200'>Requires Subscription</span></Button>}
        <div className='flex justify-end flex-row gap-2 py-4 w-full'>
            <Button
                auto
                flat
                //@ts-ignore
                color={'secondary'}
                icon={<Category set="bold" />}
                className='border-2 border-solid'
            >
                All
            </Button>
            <Button
                auto
                flat

                //@ts-ignore
                color={'secondary'}
                icon={<Heart set="bold" />}
            >
                {/* Favorites */}
            </Button>

        </div>
        <CachedGeneratedList deleteGenerated={(generated) => {
            if (selectedPerson) {
                deleteGenerated(generated.id, selectedPerson.id)
            }
        }} watermarked={false} copyGenerated={copyGeneratedDebounced} selectedPerson={selectedPerson} generatedList={renderedList} setSelectedGenerated={setSelectedGenerated} />
    </div>


}





const LoadingState = ({ text }: any) => {
    return <div className='w-full h-full flex items-center justify-center m-auto max-w-sm '>
        <Progress
            className='w-full'
            shadow
            color={'gradient'}
            // striped
            indeterminated
        />
        {/* <p className='text-neutral-300 animate-pulse capitalize text-center '>{text}</p> */}

    </div>
}

const EmptyStatePhoto = ({ personTraining, }: { personTraining: boolean }) => {
    const totalImages = 5;
    const { persons } = useContext(AppContext)
    const { setPersonCreatorModalVisible } = useContext(ModalContext)

    const imageStyles = useMemo(() => {
        const generateRandomPosition = () => {
            const x = Math.random() * 60 + 20;
            const y = Math.random() * 60 + 20;
            return { x, y };
        };

        const isOverlap = (pos1: { x: any; y: any; }, pos2: { x: any; y: any; }) => {
            const minDistance = 20; // 20% minimum distance
            return Math.abs(pos1.x - pos2.x) < minDistance && Math.abs(pos1.y - pos2.y) < minDistance;
        };

        const styles: any[] = [];

        for (let index = 0; index < totalImages; index++) {
            let position = generateRandomPosition();

            while (styles.some((style) => isOverlap(position, { x: parseFloat(style.left), y: parseFloat(style.top) }))) {
                position = generateRandomPosition();
            }

            const rotation = Math.random() * 40 - 20;
            const zIndex = totalImages - index;
            const opacity = 0.6 + zIndex * 0.05;

            styles.push({
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                zIndex,
                // opacity,
            });
        }

        return styles;
    }, [totalImages]);
    return (
        <div className="  flex flex-col gap-10 items-center justify-center m-auto py-10 px-5 bg-grid ">
            <div className="empty-state-photo flex justify-center items-center max-w-lg  cursor-pointer">
                <div className="photo-group">
                    {Array(totalImages)
                        .fill(null)
                        .map((_, index) => (
                            <img
                                key={index}
                                className={`photo absolute hover:scale-110 hover:opacity-100 transition-all duration-300 ease-in-out rounded-3xl shadow-md hover:shadow-xl`}
                                src={`/hero_${index % 5}.png`}
                                alt={`Photo ${index + 1}`}
                                style={imageStyles[index]}
                            />
                        ))}
                </div>
            </div>
            <div className='w-full '>
                {
                    persons.length < 1 ?
                        <>
                            <div className='text-3xl font-bold mb-4'>Let's Create Your First Person!</div>
                            <div className='text-xl font-bold mb-4 opacity-90 capitalize'>Craft Your First Character for Avatars, Virtual Photography and Anything You Want.</div>
                            <Button auto size={'lg'} color={'gradient'} icon={<Plus set="bold" />}
                                onClick={() => setPersonCreatorModalVisible(true)}
                            >
                                Create Person
                            </Button>
                        </> :
                        personTraining ?
                            <>
                                <div className='text-3xl font-bold mb-4 capitalize'>Your photos are training!</div>
                                <div className='text-xl font-bold mb-4 opacity-90 capitalize'>Meanwhile you can test out a random person from the top bar above</div>
                            </> :
                            <>
                                <div className='text-3xl font-bold mb-4'>Nothing Yet</div>
                                <div className='text-xl font-bold mb-4 opacity-90 capitalize'>Select some styles above or the click the button below if you're feeling lucky</div>
                                <div>
                                    <GenerateButton
                                        text="I'm feeling lucky"
                                    />
                                </div>
                            </>}

            </div>
        </div>
    );
};

interface GeneratedListProps {
    watermarked: boolean;
    generatedList: {
        person_id?: number | undefined;
        loading: boolean;
        data?: Generated[] | undefined;
        error?: string | undefined;
    };
    selectedPerson: Person | null | undefined;
    setSelectedGenerated: (item: Generated) => void;
    copyGenerated: (item: Generated, imageFiles?: File[]) => void;
    deleteGenerated: (item: Generated) => void;



}

function GeneratedList({ generatedList, selectedPerson, setSelectedGenerated, copyGenerated, deleteGenerated }: GeneratedListProps) {

    const renderItem = useCallback(({ index, data, width }: any) => {
        return (
            <motion.div
                layoutId={data?.id.toString()}
                key={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listItemVariants}
            >
                <GeneratedItem
                    key={index}
                    data={data}
                    onDrop={(files) => {
                        copyGenerated(data, files);
                    }}
                    watermark={false}
                    onDelete={() => deleteGenerated(data)}
                    onCopy={() => copyGenerated(data)}
                    onPress={() => setSelectedGenerated(data)} />
            </motion.div>
        );
    }, [selectedPerson]);

    return generatedList.loading
        ?
        <LoadingState text={'Loading'} /> :
        !generatedList.data?.length ?
            <EmptyStatePhoto
                personTraining={!selectedPerson?.is_done ?? false} /> :
            <AnimatePresence>
                <Masonry
                    key={generatedList.person_id}
                    items={generatedList.data}
                    overscanBy={1}
                    columnGutter={20}
                    itemKey={(data, index) => data?.id}
                    render={renderItem} />
            </AnimatePresence>;
}



const CachedGeneratedList = memo(GeneratedList);

