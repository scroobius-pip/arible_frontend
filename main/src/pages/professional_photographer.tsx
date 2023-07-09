import Head from 'next/head'
import { Logo } from '@/components/Logo'
import { Button, Card, Collapse, } from '@nextui-org/react'
import { ArrowRight } from '@odyssoft/iconly-clone'
import ScrollingText from '@/components/ScrollingText'
import ScrollingDiv from '@/components/ScrollingDiv'
import { Footer } from '@/components/Footer'
import dynamic from 'next/dynamic'

// const ArrowRight = dynamic(() => import('@odyssoft/iconly-clone').then((mod) => mod.ArrowRight))

export default function Pro() {
    return <>
        <Head>
            <title>Professional Business Profile Pictures for LinkedIn and Corporate</title>
            <meta name='description' content='Professional Business Portraits for LinkedIn and Corporate' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name='keywords' content='professional photography,virtual studio,avatars,corporate headshots,ai portraits,linkedin profile picture, corporate portrait,linkedin profile image' />
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <main

            className='min-h-screen '
        >
            <section
                className='min-h-screen p-8 md:p-20 md:pb-0 pb-2 flex flex-col justify-between'
            >
                <div>
                    <nav className='mb-6 flex md:block justify-center'>

                        <Logo variant='light' text='Pro' color='primary' />
                    </nav>
                    <div className='flex flex-col md:flex-row gap-12 w-full justify-between'>
                        <div>
                            <ScrollingText>
                                <h1 className='font-black text-4xl md:text-7xl text-center md:text-left'>Professional Corporate Headshots</h1>
                                <p className='text-2xl font-medium text-neutral-300 text-center md:text-left'>Look your absolute best with AI Generated Portrait Headshots  <span className='text-base'>Pick from 1000+ Styles, or explain what you want.</span></p>
                                <p className='text-base mt-14 font-mono font-medium animate-pulse  text-neutral-400 text-center md:text-left'>None of the photos below are real</p>
                            </ScrollingText>
                        </div>
                        <GetStarted color='bg-neutral-100' text='text-neutral-900' />
                    </div>
                    <div>

                    </div>
                </div>
                <ScrollingDiv className='grid gap-10 w-full grid-cols-1 mt-12 md:grid-cols-3 lg:grid-cols-4 grid-flow-col '>

                    <Card isHoverable isPressable className='rounded-[3.5rem] rounded-b-none md:hidden lg:block' >

                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/52618c84-d39d-43fe-4967-03471b816e00/public"
                            objectFit="cover"
                            className='bg-neutral-200'

                            alt="Card image background"
                        />
                    </Card>
                    <Card isHoverable isPressable className='rounded-[3.5rem] rounded-b-none hidden md:block'>

                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7b1f9235-ee89-415a-e7f6-3d9ec5243500/public"
                            objectFit="cover"
                            className='bg-red-400'

                            alt="Card image background"
                        />
                    </Card>
                    <Card isHoverable isPressable className='rounded-[3.5rem] rounded-b-none hidden md:block'>

                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/f1b6eb22-ee9b-4101-eb34-7fb36caaa300/public"
                            objectFit="cover"
                            className='bg-green-300'

                            alt="Card image background"
                        />
                    </Card>
                    <Card isHoverable isPressable className='rounded-[3.5rem] rounded-b-none hidden md:block'>

                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/6df77c79-d268-4be0-fa76-bd8fdfe20a00/public"
                            objectFit="cover"
                            className='bg-blue-300'

                            alt="Card image background"
                        />
                    </Card>
                </ScrollingDiv>
                <ScrollingDiv className='grid gap-10 w-full grid-cols-2 mt-12  grid-flow-col md:hidden '>


                    <Card isHoverable isPressable className='rounded-[2.5rem] ' >
                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/a1e7bf4b-5098-4f50-bb16-b60d73626e00/public"
                            objectFit="cover"
                            className='bg-neutral-200'
                            alt="Card image background"
                        />
                    </Card>
                    <Card isHoverable isPressable className='rounded-[2.5rem] ' >
                        <Card.Image
                            src="https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/ad141068-3742-4f33-7fbe-6458b5721e00/public"
                            objectFit="cover"
                            className='bg-neutral-200'
                            alt="Card image background"
                        />
                    </Card>

                </ScrollingDiv>
            </section>
            <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6'>
                <ScrollingText>
                    <h1 className='font-black text-5xl md:text-7xl   text-center '>Any <span className='font-medium'>Location</span> Any <span className='font-medium'>Time</span> Any <span className='font-medium'>Clothing</span></h1>
                    <p className='text-xl text-center md:text-2xl font-medium text-neutral-300'>Unlimited Photorealistic Portraits Based On Your Face</p>
                    <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />

                </ScrollingText>
                {/* masonry style grid */}
                <ScrollingDiv className='w-full h-full flex gap-6 max-w-6xl m-auto'>

                    <div className='w-full h-full flex gap-6 flex-col'>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7bfb879b-70d8-422d-aadb-eee62471b200/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/27e7c34a-6c9d-446b-bcf9-2c9f9ed3b700/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>
                    <div className='w-full h-full flex gap-6 flex-col'>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/a8d8a39c-9518-40ba-da48-d25849efa000/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/dc6b312a-69ea-40a5-001e-7a61e5713400/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>
                    <div className='w-full h-full flex gap-6 flex-col'>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/b90eb3ab-b094-42c8-32d9-911b1c92a600/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>

                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/fcde9c4b-b0c3-4feb-9586-3d1c3e25e900/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>
                    <div className='w-full h-full flex gap-6 flex-col'>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/0b41d4bb-56c9-43f0-2633-ff9afc5e1700/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>

                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/09c10daa-3ccc-4b53-b513-33a5e40d9f00/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>
                    <div className='w-full h-full flex gap-6 flex-col'>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/490d50ba-caaf-4db3-a6fb-787c5393bf00/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                        <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>

                            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/dadb1bee-e6d5-422f-4716-19c8df0ac600/public' className='w-full h-full object-cover rounded-3xl' />
                        </div>
                    </div>

                </ScrollingDiv>
            </section>
            <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6'>
                <ScrollingText>
                    <h1 className='font-black text-5xl md:text-7xl   text-center '>Introducing RapidTake <span className='font-bold  relative -top-5 text-base py-2 px-4 bg-neutral-50 text-neutral-800 rounded-full'>TM</span></h1>
                    <p className='text-xl text-center md:text-2xl font-medium text-neutral-300'>Don't have enough photos ? No Problem! <br /><span className='font-semibold text-neutral-100'>The only AI Avatar Platform to have integrated Face Capture</span></p>
                    <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />

                </ScrollingText>
                <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/6d6b3d28-5177-4e3b-dabc-37c20df2d800/public' className='max-w-2xl m-auto h-full object-cover' />
            </section>

            <section className='p-4 md:p-20 pb-2 flex flex-col justify-between gap-6 mt-20'>
                <ScrollingText>
                    <h1 className='font-black text-5xl md:text-7xl ' >
                        <span className='font-medium'>200%</span> Cheaper Than Hiring a Photographer<span className='font-medium'></span>
                    </h1>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300 capitalize'>Photorealistic Portraits Indistinguishable From Real-life</p>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300 capitalize'>1 Hour Turn Around Time</p>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300 capitalize'>The most advanced AI Portrait Platform on the market</p>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300'>Unlimited Locations</p>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300'>Unlimited Clothing & Styles</p>
                    <p className='md:text-2xl text-xl font-medium text-neutral-300'>100% Refunds <a href='https://bronze-brush-9b0.notion.site/Arible-Terms-Conditions-c3d47a0775ca4deebac66f64b987f06b' className='text-sm font-semibold'>Terms & Conditions apply</a></p>
                </ScrollingText>
                <div className='w-full h-full flex gap-6 '>
                    <ScrollingDiv
                        style={{
                            backgroundSize: '40px 40px',
                            backgroundColor: '#f3f3f3',
                            backgroundImage: 'linear-gradient(45deg, #d6eaff 25%, transparent 25%, transparent 50%, #d6eaff 50%, #d6eaff 75%, transparent 75%, transparent)'
                        }}
                        className='w-full h-full bg-neutral-100 p-10 md:p-40 rounded-3xl shadow-2xl cursor-pointer border-white border-2 md:block flex justify-between flex-col'>
                        <span className='text-2xl text-neutral-900 font-medium'>Starting @</span>
                        <h1 className='text-4xl md:text-8xl font-black text-neutral-900'>
                            $39.99 <span className='text-4xl md:text-6xl font-extrabold'>Onetime Cost</span>
                        </h1>
                        <p>Or $29.99 Monthly</p>
                        <GetStarted />
                        <a href='https://arible.getrewardful.com/signup'>
                            <Button flat color={'secondary'} className='mt-8 w-full' size='md'>Earn 20% Referring Someone</Button>
                        </a>
                    </ScrollingDiv>
                </div>
            </section>

            {/* <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6 rounded-3xl mb-20 md:mb-0'>
                <ScrollingText>
                    <HowItWorks rounded />
                </ScrollingText>
            </section> */}
            <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6 rounded-3xl mb-20 md:mb-0'>
                <ScrollingText>
                    <FaqSection rounded />
                </ScrollingText>
            </section>
            <Footer bg='bg-neutral-100' text='text-neutral-900' logoVariant='dark' />
        </main >
    </>

}
function GetStarted({ color = 'bg-neutral-900', text = '' }) {
    return <a href='/create'>
        <Button

            iconRight={<ArrowRight set='bold' />}
            // blink tailwindcss
            size={'lg'} className={`w-full ${color} ${text} py-8 `}
        >Try Demo </Button>
    </a>
}



