import Head from 'next/head'
import StyleItem from '@/components/StyleItem'
import { Logo } from '@/components/Logo'
import { Badge, Button, Input, Loading } from '@nextui-org/react';
// import { Masonry, useInfiniteLoader } from 'masonic'
import exportFromJSON from 'export-from-json';
import { useEffect, useState, memo } from 'react';
import { PaperDownload } from '@odyssoft/iconly-clone';
import { Style } from '@/types';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Fuse from 'fuse.js'
import { Search } from 'lucide-react';
import { Footer } from '@/components/Footer';

const fetcher = (url: string) => fetch(url).then((res) => {
    const result = res.json()
    return result
});

export default function PromptDatabase() {
    const [styles, setStyles] = useState<Style[]>([])
    const [filteredStyles, setFilteredStyles] = useState<Style[]>([])
    const [renderedStyles, setRenderedStyles] = useState<Style[]>([])
    const [selectedStyles, setSelectedStyles] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [fuse, setFuse] = useState<Fuse<Style>>()
    const [search, setSearch] = useState('');

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage: styles.length > renderedStyles.length,
        onLoadMore: () => {
            setRenderedStyles(filteredStyles.slice(0, renderedStyles.length + 20))
        },
        disabled: false,
        rootMargin: '0px 0px 400px 0px',
    });


    const findStyles = async (search: string) => {
        setLoading(true)
        // stall for 100ms
        await new Promise(resolve => setTimeout(resolve, 100))
        if (fuse && search.length) {
            const results = fuse.search(search)
            setFilteredStyles(results.map(result => result.item))
        } else {
            setFilteredStyles(styles)
        }
        setLoading(false)
    }
    useEffect(() => {
        fetcher('/api/arible').then((data: Style[]) => {
            setStyles(data)
            setLoading(false)
        })
    }, [])

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
        const fuse = new Fuse(styles, { includeScore: true, keys: ['female_prompt', 'male_prompt', 'tags', 'camera', 'summary'], threshold: 0.3 })
        setFuse(fuse)
    }, [styles])

    const handleSearch = () => {
        findStyles(search)
    }

    return <>
        <Head>
            <title>Arible Prompt Database</title>
            <meta name="description" content='Arible Prompt Database for Midjourney and Stable Diffusion' />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
            style={{
                backgroundSize: '75px 75px',
                backgroundImage: backgroundGrid

            }}
            className='bg-[#F7F9FC]  min-h-screen text-black p-4 md:p-20 '
        >
            <div className={`bg-neutral-700 fixed left-1/2 -translate-x-1/2    bottom-2 align-middle z-20  p-2 bg-opacity-50 rounded-2xl ${selectedStyles.length ? 'block opacity-100 duration-300' : 'hidden opacity-5'}`}>
                <Button size={'lg'}
                    disabled={selectedStyles.length === 0}
                    onClick={() => {
                        const exportData = styles.filter((item) => selectedStyles.includes(item.style.name))

                        exportFromJSON({ data: exportData, fileName: 'arible', exportType: 'json', extension: 'json' })
                    }}

                    flat
                    color='secondary'
                    auto
                    icon={
                        <PaperDownload />
                    } >Download ({selectedStyles.length}) Selected Prompts</Button>

            </div>
            {/* <Navigation /> */}
            <section className='flex flex-col gap-20 justify-center items-center'>
                <div className='flex-col flex  items-center gap-5'>
                    <Logo text='Prompts' />
                    <a href='/avatars' target='_blank' rel='noreferrer' className='font-medium relative text-white  bg-neutral-900 animate-pulse shadow-lg duration-200 px-4 p-2 rounded-3xl'>
                        Generate Unlimited Avatars Monthly
                    </a>
                </div>
                <div>
                    <h1 className='text-7xl font-extrabold text-center'>Style Database</h1>
                    <p className='text-center text-2xl'>Arible Prompt Database for Midjourney and Stable Diffusion</p>
                    {!!styles.length && <h4 className='text-center text-4xl font-extrabold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>{Math.floor(styles.length / 100) * 100}+ Styles</h4>}
                </div>
                <div className='flex flex-col md:flex-row gap-4'>
                    <Button size={'xl'}
                        as='a'
                        href='/api/arible'
                        //@ts-ignore
                        download='arible.json'
                        color='secondary'
                        auto
                        shadow
                        icon={
                            <PaperDownload />
                        } >Download Prompts</Button>
                    <Button size={'xl'}
                        disabled={selectedStyles.length === 0}
                        onClick={() => {
                            const exportData = styles.filter((item: any) => selectedStyles.includes(item.summary))
                            exportFromJSON({ data: exportData, fileName: 'arible', exportType: 'json', extension: 'json' })
                        }}

                        bordered
                        color='secondary'
                        auto
                        icon={
                            <PaperDownload />
                        } >Download ({selectedStyles.length}) Selected Prompts</Button>
                </div>


            </section>

            <section className='my-12 h-full relative '
                onClick={(e: any) => {
                    const id = e.target.dataset?.summary as string | undefined
                    // alert(id)
                    if (id) {
                        setSelectedStyles((current) => {
                            if (current.includes(id)) {
                                return current.filter((item) => item !== id)
                            } else {
                                return [...current, id]
                            }
                        })
                    }
                }}
            >
                <div className='py-4'>
                    <Input
                        value={search}

                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}

                        bordered
                        className=' bg-white shadow-lg text-black'
                        size='xl'

                        color='secondary'
                        width='100%'
                        status='primary'
                        type="search"
                        placeholder="Fashion, high fantasy, anime, etc."
                        contentRightStyling={false}
                        // contentLeftStyling={false}

                        contentRight={
                            <Button className='mr-1'
                                auto
                                flat
                                color={'secondary'}
                                onClick={handleSearch}
                                icon={<Search onClick={handleSearch} />}
                            />

                        }
                    />
                </div>


                {/* @ts-ignore */}
                {loading && <Loading color='secondary' size='xl' className='w-full mt-12' />}


                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 '>

                    {renderedStyles.map((style) => {
                        return <StyleItem style={style} selected={selectedStyles.includes(style.style.name)} />
                    })}
                    <div ref={sentryRef} className='h-20 p-10'></div>
                </div>


            </section>
            <Footer />
        </main>
    </>
}

const List = ({ children }: any) => {
    return <div className='grid grid-cols-3 gap-4'>
        {children}
    </div>
}

const Item = ({ children }: any) => {
    return <div className='bg-red-500'>{children}</div>
}

const backgroundGrid = `
linear-gradient(0deg, transparent 24%, rgb(0 0 0 / 20%) 25%, rgb(0 0 0 / 5%) 26%, #4343430f 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgb(141 141 141 / 25%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(0 0 0 / 0%) 25%, rgb(28 28 28 / 10%) 26%, transparent 27%, transparent 74%, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 6%) 76%, transparent 77%, transparent)
`

