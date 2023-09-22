import Head from 'next/head'
import { Logo } from '@/components/Logo'
import { Button, Collapse, } from '@nextui-org/react'
// import { ArrowRight } from '@odyssoft/iconly-clone'
import ScrollingText from '@/components/ScrollingText'
import ScrollingDiv from '@/components/ScrollingDiv'
import AnimatedParagraph from '@/components/AnimatedParagraph'
import { useEffect, useState } from 'react'
import AnimatedImageGrid from '@/components/AnimatedImageGrid'
import Maintenance from './maintenance'
import { Footer } from '../components/Footer'
import { ArrowRight } from 'lucide-react'


const photoDescriptions = [
  "Could you please generate a professional photo for my LinkedIn profile?",
  "Could you create a fun and casual picture of me for my social media?",
  "Can I get a photo of myself dressed up for a fancy event?",
  "I need a new profile picture for my Instagram, can you help?",
  "Can you help create a picture of me in a chef's outfit for my food blog?",
  "I'm looking for a creative photo of myself for my art portfolio. Can you generate one?",
  "Could you produce an image of me in fitness attire for my personal training website?",
  "I need a picture of myself in a graduation gown for my college's alumni newsletter.",
  "Can you generate an image of me in a beach setting for my travel blog?"
];

const images = [
  [
    'https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/11e39084-abfa-42e3-cb48-ae405b0dac00/public',
    'https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/1d15ec3f-17b6-4314-85fb-64f641e5c200/public',
    'https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7362e610-fc06-4b7f-d08e-7d58397a7500/public'
  ]
]

const imagesDescriptions = [
  {
    description: "Could you please generate a professional photo for my LinkedIn profile?",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/6df77c79-d268-4be0-fa76-bd8fdfe20a00/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7b1f9235-ee89-415a-e7f6-3d9ec5243500/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/52618c84-d39d-43fe-4967-03471b816e00/public"

    ]
  },
  {
    description: "Could you create a fun and casual picture of me for my social media?",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/b253e1fb-73c3-4882-e003-72eef67c5700/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/3f1293d1-8cc9-4f5b-4fa1-b213198ea400/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/045d7286-f29b-4b10-577b-91a92a8d9500/public"
    ]
  },
  {
    description: "Can I get a photo of myself dressed up for a fancy event?",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/0a7390a4-1d49-454f-9e36-7acbe10fe000/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/9b6aecaf-8d22-4680-ce45-e66d6088b800/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/e7e3f391-f941-4a78-809d-f5626a86ae00/public"
    ]
  },
  {
    description: 'Could you produce an image of me in fitness clothes?',
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/65187044-0387-47dc-810f-42993d67d700/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/365e97f8-65bb-4302-f503-c223fa7ff600/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/103b6a8f-db77-4026-8a32-7c4c66edf200/public",
    ]
  },
  {
    description: "Can you help create a picture of me in a chef's outfit for my food blog?",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/4f6cf11d-bb8c-42f9-b9d8-b8643d7c8200/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/83d7e569-7c3a-432c-a65b-f6db8b56a400/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/df6d1dab-6105-444d-1ea1-57488201c600/public"
    ]
  },
  {
    description: "I'm looking for an artistic photo of myself ",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/38d5dcda-be00-4c5f-7c81-931c64a24900/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/807a905d-a8c8-4d88-2aa5-dfc08d208700/public",
      "https://img.arible.co/cdn-cgi/image/format=auto,quality=50/https://replicate.delivery/pbxt/puEWoFRQ5TbCB5q2ehKza8Uy2QfOUcPpv6fmAR6Nf3RyxZLDB/seed-752547532.png"
    ]
  },
  {
    description: "Can you generate an image of me in a beach setting?",
    images: [
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/a9fb8d17-1247-43b4-5dbd-83af396b5d00/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/f77ea4e8-8a3e-4518-5d25-078b1f4dd600/public",
      "https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/8394e511-ab38-4230-5cf6-7666732e2b00/public"
    ]
  }
]