export function Badges({ color = 'bg-neutral-900', text = 'text-neutral-100' }) {

    return <div className="sf-root w-12" data-id="3625461" data-badge="heart-badge-black" data-variant-id="sf" >
        <a href="https://sourceforge.net/software/product/Arible-AI/" target="_blank">Arible AI Reviews</a>


    </div>

}

// export function HowItWorks({ rounded = true }) {
//     return <section className={`w-full bg-neutral-900  text-neutral-200 p-8 ${rounded ? 'rounded-3xl' : ''}`}>
//         <h1 className='text-5xl'>How It Works</h1>
//         <Collapse.Group className='p-0'>
//             <Collapse title="Upload Your Photos">
//                 <p className=''>
//                     Use
//                 </p>
//             </Collapse>
//             <Collapse title="How Does This Work ?">
//                 <p>
//                     Sign up for an account, upload a few clear photos of your face, and the AI will learn your face and create a virtual twin of you. With any plan, you can generate as many photos as you want.
//                 </p>
//             </Collapse>
//             <Collapse title="What Do You Do With My Uploaded Photos ?">
//                 <p>
//                     We only use your photos to train our AI. These are deleted permanently within a week after training is done. We don't use your photos for any other purpose.
//                 </p>
//             </Collapse>
//             <Collapse title="Unlimited ???">
//                 <p>
//                     Yup, with a monthly subscription you can create an unlimited number of high quality avatars without any restrictions. Fire away, although upscaling your photos to 4K would cost some credits.
//                 </p>
//             </Collapse>
//             <Collapse title="What Are Styles ?">
//                 <p>
//                     Styles Include All The Information Needed To Create An Avatar Photo, This Includes Whether It's Realistic Or Artistic, The Pose, The Clothing, Emotion, The Background, And The Lighting.
//                     <a target={'_blank'} href={'https://github.com/scroobius-pip/arible_prompts'} className='text-blue-600'>
//                         <b className='text-blue-600'>You Can Modify An Existing Style, Tweak It, Make It Yours and Make it Public For Others To Use.</b>
//                     </a>
//                 </p>
//             </Collapse>
//             <Collapse title="Can I Use The Avatars For My Business ?">
//                 <p>
//                     Yes, you can use the avatars for both personal and business use. You can use them for your social media accounts, your website, your blog, your email signature, and any other way you see fit.
//                 </p>
//             </Collapse>
//             <Collapse title="Can I Stop My Subscription At Any Time ?">
//                 <p>
//                     Yes, you can cancel your subscription at any time. You will still have access to your avatars until the end of your billing cycle. Email simdi@arible.co and I'll cancel your subscription immediately, no questions asked. However unless you haven't created any avatars, refunds are not possible due to how expensive training the AI is.
//                 </p>
//             </Collapse>
//             <Collapse title="Is My Person Information Safe ?">
//                 <p>
//                     Yes, We care about keeping your personal info, like your photos, safe and private. We use strong security methods to protect your data. We also delete any uploaded photos within a week. Read our Privacy Policy for more details.
//                 </p>
//             </Collapse>
//             <Collapse title='How Do I Get In Touch ?'>
//                 <p>
//                     You can reach out to me at simdi@arible.co 😃
//                 </p>
//             </Collapse>
//         </Collapse.Group>
//     </section>
// }

