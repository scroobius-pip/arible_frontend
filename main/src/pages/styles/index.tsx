import { ApiService, IPage } from '@/lib/api'
import { GetStaticProps } from 'next'
import Head from 'next/head'

interface PageData {
    styles: IPage[]
}

export default ({ styles }: PageData) => {
    // return <div className='w-full max-w-6xl m-auto p-20'>
    //     <div className='rounded-xl bg-neutral-900 shadow-xl text-neutral-50 p-12 '>
    //     </div>
    // </div>
    return (
        <>
            <Head>
                <title>Arible AI Portrait Avatars - All AI Portraits Showcase</title>
                <meta name="description" content='Arible AI Portrait Avatars - All AI Portraits Available' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content='ai avatars, ai portraits, stable diffusion style directory' />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                style={{
                    backgroundSize: '75px 75px',
                    backgroundImage: backgroundGrid
                }}
                className='bg-[#F7F9FC] min-h-screen text-black'>
                <div className='w-full max-w-6xl  m-auto p-20'>
                    <h1 className='max-w-prose mb-24 md:text-7xl lg:text-6xl xl:text-7xl  w-full bg-gradient-to-r text-center from-neutral-900 via-black to-neutral-400 bg-clip-text text-transparent'>Style Directory</h1>
                    {/* <p className='max-w-prose mb-24 md:text-2xl lg:text-3xl xl:text-4xl  w-full bg-gradient-to-r text-center from-neutral-900 via-black to-neutral-400 bg-clip-text text-transparent'>All Styles</p> */}
                    <div className='rounded-xl bg-gradient-to-r text-center from-neutral-900 via-black to-neutral-400 shadow-xl text-neutral-50 p-12 '>
                        <div className='grid gap-4 grid-flow-row grid-cols-6 lg:grid-cols-6'>
                            {styles.map(style => <a href={`/styles/${style.slug}`} key={style.slug} className='flex flex-col items-center justify-center' >
                                <p className='text-sm  xl:text-2xl text-opacity-100 font-medium text-center hover:opacity-20 transition-all duration-300'>
                                    {style.title}
                                </p>

                            </a>)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps<PageData> = async () => {
    const { data, error } = await ApiService.allPages()

    if (error || !data) {
        console.log(error)
        console.log('data: ', data)
        return {
            notFound: true
        }
    }

    return {
        props: {
            styles: data
        },
    }
}


const backgroundGrid = `
                    linear-gradient(0deg, transparent 24%, rgb(0 0 0 / 20%) 25%, rgb(0 0 0 / 5%) 26%, #4343430f 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgb(141 141 141 / 25%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(0 0 0 / 0%) 25%, rgb(28 28 28 / 10%) 26%, transparent 27%, transparent 74%, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 6%) 76%, transparent 77%, transparent)
                    `