import { ApiService, IStyle, IStyleInput, randomizeStyle } from '@/lib/api';
import { AppContext } from '@/lib/AppState';
import { extractImageUrl } from '@/lib/extractImageUrl';
import { Generated } from '@/types';
import { Button, Divider, Modal } from '@nextui-org/react';
// import { CloseSquare, Heart } from '@odyssoft/iconly-clone';
import { Copy, Download, Heart, Minimize, Printer, Share, SidebarCloseIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Countdown from 'react-countdown';

interface Props {
    selected: Generated | null;
    watermark: boolean;
    close: () => void;
}

const cloudinary_base = `https://img.arible.co/cdn-cgi/image/format=webp/`
export default function GeneratedModal({ selected, close, watermark }: Props) {
    const {
        status,
        style_id,
        upscaled_url,
        id,

    } = selected || {};

    const [style, setStyle] = useState<IStyle | null>(null);
    const { operations: { generateIStyle }, selectedPerson } = useContext(AppContext)

    useEffect(() => {
        if (selected && style_id)
            ApiService.getStyle(style_id).then(style => {
                if (style.data) {
                    setStyle(style.data)
                }
            })
    }, [selected])

    const handleCopy = () => {
        if (style && selectedPerson) {
            const newStyle = randomizeStyle(style)
            close()
            generateIStyle(newStyle, selectedPerson.id)
        }

    }


    const image = upscaled_url ?? (status && extractImageUrl(status)) ?? 'https://via.placeholder.com/150';
    const src = watermark ? cloudinary_base + image : image
    return <Modal
        css={{
            bgBlur: "#0f111466",
        }}
        fullScreen
        // closeButton
        noPadding
        open={!!selected}
        onClose={close}
        className='w-full'

    >
        <Modal.Body
            className='w-full h-full'
        >

            <div

                className='flex m-auto flex-1  h-full w-full lg:flex-row flex-col  gap-2 max-h-screen md:p-4'>

                <div className='h-full flex col-span-10  flex-auto relative'>
                    <Button
                        css={{
                            bgBlur: "#0f111466",
                        }}
                        auto
                        icon={<Minimize className='' size={24} />}
                        className='absolute md:inset-2 z-10   '
                        onClick={close}
                    />
                    <img
                        src={src}
                        alt={id?.toString()}
                        decoding="async"
                        className=' rounded-xl m-auto max-h-[90vh] ' />
                </div>
                <div className='relative bg-neutral-900  rounded-xl  w-full lg:w-min '>
                    <div className='flex justify-between gap-4 p-4 m-auto w-full'>
                        <div className='flex flex-col lg:flex-row gap-2 align-middle justify-between w-full'>
                            <div className='flex gap-2'>
                                <Button
                                    auto
                                    className=' bg-neutral-800  '
                                    icon={<Heart />}
                                >

                                </Button>
                                <Button
                                    auto
                                    className=' bg-neutral-800  '
                                    icon={<Download />}
                                    as='a'
                                    target='_blank'
                                    //@ts-ignore
                                    download
                                    href={src}

                                >

                                </Button>

                                <Button
                                    auto
                                    className=' bg-neutral-800  '
                                    icon={<Printer />}
                                >

                                </Button>
                            </div>
                            <Button
                                auto
                                onClick={() => {
                                    navigator.share({
                                        title: 'Share',
                                        text: 'Arible Avatars and Portraits',
                                        url: image

                                    }).then(() => {
                                        console.log('Thanks for sharing!');
                                    })
                                }}
                                className=' bg-neutral-800 self-start '
                                icon={<Share />}
                            >
                                <div className='hidden md:block'>
                                    Share
                                </div>
                            </Button>

                        </div>
                        <div className=''>

                            <Button
                                bordered
                                // disabled
                                color={'gradient'}
                                className='max-w-xs'
                            // icon={<Zap />}
                            >
                                <Countdown
                                    date={1682025575000}
                                    renderer={({ hours, minutes, seconds, completed, days }) => {
                                        return <p className='text-xs px-2 font-bold max-w-xs'>
                                            Upscale Feature: Coming In
                                            {completed ? ' Now' : ` ${days}d ${hours}h ${minutes}m`}
                                        </p>

                                    }}
                                />
                                {/* High Quality */}
                                {/* <Loading type="points" color="currentColor" size="sm" /> */}
                            </Button>

                        </div>
                    </div>
                    <Divider className='mt-2 w-full' />
                    <div className='p-4'>
                        <div className='flex flex-col gap-2 align-middle justify-center'>
                            <Button
                                size={'sm'}
                                auto
                                onClick={handleCopy}
                                // flat
                                icon={<Copy />}
                            >
                                Make more of this style
                            </Button>
                            <div className='my-12 flex gap-2 flex-col'>
                                <div>
                                    <h4 className='font-semibold mb-0 text-sm'>Style ID</h4>
                                    <p className='font-medium text-neutral-500'>
                                        {/* {prompt} */}
                                        {style_id}
                                    </p>
                                </div>
                                <div>
                                    <p className='capitalize font-semibold text-sm'>
                                        {style?.name}
                                    </p>
                                    <p className='font-medium text-neutral-500'>
                                        {(style as any)?.parameters[0]?.['parameter_type']?.['TextPrompt']?.['prompt']}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal >

}