export function FaqSection({ rounded = false }) {
    return <section className={`w-full bg-neutral-900  text-neutral-200 p-8 ${rounded ? 'rounded-3xl' : ''}`}>
        <h1 className='text-5xl'>Faq</h1>
        <Collapse.Group className='p-0'>
            <Collapse title="What is Arible ?">
                <p className=''>
                    Arible is a platform that uses AI to learn how you look and creates high quality realistic photos of you that are indistinguishable from real photos.
                </p>
            </Collapse>
            <Collapse title="How Does This Work ?">
                <p>
                    Sign up for an account, upload a few clear photos of your face, and the AI will learn your face and create a virtual twin of you.
                </p>
            </Collapse>
            <Collapse title="What Do You Do With My Uploaded Photos ?">
                <p>
                    We only use your photos to train our AI. These are deleted permanently within a week after training is done. We don't use your photos for any other purpose.
                </p>
            </Collapse>

            <Collapse title="What Are Styles ?">
                <p>
                    Styles Include All The Information Needed To Create An Avatar Photo, This Includes Whether It's Realistic Or Artistic, The Pose, The Clothing, Emotion, The Background, And The Lighting.
                    <a target={'_blank'} href={'https://github.com/scroobius-pip/arible_prompts'} className='text-blue-600'>
                        <b className='text-blue-600'>You Can Modify An Existing Style, Tweak It, Make It Yours and Make it Public For Others To Use.</b>
                    </a>
                </p>
            </Collapse>
            <Collapse title="Can I Use The Avatars For My Business ?">
                <p>
                    Yes, you can use the avatars for both personal and business use. You can use them for your social media accounts, your website, your blog, your email signature, and any other way you see fit.
                </p>
            </Collapse>
            <Collapse title="Can I Stop My Subscription At Any Time ?">
                <p>
                    Yes, you can cancel your subscription at any time. You will still have access to your avatars until the end of your billing cycle. Email simdi@arible.co and I'll cancel your subscription immediately, no questions asked. However unless you haven't created any avatars, refunds are not possible due to how expensive training the AI is.
                </p>
            </Collapse>
            <Collapse title="Is My Person Information Safe ?">
                <p>
                    Yes, We care about keeping your personal info, like your photos, safe and private. We use strong security methods to protect your data. We also delete any uploaded photos within a week. Read our Privacy Policy for more details.
                </p>
            </Collapse>
            <Collapse title='How Do I Get In Touch ?'>
                <p>
                    You can reach out to me at simdi@arible.co 😃
                </p>
            </Collapse>
        </Collapse.Group>
    </section>
}

