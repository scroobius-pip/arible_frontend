import { Logo } from '@/components/Logo';



export function Footer({ bg = 'bg-neutral-800', text = 'text-neutral-100', logoVariant = 'light' }) {
    // https://bronze-brush-9b0.notion.site/Privacy-Policy-ce351d4ad3ba4f34a5866a2de9f5188b
    return <footer className={`w-full ${bg} ${text} p-8`}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='flex flex-col gap-4'>
                <Logo variant={logoVariant} />
                <p className='text-sm font-medium'>Arible AI is an AI avatar generator. We use the latest in AI technology to generate avatars that look like you </p>
            </div>

            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl'>Legal</h2>
                <a href={'https://bronze-brush-9b0.notion.site/Arible-Terms-Conditions-c3d47a0775ca4deebac66f64b987f06b'} className='text-sm font-medium'>Terms of Service</a>
                <a href='https://bronze-brush-9b0.notion.site/Privacy-Policy-ce351d4ad3ba4f34a5866a2de9f5188b' className='text-sm font-medium'>Privacy Policy</a>
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl'>Pages</h2>
                <a href={'/prompts'} className='text-sm font-medium'>Stable Diffusion & MidJourney Prompt Database</a>
                <a href={'/pro'} className='text-sm font-medium'>Professional Portraits & Headshots</a>
                <a href={'/'} className='text-sm font-medium'>Avatars & Profile Pictures</a>
                <a href={'https://discord.gg/kmKMVNPE74'} target='_blank' className='text-sm font-medium'>Discord</a>
                <a href='/professional_photographer' target='_blank' className='text-sm font-medium'>Professional Photographer AI</a>
                <a href='https://barcode.so' target='_blank' className='text-sm font-medium'>Beautiful QRCode AI</a>
            </div>
            <div className='flex flex-col gap-4'>
                <h2 className='text-2xl'>Social</h2>
                <a href='https://twitter.com/nintharc' target='_blank' className='text-sm font-medium'>Made with ❤️ by Simdi</a>
                <a href='https://arible.getrewardful.com/signup' target='_blank' className='text-sm font-medium'>Earn 20% Commissions Referring Someone</a>
                <a href='https://www.instagram.com/arible_ai/' target='_blank' className='text-sm font-medium'>Instagram</a>
            </div>
        </div>
    </footer>;
}