// export default Maintenance
// export default
export default function Index() {

  const [currentPhotoDescription, setCurrentPhotoDescription] = useState(imagesDescriptions[0])

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = imagesDescriptions.indexOf(currentPhotoDescription) + 1
      setCurrentPhotoDescription(imagesDescriptions[nextIndex % imagesDescriptions.length])
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPhotoDescription]);



  return <>
    <Head>
      <title>Arible AI Portraits: Professional Portrait Picture AI For Social Media & LinkedIn</title>
      <meta name='description' content="Arible uses photos of your face to create photorealistic or realistic pictures of you that are indistinguishable from reallife. These can be used for profile pictures on social media or linkedin. Unlike other platforms you don't need existing photos of yourself, instead Arible uses a virtual photobooth (via your selfie camera) to take good samples of your face. Arible comes with 1000+ styles to choose from, or use your own" />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name='keywords' content='professional photography,virtual studio,avatars,corporate headshots,ai portraits,linkedin profile picture, corporate portrait,linkedin profile image' />
      <link rel='icon' href='/favicon.ico' />
      {/* canonical */}
      <link rel='canonical' href='https://www.arible.co' />
    </Head>
    <main
      className='min-h-screen'
    >
      <section
        className='min-h-screen p-4 md:p-8 grid grid-flow-row gap-6 grid-rows-1 lg:grid-rows-none lg:grid-flow-col lg:grid-cols-2 '
      >

        <div className='bg-neutral-100 rounded-3xl p-8 md:p-16 flex gap-6 justify-between flex-col'>
          <div>
            <div className='mb-20 w-full flex justify-center md:justify-start'>
              <Logo variant='dark' text='' />
            </div>
            <AnimatedParagraph className={''} sentence={currentPhotoDescription.description} />
            <AnimatedImageGrid
              small
              className='lg:hidden mt-4'
              images={currentPhotoDescription.images}
              id={currentPhotoDescription.description}
            />
          </div>
          <div className=''>

            <p className='text-neutral-s font-medium text-base md:text-xl mt-6 text-purple-800 mb-4'>
              Meet <b>Arible</b>: Your AI Photographer Buddy. Create and edit photos of yourself by chatting with Arible. No camera or photographer required.
            </p>
            <GetStarted />
          </div>
        </div>

        <AnimatedImageGrid
          className='hidden lg:grid'
          images={currentPhotoDescription.images}
          id={currentPhotoDescription.description}
        />
      </section>

      <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6'>
        <ScrollingText>
          <h1 className='font-black text-5xl md:text-7xl   text-center '>Say Goodbye <span className='font-medium'>To</span> Terrible Camera Photos</h1>
          <p className='text-xl text-center md:text-2xl font-medium text-neutral-300'>Unlimited Portraits Based On Your Face</p>
          <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />

        </ScrollingText>
        {/* masonry style grid */}
        <ScrollingDiv className='w-full h-full flex gap-6 max-w-6xl m-auto'>

          <div className='w-full h-full flex gap-6 flex-col'>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/11e39084-abfa-42e3-cb48-ae405b0dac00/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/1d15ec3f-17b6-4314-85fb-64f641e5c200/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
          </div>
          <div className='w-full h-full flex gap-6 flex-col'>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7362e610-fc06-4b7f-d08e-7d58397a7500/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/acc2b6c6-cac9-4127-2a30-58b1e5c34000/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
          </div>
          <div className='w-full h-full flex gap-6 flex-col'>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/7a36e797-e762-4417-b433-b4c7b6f4bc00/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
            <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>

              <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/53f6c067-911a-4129-b206-d8e81c64d600/public' className='w-full h-full object-cover rounded-3xl' />
            </div>
          </div>
        </ScrollingDiv>
      </section>


      <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col  gap-6'>
        <ScrollingText className='text-center'>
          <h1 className='font-black text-5xl md:text-7xl text-center m-auto  '><span className=''>
            <span className='font-medium'>1000+</span>
          </span> Ways To Express <span>
              <span className='font-medium'>Yourself</span>
            </span></h1>
          <p className='text-xl md:text-2xl  m-auto mt-4 text-center  font-medium text-neutral-300'>
            <span className='font-black'>
              Powered by the community
            </span> look different in 1000+ ways and share the love with everyone.</p>

          <div className='mt-8'>
            <a href='https://github.com/scroobius-pip/arible_prompts' target='_blank' className='p-6'>
              <span className='md:text-left animate-pulse '> Open-sourced For Everyone</span>
            </a>
            <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />
          </div>
        </ScrollingText>

        <ScrollingDiv
          className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4  overflow-hidden  '
        >
          <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
            <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/11e39084-abfa-42e3-cb48-ae405b0dac00/public' className='w-full h-full object-cover rounded-3xl' />

          </div>
          {
            sampleStyles.map((style, index) => {
              return <div key={index} className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                <img src={style} className='w-full h-full object-cover rounded-3xl' />
              </div>
            })
          }

        </ScrollingDiv>
      </section>
      <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col  gap-6 justify-between'>
        <ScrollingText>
          <h1 className='font-black text-5xl md:text-7xl   text-center '>Both Flexible and Easy To Use</h1>
          <p className='text-xl text-center md:text-2xl font-medium text-neutral-300'>Use Either The Discord Bot or Web Interface </p>
          <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />
        </ScrollingText>

        <ScrollingDiv className='max-w-5xl mt-12 m-auto h-full justify-between gap-12 grid grid-flow-row md:grid-flow-col '>
          <div className='bg-neutral-900  p-8 rounded-2xl  '>
            <h3 className='text-white text-center font-extrabold text-4xl mb-8'>Discord</h3>
            <div className='flex flex-col gap-12 '>
              <div className=' bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer aspect-square'>
                <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/9d0b37c1-b4de-4519-1ee8-82ea28bf7100/public' className='w-full h-full object-cover rounded-3xl' />
              </div>
              <div className=' bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
                <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/5c5956fb-8074-4638-9588-80ae3fcc0000/public' className='w-full h-full object-cover rounded-3xl' />
              </div>
            </div>
          </div>
          <div className='bg-white p-8 rounded-2xl  '>
            <h3 className='text-neutral-900 text-center font-extrabold text-4xl mb-8'>Web Interface</h3>
            <div className='flex flex-col gap-12 '>
              <div className=' bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer aspect-square'>
                <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/c46bed43-7d4b-4ebb-40dd-d2207700d600/public' className='w-full h-full object-cover rounded-3xl aspect-square' />
              </div>
              <div className=' bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer aspect-square'>
                <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/c8fb4f0d-b7ec-46ad-f64a-4a3b650ba200/public' className='w-full h-full object-cover rounded-3xl aspect-square' />
              </div>
            </div>
          </div>
        </ScrollingDiv>
      </section>
      <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6 max-w-6xl m-auto'>
        <ScrollingText>
          <h1 className='font-black md:text-7xl text-5xl   text-center '>
            Mix & Replicate <span className='font-medium'>Any</span> Photo
          </h1>
          <p className='text-2xl font-medium text-neutral-300 text-center '>
            A  Nerd-free drag and drop interface
          </p>
          <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />

        </ScrollingText>
        <div className='w-full h-full gap-12  grid grid-flow-row grid-cols-2 grid-row-1 '>

          <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer col-span-2'>
            <video preload='none' loop muted className='w-full h-full object-cover rounded-3xl'
              poster='https://pub-7bbc6377635e4e588a0a4c5fdfb0df93.r2.dev/arible_clone.gif'
              src='https://pub-7bbc6377635e4e588a0a4c5fdfb0df93.r2.dev/arible_clone.webm'
            />
          </div>
          {/* <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
            <video preload='none' loop muted className='w-full h-full object-cover rounded-3xl'
              poster='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/cdce83dc-ff6b-4d3d-2add-e62ae79a1c00/public'
              src='/arible_selector.mp4'
            />
          </div>
          <div className='w-full h-full bg-neutral-800 rounded-3xl shadow-2xl cursor-pointer'>
            <video autoPlay loop muted className='w-full h-full object-cover rounded-3xl'
              poster='/arible_styles.gif'
              src='/arible_styles.mp4'
            />
          </div> */}
        </div>
      </section>
      <section className='min-h-screen h-full p-4 md:p-20 pb-2 flex flex-col justify-between gap-6'>
        <ScrollingText>
          <h1 className='font-black text-5xl md:text-7xl   text-center '>Introducing RapidTake <span className='font-bold  relative -top-5 text-base py-2 px-4 bg-neutral-50 text-neutral-800 rounded-full'>TM</span></h1>
          <p className='text-xl text-center md:text-2xl font-medium text-neutral-300'>Don't have enough photos ? No Problem! <br /><span className='font-semibold text-neutral-100'>The only AI Avatar Platform to have integrated Face Capture</span></p>
          <GetStarted color='bg-neutral-50 max-w-xs m-auto my-8' text='text-neutral-900 ' />

        </ScrollingText>
        <img src='https://imagedelivery.net/y45xHmEkXDWfOcNHu7OOpA/6d6b3d28-5177-4e3b-dabc-37c20df2d800/public' className='max-w-2xl m-auto h-full object-cover' />
      </section>

      <section className='min-h-screen h-full p-4 md:p-8 pb-2 flex flex-col justify-between gap-6 rounded-3xl mb-20 md:mb-0'>
        <ScrollingText>
          <FaqSection rounded />
        </ScrollingText>
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
              $9.99
            </h1>

            <GetStarted />
            {/* <a href='https://arible.getrewardful.com/signup'>
              <Button flat color={'secondary'} className='mt-8 w-full' size='md'>Earn 20% Referring Someone</Button>
            </a> */}
          </ScrollingDiv>
        </div>
      </section>
      <Footer bg='bg-neutral-100' text='text-neutral-900' logoVariant='dark' />
    </main >
  </>
}

