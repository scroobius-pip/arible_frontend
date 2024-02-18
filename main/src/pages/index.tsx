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
    <main className='min-h-screen  grid'>
      <div className='bg-neutral-50 rounded-2xl shadow-sm p-12 text-neutral-900 max-w-5xl m-auto [&>*]:text-base '>
        <div className='text-center flex justify-start mb-8'> <span><Logo /></span></div>
        <h1 className='text-lg font-sderif'>Arible V2: The App Store for AI, Launching March 2024</h1>
        <br />
        <p  ><b className='font-serdif'>Eight months ago</b>, I launched Arible, my first foray into the SaaS world. It aimed to be the best AI Avatar Generator on the market, and in many ways, it succeeded. It offered features most competitors lacked, like a built-in face capture tool, a drag-and-drop style transfer interface, and a Discord bot for chat interaction.</p>
        <br />
        <p>Fast forward 8 months, and the AI landscape is booming. New tools pop up daily, and even I created barcode.so, one of the first AI-powered QR code generators.</p>
        <br />
        <p>In this crowded space, AI Tools needs three things to thrive: differentiation, specialization, and distribution.</p>
        <ul className='text-neutral-900 list-disc [&>li]:mb-1 [&>li]:text-base'>
          <li><strong className='font-dserif'>Differentiation:</strong> <p>Basic features are no longer enough. AI products need unique selling points to stand out.</p></li>
          <li><strong className='font-sderif'>Specialization:</strong> <p>Instead of trying to be everything to everyone, focusing on specific needs leads to better experiences.</p></li>
          <li><strong className='font-sderif'>Distribution:</strong> <p>Many potential users still have no idea these amazing tools exist! We need better ways to connect them with what they need.</p></li>
        </ul>
        <br />
        <h2 className='text-lg font-sderif'>Introducing Arible V2: Your Go-to Hub for Specialized AI Tools</h2>
        <p  >Launching in March, Arible V2 is transforming into the "App Store for AI." Forget juggling multiple platforms! Developers can build and offer their specialized tools all in one place, accessible across web, Android, iOS, and even a macOS app bar. Imagine tens of thousands of hyper-focused tools, each tackling a specific need with expertise.</p>
        <br />
        <h3 className='text-lg font-dserif'>What this means as a Developer:</h3>
        <ul className='text-neutral-900 list-disc [&>li]:mb-1 [&>li]:text-base'>
          <li><p>Ditch the hassle of backend/frontend development, hosting, billing, domains, app development, GPU costs, and marketing. <strong>Just focus on writing AI related code in Python</strong></p></li>
        </ul>
        <br />
        <h3 className='text-lg font-dserif'>What this means as a User:</h3>
        <ul className='text-neutral-900 list-disc [&>li]:mb-0 [&>li]:text-base ' >
          <li><p>No more platform hopping! Find everything you need in <strong>one trusted space.</strong></p></li>
          <li><p>Stronger <strong>privacy</strong> protection.</p></li>
          <li><p>Customer <strong>reviews and ratings</strong> to help you choose the right tool.</p></li>
          <li><p><strong>Discover</strong> tools you never knew existed!</p></li>
        </ul>
        <br />
        <p className='font-bold text-lg'>Stay tuned!</p>
        <br />

        <div className='flex flex-col items-end'>
          <p className='font-bold fontd-serif'>Chisimdiri Ejinkeonye</p>
          <p>Founder, Arible</p>
          <a href='mailto:simdi@arible.co' className='font-bold underline'>simdi@arible.co</a>
          <br />
          <a href='https://twitter.com/nintharc' className='font-bold underline'>Twitter</a>
        </div>
      </div>
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
          Plans start at $14.99.
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

