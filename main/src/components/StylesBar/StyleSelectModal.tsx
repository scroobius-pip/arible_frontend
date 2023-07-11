import { Button, Dropdown, Input, Modal, Progress, Text } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import StyleItem from './StyleItem';
import { Style } from '@/types';
import { AppContext } from '@/lib/AppState';
import Fuse from 'fuse.js'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { Masonry } from 'masonic'
import { ModalContext } from '@/lib/ModalState';

interface Props {
    open: boolean;
    onClose: () => void;
}


export default function StyleSelectModal({ open, onClose }: Props) {


    const [filteredStyles, setFilteredStyles] = useState<Array<Style>>([]);
    const [renderedStyles, setRenderedStyles] = useState<Style[]>([])
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const { styles, operations: { addStylesToPending }, demoGeneratedCount } = useContext(AppContext)
    const [toggledStyleIDs, setToggledStyleIDs] = useState<string[]>([])
    const [fuse, setFuse] = useState<Fuse<Style>>()


    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: filteredStyles.length > renderedStyles.length,
        onLoadMore: () => {
            setRenderedStyles(filteredStyles.slice(0, renderedStyles.length + 20))
        },
        disabled: false,
        rootMargin: '0px 0px 400px 0px',
    });



    useEffect(() => {
        setFilteredStyles(styles)
    }, [styles])

    useEffect(() => {
        setRenderedStyles(filteredStyles.slice(0, 20))
    }, [filteredStyles])

    useEffect(() => {
        if (!search) {
            setFilteredStyles(styles)
        }
    }, [search])

    useEffect(() => {
        const fuse = new Fuse(styles, { includeScore: true, keys: ['style.name', 'tags'], threshold: 0.3 })
        setFuse(fuse)
    }, [styles])



    const findStyles = async (search: string) => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 100))
        if (fuse && search.length) {
            const results = fuse.search(search)
            setFilteredStyles(results.map(result => result.item))
        } else {
            setFilteredStyles(styles)
        }
        setLoading(false)
    }


    const handleTogglePrompt = (promptId: string) => {

        if (toggledStyleIDs.includes(promptId)) {
            setToggledStyleIDs(toggledStyleIDs.filter(id => id !== promptId))
        } else {
            setToggledStyleIDs([...toggledStyleIDs, promptId])
        }
    }

    const handleGenerate = () => {
        const stylesToAdd = styles.filter(prompt => toggledStyleIDs.includes(prompt.id))
        addStylesToPending(stylesToAdd, true)
        setToggledStyleIDs([])
        onClose()
    }

    const handleSearch = () => {
        findStyles(search)
    }

    const renderItem = useCallback((style: Style) => <StyleItem
        key={style.id}
        onPress={handleTogglePrompt}
        data={style}
        selected={toggledStyleIDs.includes(style.id)}
    />, [toggledStyleIDs])

    const renderList = useMemo(() => {
        return <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6'>
            {renderedStyles.map(renderItem)}
            <div ref={sentryRef} className='h-40 p-10'></div>
        </div>;
    }, [renderedStyles, sentryRef, renderItem])


    return <Modal
        scroll
        width='100%'
        className='max-w-5xl m-auto'
        open={open}
        onClose={() => {
            onClose()
            setSearch('')
        }}
        blur

        closeButton
    // css={{
    //     bgBlur: "#0f111466",
    // }}
    >
        <Modal.Header
            className='flex flex-col text-left gap-2'
        >
            <h3>Select Styles</h3>
            <p className='text-base text-center text-neutral-500'>Yup! Just pick a bunch of styles, and you'll get loads of different pictures.</p>
            <div className='w-full '>
                <Input
                    value={search}

                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                    bordered
                    className='mt-2 max-w-2xl m-auto'
                    size='xl'
                    width='100%'
                    status='default'
                    type="search"
                    placeholder="E.g Fashion, Photography, LinkedIn."
                    contentRightStyling={false}
                    contentLeftStyling={false}
                    contentLeft={
                        <StyleCategorySelector
                            styles_count={toggledStyleIDs.length}
                        />
                    }
                    contentRight={

                        <>
                            <Button className='mr-1'
                                auto
                                flat
                                color={'secondary'}
                                onClick={handleSearch}
                                icon={<Search onClick={handleSearch} />}
                            >

                            </Button>
                        </>

                    }
                />
            </div>

            <Button color={'secondary'} onClick={handleGenerate} className='w-full md:hidden'>
                Done -
                ({toggledStyleIDs.length} selected)
            </Button>
        </Modal.Header>
        <Modal.Body

        >

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}

                >
                    {loading || !styles.length ?
                        <div className='w-full h-full flex justify-center items-center'>
                            <Progress
                                className='w-1/2'
                                indeterminated
                                shadow
                                color="gradient"
                            />
                        </div> :
                        renderList
                    }

                </motion.div>
            </AnimatePresence>
            <div className='h-24' />
        </Modal.Body>
        <Modal.Footer
            className='absolute bottom-0 left-0 w-full bg-neutral-900 bg-opacity-80 hidden md:block'
        >
            <Button color={'secondary'} onClick={handleGenerate} className='w-full'>Done -
                ({toggledStyleIDs.length} selected)
            </Button>
        </Modal.Footer>
    </Modal>


}




const StyleCategorySelector = ({
    poses_count = 0,
    backgrounds_count = 0,
    styles_count = 0,
    cameracount = 0
}) => {
    return <Dropdown

    >
        <Dropdown.Button
            className='ml-2'
            size={'sm'}
            color={'secondary'}
        // auto

        // disabled
        >

            <Text

                size={14}

                weight="bold"
            >
                Styles
            </Text>

        </Dropdown.Button>
        <Dropdown.Menu
            css={{
                // zIndex: 99,
                // position: 'relative',
            }}
        >

            <Dropdown.Item
                key='Styles'
            >
                Styles - {styles_count} Selected
            </Dropdown.Item>
            <Dropdown.Item
                className='pointer-events-none opacity-10'
                css={{

                }}
                key='Poses'

            >
                Poses - {poses_count} Selected
            </Dropdown.Item>
            <Dropdown.Item
                className='pointer-events-none opacity-10'
                key='Backgrounds'
            >
                Backgrounds - {backgrounds_count} Selected
            </Dropdown.Item>
            <Dropdown.Item
                className='pointer-events-none opacity-10'
                key='Backgrounds'
            >
                Cameras - {cameracount} Selected
            </Dropdown.Item>

        </Dropdown.Menu>
    </Dropdown>
}