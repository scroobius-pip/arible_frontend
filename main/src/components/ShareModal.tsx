import { Modal } from '@nextui-org/react'
import { CopyIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
export interface ShareData {
    userId: string;
    // userName: string;
    generatedId: number;
    imageUrl: string;
    description: string;
}

interface Props {
    onClose: () => void;
    open: boolean;
    data: ShareData
}

export default function ShareModal({ onClose, open, data }: Props) {

    const copyClipboard = (link: string) => {
        // laxy load
        copy(link)
        toast.success('Copied to clipboard')
    }

    const items = shareItems(data, copyClipboard)
    return <Modal
        css={{
            bgBlur: "#0f111466",
            // height: '100vh',
        }}

        closeButton
        open={open}
        onClose={onClose}
    >
        <Toaster />
        <Modal.Header>
            <div className='text-center'>
                <h1 className='text-2xl font-bold'>Share</h1>
                <p className='text-base font-medium'>Share this link with your friends to show them your generated images.</p>
            </div>
        </Modal.Header>
        <Modal.Body noPadding>

            <ul className='py-4'>

                {items.map((item, index) => {
                    return <li key={index} className={'cursor-pointer mb-0 bg-neutral-600 bg-opacity-50 hover:bg-opacity-100 duration-200 p-4 px-4 ' + `${index === 0 ? 'rounded-t-xl' : index === items.length - 1 ? 'rounded-b-xl' : ''}`} onClick={item.onClick}>
                        <a href={item.link} className='flex items-center space-x-2'>
                            {item.icon}
                            <span className='font-semibold'>{item.name}</span>
                        </a>
                    </li>
                })}
            </ul>

        </Modal.Body>
    </Modal>
}


const shareItems = (data: ShareData, copyClipboard: (link: string) => any) => {
    // const url = `${MAIN_URL}/${data?.userId}?g=${data?.generatedId}`
    const { userId, generatedId, imageUrl, description, } = data
    const MAIN_URL = "https://arible.co/profile";
    const sharedUrl = `${MAIN_URL}/${userId}?g=${generatedId}`;
    const encodedSharedUrl = encodeURIComponent(sharedUrl);
    const encodedDescription = encodeURIComponent(description);

    const whatsappLink = `https://api.whatsapp.com/send?text=${encodedDescription}%0A%0A${encodedSharedUrl}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedSharedUrl}&quote=${encodedDescription}`;
    const twitterLink = `https://twitter.com/intent/tweet?url=${encodedSharedUrl}&text=${encodedDescription}&hashtags=arible`;
    const linkedinLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedSharedUrl}&title=${encodedDescription}`;
    const clipboardLink = `${sharedUrl}`;
    return [
        {
            name: 'Whatsapp',
            icon: <img src='/whatsapp.svg' alt='whatsapp' className='w-6 h-6' />,
            link: whatsappLink,
        },
        {
            name: 'Facebook',
            icon: <img src='/facebook.svg' alt='facebook' className='w-6 h-6' />,
            // link: 'https://www.facebook.com/sharer/sharer.php?u=https://image-generator-ten.vercel.app/',
            link: facebookLink,
        },
        {
            name: 'Twitter',
            icon: <img src='/twitter.svg' alt='twitter' className='w-6 h-6' />,
            // link: 'https://twitter.com/intent/tweet?url=https://image-generator-ten.vercel.app/',
            link: twitterLink,
        },
        {
            name: 'Linkedin',
            icon: <img src='/linkedin.svg' alt='linkedin' className='w-6 h-6' />,
            // link: 'https://www.linkedin.com/shareArticle?mini=true&url=https://image-generator-ten.vercel.app/',
            link: linkedinLink,
        },
        {
            name: 'Copy Link',
            icon: <CopyIcon size={24} />,
            link: '#',
            onClick: () => copyClipboard(clipboardLink),
        }
    ]
}