function GetStarted({ color = 'bg-neutral-900', text = '' }) {
  return <a href='/create'>
    <Button
      iconRight={
        <ArrowRight />
      }

      size={'lg'} className={`w-full ${color} ${text} py-8 `}
    >Try Demo <span className='text-xs ml-4 '>No Signup Required</span> </Button>
  </a>
}


export function Badges({ color = 'bg-neutral-900', text = 'text-neutral-100' }) {

  return <div className="sf-root w-12" data-id="3625461" data-badge="heart-badge-black" data-variant-id="sf" >
    <a href="https://sourceforge.net/software/product/Arible-AI/" target="_blank">Arible AI Reviews</a>


  </div>

}

export function FaqSection({ rounded = false }) {
  return <section className={`w-full bg-neutral-900  text-neutral-200 p-8 ${rounded ? 'rounded-3xl' : ''}`}>
    <h1 className='text-5xl'>Faq</h1>
    <Collapse.Group className='p-0'>
      <Collapse title="What is Arible ?">
        <p className=''>
          Arible is a platform that uses AI to learn how you look and creates high quality artistic or realistic photos of you.
        </p>
      </Collapse>
      <Collapse title="How Does This Work ?">
        <p>
          Sign up for an account, upload a few clear photos of your face, and the AI will learn your face and create a virtual twin of you. Then interact with the AI chatbot to create high quality photos of you.
        </p>
      </Collapse>
      <Collapse title="How Much Does This Cost ?">
        <p>
          Plans start at $9.99.
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
          Send an Inquiry to simdi@arible.co and I'll get back to you as soon as possible.
        </p>
      </Collapse>
      <Collapse title="Can I Stop My Subscription At Any Time ?">
        <p>
          Yes, you can cancel your subscription at any time.  However unless you haven't created any avatars, refunds are not possible due to how expensive training the AI is. Also your avatars will be deleted and be inaccessible immediately after cancellation.
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

// const optimizer_base = "https://img.arible.co/cdn-cgi/image/format=webp,quality=80/"
const optimizer_base = ""
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

