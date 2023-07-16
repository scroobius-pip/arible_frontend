import { Logo } from '@/components/Logo'
import { ApiService, IPage } from '@/lib/api'
import { Button } from '@nextui-org/react'
import { ArrowRight } from '@odyssoft/iconly-clone'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { Inter } from 'next/font/google'
import { Badge, Collapse, Navbar } from '@nextui-org/react'
import Marquee from 'react-fast-marquee'
import { useEffect, useState } from 'react'
import { Style } from '@/types'
import { FaqSection } from '../'
import { Footer } from '@/components/Footer'

interface PageData {
    page: IPage
}


export default ({ page }: PageData) => {

    return (
        <>
            <Head>
                <title>Arible AI - Create {page.title}</title>
                <meta name="description" content={page.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content={page.keywords} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                style={{
                    backgroundSize: '75px 75px',
                    backgroundImage: backgroundGrid
                }}
                className='bg-[#F7F9FC] min-h-screen text-black'>
                <MainSection page={page} />
                <StylesSection styles={page.items} />
                <FaqSection />
            </main>
        </>
    )
}


function MainSection({ page: { title, description, items } }: PageData) {
    return <section className='grid gap-0 lg:gap-4 grid-flow-row  grid-cols-1 lg:grid-cols-2 min-h-screen'>
        <div

            className=' h-full'>
            <div className='flex  flex-col w-full gap-4  h-full  p-12 justify-between'>
                <Logo />
                <h1 className='max-w-prose md:text-7xl lg:text-8xl xl:text-9xl  w-full bg-gradient-to-r from-neutral-900 via-black to-neutral-400 bg-clip-text text-transparent'>{title}</h1>
                <p className='max-w-lg text-2xl lg:text-4xl w-full'>
                    {description}
                </p>
                <a href='/create'>
                    <Button

                        iconRight={<ArrowRight set='bold' />}
                        size={'lg'} className='w-full bg-neutral-900 py-8'
                    >Demo <span className='opacity-70 ml-4 text-sm align-text-bottom pt-0.5'>No sign-up required!</span> </Button>
                </a>
                <div>
                    <MainSectionLeftBottom items={items} />
                </div>
            </div>
        </div>
        <div className='  bg-neutral-200  '>
            <div className='flex justify-center items-center align-middle rounded-full h-full p-12'>
                <img
                    className='aspect-square max-h-screen  xl:h-full  rounded-full p-5 shadow-2xl bg-neutral-50 border border-dashed'
                    src={`https://img.arible.co/cdn-cgi/image/fit=cover,format=webp,quality=90/${items[0].url}`}
                    alt={`Arible AI Portraits - ${title}`} />
            </div>
        </div>
    </section>
}


function MainSectionLeftBottom({ items }: { items: PageData['page']['items'] }) {
    //take the first 4 items
    const firstFour = items.slice(0, 4)

    return <div className='grid grid-cols-4 gap-4  w-full  '>
        {
            firstFour.map((item, i) =>
                <img
                    key={i}
                    src={`https://img.arible.co/cdn-cgi/image/width=256,height=256,fit=cover,format=auto/${item.url}`}
                    alt={`Arible AI Portraits - ${item.title}`}
                    className='rounded-3xl bg-slate-500 h-full' />
            )
        }
    </div>

}


function StylesSection({ styles }: { styles: IPage['items'] }) {


    return <section id='#styles' className='w-full grid  min-h-screen p-8 '>
        <div className='grid grid-flow-col w-full gap-4'>
            <div className='w-full '>
                <div className=''>
                    <h2 className='text-7xl md:text-8xl'>AI Generated Photos Of Yourself</h2>
                    <h3 className='text-4xl'><span className='text-indigo-800'>1000+ </span>Styles
                        {/*@ts-ignore  */}
                        <Badge color='' variant={'flat'} size={'xl'} className='text-sm ml-4 bg'>4K</Badge>
                    </h3>
                    <p className='py-2 font-bold'>Generate as many photos as you like monthly, pay only for upscaling photos to 4k - no watermarks</p>
                </div>
                <a href='/create'>
                    <Button
                        iconRight={<ArrowRight set='bold' />}
                        size={'lg'} className='w-full bg-neutral-900 py-8 flex'
                    >Demo <span className='opacity-70 ml-4 text-sm align-text-bottom pt-0.5'>No sign-up required!</span> </Button>
                </a>
            </div>
        </div>

        <div
            className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 my-16 '
        >
            {styles.map((style, index) => {
                const { url, description, title } = style;
                const image_src = `${optimizer_base}${url}`

                return <a href='/create'>
                    <img key={index} src={image_src} alt={description} className='rounded-3xl w-full aspect-square p-0.5 border-2 border-solid border-opacity-30 hover:border-opacity-100 duration-300  border-neutral-900 cursor-pointer' />
                </a>
            })}

        </div>
    </section>
}
const optimizer_base = "https://img.arible.co/cdn-cgi/image/width=768,height=768,fit=cover,format=auto/"

const backgroundGrid = `
linear-gradient(0deg, transparent 24%, rgb(0 0 0 / 20%) 25%, rgb(0 0 0 / 5%) 26%, #4343430f 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgb(141 141 141 / 25%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(0 0 0 / 0%) 25%, rgb(28 28 28 / 10%) 26%, transparent 27%, transparent 74%, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 6%) 76%, transparent 77%, transparent)
`


export const getStaticProps: GetStaticProps<PageData> = async ({ params }) => {
    const { data, error } = await ApiService.getPage(params?.slug as string)

    if (error || !data) {
        console.log(error)
        console.log('data: ', data)
        return {
            notFound: true
        }
    }

    return {
        props: {
            page: data
        },
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const { data, error } = await ApiService.allPages()

    if (error || !data) {
        console.log(error)
        console.log('data: ', data)
        return {
            paths: [],
            fallback: true
        }
    }

    const paths = data.map(page => ({
        params: {
            slug: page.slug
        }
    }))



    return {
        paths,
        fallback: true
    }
}