const optimizer_base = "https://img.arible.co/cdn-cgi/image/format=webp,quality=80/"
const sampleStyles = [

    "https://replicate.delivery/pbxt/MrPxYwZv36oJFxkPuPEQaQ6bY8vj8NKDxfTwqYMug4vB2QXIA/seed-304907254.png",
    "https://replicate.delivery/pbxt/xtNPCRndN9JONNNl7CAGcxN0Ax2YNaHfhRWneMicLa4HaqtQA/seed-62822112.png",
    "https://replicate.delivery/pbxt/1nJdITPkR1JHA59tSureERhtf4p6QpTgzcQo4el8C3T9LTbhA/seed-1502188633.png",
    "https://replicate.delivery/pbxt/vRbAKNu7gDK0PtlTwF8WBnPDwXLAdyBpMojjMzrx7UoXUoLE/seed-4132835364.png",
    "https://replicate.delivery/pbxt/E3WFd4uX9h7CDNrcFQbsvzEwga3Cf7BZwvfmqebtHmBYRBdhA/seed-3967155904.png",
    "https://replicate.delivery/pbxt/UDI4TRsUyW6xJtkYt5QexzOWZQA8Nhqc1wRO7GqA0NCjffchA/seed-3923470405.png",
    "https://replicate.delivery/pbxt/DOYC07NLuJo0G9NESO3Q8l8yJx34AvkSeaEdx0lgbiDyJMXIA/seed-2669110691.png",
    "https://replicate.delivery/pbxt/C4jQ4rsnJw6RBFtmB9HpRDMC6EhfY4wqgBniYn548LOWHQXIA/seed-2171601913.png",
    "https://replicate.delivery/pbxt/QD2AQkNCsU69BtpE24OfvTUqxNATDBjU5kNeIJpEfzT8iwchA/seed-1141781968.png",
    "https://replicate.delivery/pbxt/7b2UVo2KyR6yNpBvBZePNgQOEGrEIfq9JTlI7ofEysruRBdhA/seed-3259849426.png",
    "https://replicate.delivery/pbxt/kD7HbfFYvu1vay17Xn4em9LQGwLKSAuEvrfsWKtmExhms5bhA/seed-777519545.png",
    "https://replicate.delivery/pbxt/bvYRqfaOruQwcCVJaqglNu1EIc9BWuSoT2rDcodMhsV62MXIA/seed-4294312898.png",
    "https://replicate.delivery/pbxt/uLuSCatDnGr9L5iOPcKU59EZzn4RjcIS5fkCfwct9YsgVfbhA/seed-3834638830.png",
    "https://replicate.delivery/pbxt/CvCvG1whFtq8AN0nEl8U0AtdezhxkfkVovSwZdn8EpfFz0chA/seed-1148147233.png",
    "https://replicate.delivery/pbxt/dICOXxdmq6piCJI0aVYr1wsZTVytYd5S1Vf7u8ojC1pAoJXIA/seed-3374923532.png",
    "https://replicate.delivery/pbxt/H5dHY8XfhxQsTCPmuheT2RdqzQ0UKbNzVffLft2IoaOZ0LzFC/seed-3769951775.png",
    "https://replicate.delivery/pbxt/vbtLiHQwNAbRNpsDSMF0Nlw9FtjC63XadIQnCmuH6V3bOmLE/seed-381445308.png"
].map((url) => optimizer_base + url)
