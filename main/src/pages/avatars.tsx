import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Badge, Button, Collapse, Navbar } from '@nextui-org/react'
import { ArrowRight } from '@odyssoft/iconly-clone'
import Marquee from 'react-fast-marquee'
import { Logo } from '@/components/Logo'
import { useEffect, useState } from 'react'
import { Style } from '@/types'
import { FaqSection } from '.'
import { Footer } from '../components/Footer'

const fetcher = (url: string) => fetch(url).then((res) => {
    const result = res.json()
    return result
});

export default function Home() {

    return (
        <>
            <Head>
                <title>Arible AI Avatars</title>
                <meta name="description" content="Arible AI: Profile Picture Perfection  " />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                style={{
                    backgroundSize: '75px 75px',
                    backgroundImage: backgroundGrid

                }}

                className='bg-[#F7F9FC] min-h-screen text-black'>
                {/* <Navigation /> */}
                <MainSection />
                <StylesSection />
                <FaqSection />
                <Footer />
            </main>
        </>
    )
}

function StylesSection() {
    const [styles, setStyles] = useState<Style[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetcher('/api/landing_prompts').then((data) => {
            setStyles(data)
            setLoading(false)
        })
    }, [])


    return <section id='#styles' className='w-full grid  min-h-screen p-8'>
        <div className='grid grid-flow-col w-full gap-4'>
            <div className='w-full '>
                <div className=''>
                    <h2 className='text-7xl md:text-8xl'>Unlimited AI Photos Monthly</h2>
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
        <Marquee
            speed={10}
            className='my-12'
            pauseOnHover
            pauseOnClick
            gradient={false}
        >
            {/* <div className='text-sm font-bold text-center m-1 bg-neutral-200 cursor-pointer  p-2 rounded-full'>Jedi Warrior</div> */}
            {
                categories.map((category, index) => {
                    return <div key={index} className='text-sm font-bold text-center m-1 bg-neutral-200 hover:bg-neutral-800 hover:text-neutral-200 duration-200 cursor-pointer  p-2 rounded-full'>{category}</div>
                })
            }

        </Marquee>
        {/* staggered grid */}
        <div
            className='grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4  '
        >
            {styles.map((style, index) => {
                const { style: { name, }, image } = style;
                const image_src = `${optimizer_base}${image}`

                return <a href='/create'>
                    <img key={index} src={image_src} alt={name} className='rounded-3xl aspect-square p-0.5 border-2 border-solid border-opacity-30 hover:border-opacity-100 duration-300  border-neutral-900 cursor-pointer' />
                </a>
            })}

        </div>
    </section>
}

const optimizer_base = "https://img.arible.co/cdn-cgi/image/width=256,height=256,fit=cover,format=auto/"

function MainSection() {
    return <section className='grid gap-0 lg:gap-4 grid-flow-row min-h-screen grid-cols-1 lg:grid-cols-2'>
        <div

            className=' p-8 h-full'>
            <div className='flex  flex-col w-full  gap-4  h-full'>
                <Logo />

                <h1 className='max-w-prose md:text-7xl lg:text-8xl xl:text-9xl h-full w-full bg-gradient-to-r from-neutral-900 via-black to-neutral-400 bg-clip-text text-transparent'>Profile Pictures That Impress</h1>
                {/* <div> */}
                <p className='max-w-lg h-full w-full'>
                    Tired of settling for <b>average</b> profile pictures that don't truly represent you? It's time to harness the power of cutting-edge AI technology and give your online presence a complete makeover.

                    Arible analyses your <b>unique</b> features and <b>personality</b> traits to craft the perfect profile picture that captures your essence.
                </p>
                <a href='/create'>
                    <Button

                        iconRight={<ArrowRight set='bold' />}
                        size={'lg'} className='w-full bg-neutral-900 py-8'
                    >Demo <span className='opacity-70 ml-4 text-sm align-text-bottom pt-0.5'>No sign-up required!</span> </Button>
                </a>

                {/* </div> */}


                <div>
                    <MainSectionLeftBottom />
                </div>
            </div>
        </div>
        <div className='w-full h-full bg-neutral-200 \'>
            <div className='flex justify-center items-center align-middle h-full rounded-full p-4'>
                <img
                    className='aspect-square w-full rounded-full p-5 shadow-2xl bg-neutral-50 border border-dashed'
                    src={'https://img.arible.co/cdn-cgi/image/fit=cover,format=webp,quality=80/https://www.arible.co/hero_3.png'}
                    alt='Arible AI Profile Picture Generator' />
            </div>
        </div>
    </section>
}

