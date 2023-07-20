import { Masonry } from 'masonic'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ShowcaseItem from './ShowcaseItem'
import { Avatar, Button, Progress } from '@nextui-org/react';
// import { Category, Delete, Heart, Plus } from '@odyssoft/iconly-clone';
import { ModalContext } from '@/lib/ModalState';
import { AppContext } from '@/lib/AppState';
import GenerateButton from '../GenerateButton';
import { addPoseImage, ApiService, getImageSize, randomizeStyle } from '@/lib/api';
import { Generated, Person } from '@/types';
import { motion, AnimatePresence } from 'framer-motion'
import { debounce } from "debounce";
import { useImageDropCompressed } from '@/lib/useImageDropCompressed';
import PersonSelector from '../StylesBar/PersonSelector';
import ScrollingDiv from '../ScrollingDiv';
import { Logo } from '../Logo';
import { useRouter } from 'next/router';
import { extractImageUrl } from '@/lib/extractImageUrl';

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


export default ({ userId }: {
    userId?: string
}) => {
    const { setSelectedGenerated, setLoginModalVisible, setPersonCreatorModalVisible, setShareModalVisible } = useContext(ModalContext)
    const { operations: { }, user } = useContext(AppContext)
    const { onDrop, result: results, uploading } = useImageDropCompressed()
    const [processedDroppedFileUrls, setProcessedDroppedFileUrls] = useState<string[]>([])
    const [selectedPerson, selectPerson] = useState<Person | undefined>()
    const [persons, setPersons] = useState<Person[]>([])
    const [generatedList, setGeneratedList] = useState<GeneratedListProps['generatedList']>({
        loading: true,
    })


    const renderedList = useMemo(() => {
        return {
            ...generatedList,
            data: generatedList.data
                ?.filter(isSubmittedOrDone)
                .sort((a, b) => b.created_at - a.created_at) ?? []
        }
    }, [generatedList, selectedPerson,])


    return <div className='p-4 h-full max-w-5xl m-auto' >

        {/* {!user && !generatedList.loading && <RequiresSubscriptionButton />} */}
        <div className='w-full  mb-8 '>
            <ScrollingDiv
                className='w-full h-full items-center flex flex-row  gap-4 justify-between bg-neutral-900  rounded-xl p-2 shadow-2xl '>
                <Logo variant='light' />
                <div className='flex items-center gap-2'>
                    <p className='text-neutral-100 font-bold text-lg '>Simdi's Gallery</p>
                    <Avatar
                        bordered
                        as="button"
                        color="gradient"
                        src={user?.profile_image ?? undefined}
                        size="md"
                        id={user?.data?.email}
                    />
                </div>

                {/* <GetStarted /> */}

            </ScrollingDiv>
        </div>
        <div className='mb-4 w-full flex'>

            <PersonSelector
                onSelect={(id) => {
                    const person = persons.find(p => p.id.toString() === id)
                    selectPerson(person)
                }}
                selected_id={selectedPerson?.id}
                persons={persons}
            />
        </div>

        <CachedGeneratedList
            watermarked={false}
            shareGenerated={(generated) => {

                if (!userId || !generated.id) return

                setShareModalVisible(true, {
                    userId: userId,
                    generatedId: generated.id,
                    description: 'Generated with Arible.co, Unlimited Beautiful Photos Of You Monthly',
                    imageUrl: extractImageUrl(generated.status) ?? ''

                })
            }}
            userId={userId ?? ''}
            selectedPerson={selectedPerson}
            generatedList={renderedList}
            setSelectedGenerated={setSelectedGenerated} />
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
                            <Button auto size={'lg'} color={'gradient'}
                                // icon={<Plus set="bold" />}
                                onClick={() => setPersonCreatorModalVisible(true)}
                            >
                                Create Person
                            </Button>
                        </> :

                        <>
                            <div className='text-3xl font-bold mb-4'>Nothing Yet</div>
                            <div className='text-xl font-bold mb-4 opacity-90 capitalize'>Check back in a few days, your curated profile pictures appear here</div>
                            <div>
                                {/* <GenerateButton
                                    text="I'm feeling lucky"
                                /> */}
                            </div>
                        </>}

            </div>
        </div >
    );
};

interface GeneratedListProps {
    userId: string;
    watermarked: boolean;
    generatedList: {
        person_id?: number | undefined;
        loading: boolean;
        data?: Array<Generated> | undefined;
        error?: string | undefined;
    };
    selectedPerson: Person | null | undefined;
    setSelectedGenerated: (item: Generated) => void;
    shareGenerated: (item: Generated) => void;



}

function RequiresSubscriptionButton() {
    return <Button size={'md'} className='font-extrabold py-4' auto color={'gradient'}
    // icon={<Plus set="bold" />}
    >Create Your Own Avatars <span className='p-2 text-xs font-bold text-neutral-200'>Requires Subscription</span></Button>;
}

function GeneratedList({ generatedList, selectedPerson, shareGenerated, userId, setSelectedGenerated }: GeneratedListProps) {

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

                <ShowcaseItem
                    key={index}
                    data={data}

                    watermark={false}
                    onShare={() => shareGenerated(data)}

                    onPress={() => setSelectedGenerated(data)}
                />
            </motion.div>
        );
    }, [selectedPerson, userId]);

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
                    // columnCount={4}
                    columnGutter={20}
                    itemKey={(data, index) => data?.id}
                    render={renderItem} />
            </AnimatePresence>;
}



const CachedGeneratedList = memo(GeneratedList);
// const CachedGeneratedList = GeneratedList;