function MainSectionLeftBottom() {
    return <div className='grid grid-cols-4 gap-4  w-full  '>

        <img
            src='https://img.arible.co/cdn-cgi/image/width=256,height=256,fit=cover,format=auto/https://replicate.delivery/pbxt/eII2p4Jy6flpakSJr7nfw0OfYGOjMMRjWhsmQpSf3nrgfe0VIA/out-0.png'
            alt='Arible AI Profile Picture Generator'
            className='rounded-3xl bg-slate-500 ' />

        <img
            src='https://img.arible.co/cdn-cgi/image/fit=cover,format=webp,quality=80/https://www.arible.co/hero_4.png'
            alt='Arible AI Profile Picture Generator'
            className='rounded-3xl bg-slate-500 ' />

        <img
            src='https://img.arible.co/cdn-cgi/image/fit=cover,format=webp,quality=80/https://www.arible.co/hero_2.png'
            alt='Arible AI Profile Picture Generator'
            className='rounded-3xl bg-slate-500 ' />

        <img
            src='https://img.arible.co/cdn-cgi/image/fit=cover,format=webp,quality=80/https://www.arible.co/hero_3.png'
            alt='Arible AI Profile Picture Generator'
            className='rounded-3xl bg-slate-500 ' />

    </div>

}



const backgroundGrid = `
linear-gradient(0deg, transparent 24%, rgb(0 0 0 / 20%) 25%, rgb(0 0 0 / 5%) 26%, #4343430f 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgb(141 141 141 / 25%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgb(0 0 0 / 0%) 25%, rgb(28 28 28 / 10%) 26%, transparent 27%, transparent 74%, rgb(0 0 0 / 6%) 75%, rgb(0 0 0 / 6%) 76%, transparent 77%, transparent)
`

const categories = [
    "concept art",
    "bedtime portrait",
    "cernunnos art",
    "academia singing",
    "sepulcher investigation",
    "cernunnos portrait",
    "truck delivery",
    "cyberpunk pirate",
    "deathcore warrior",
    "epic mystery",
    "cernunnos model",
    "vampire portrait",
    "irish jedi warrior",
    "redhead portrait",
    "crystal portrait",
    "dwarven fullbody",
    "sorceress portrait",
    "viking portrait",
    "condo portrait",
    "singing portrait",
    "silver warrior",
    "blue fighter",
    "holographic portrait",
    "pulp cover",
    "floral portrait",
    "cernunnos fashion",
    "work odalisque",
    "qcernunnos fashion",
    "cybernetic enhancements",
    "pop surrealism portrait",
    "armored knight",
    "alien landscape",
    "vampire portrait",
    "italian fashion",
    "afremov portrait",
    "vampire portrait",
    "neon portrait",
    "fantasy portrait",
    "singing portrait",
    "civil warrior",
    "street fashion",
    "cosmic astronaut",
    "botanical academia",
    "lion portrait",
    "glowing portrait",
    "vampire profile",
    "d&d kiss",
    "georgia swamp adventure",
    "kitsune portrait",
    "universe portrait",
    "alien landscape",
    "stargazing portrait",
    "vampire portrait",
    "space suit diner",
    "modern cernunnos",
    "cernunnos portrait",
    "shamrock fantasy",
    "japanese portrait",
    "matte silver portrait",
    "christina hendricks",
    "glowing fantasy",
    "mystery matters",
    "dragon-human hybrid",
    "anime killer",
    "dwarven bodybuilder",
    "botanical portrait",
    "beach portrait",
    "native warrior portrait",
    "klimt-mckean art",
    "shamrock wings",
    "living suit",
    "kenyan portrait",
    "madrid street portrait",
    "parisian portrait",

]