import useImageSelectZipped from '@/lib/useImageSelectZippedC';
import { Button, Loading, Progress, Text } from '@nextui-org/react';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star } from '@odyssoft/iconly-clone';

export interface Props {
    setValue: (fileName: string) => void;
}
export default ({ setValue }: Props) => {
    const { openSelect, result, uploading, progress } = useImageSelectZipped();
    const [uploadDisabled, setUploadDisabled] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setUploadDisabled(false);
        }, 5000);
    }, []);

    useEffect(() => {
        if (result.fileName) {
            setValue(result.fileName);
        }
    }, [result]);

    if (result.error) {
        return <div className='flex items-center justify-center'>
            <p className='text-red-800 text-center capitalize'>There was an issue uploading your images. Please try again.</p>
        </div>;
    }

    return <div className={`${uploading && ''} `}>

        {uploading ? <div
            className='flex gap-4 flex-col w-full'

        >
            <Progress
                className='w-full'
                shadow
                color={'gradient'}
                value={progress}
            />
            <p className='text-neutral-300  capitalize '>Uploading Your Photos To A Safe Place</p>
        </div> :
            <>

                <div className='flex gap-4 flex-col'
                    style={{
                        maxWidth: 'calc(100vw - 2rem)'
                    }}
                >
                    <h4 className='text-2xl font-black'>Simple Rules For Your Uploaded Photos</h4>
                    <div>
                        <div className='text-sm flex flex-col gap-4 italic'>
                            <div>
                                <p className='text-sm opacity-80'>
                                    For AI to work, here's what we need
                                </p>
                                <p className='text-sm opacity-80'>
                                    A simple guide, so you can succeed.
                                </p>
                            </div>
                            <div>
                                <p className='text-purple-400 font-semibold '>Take photos from angles, far and near,</p>
                                <p>In various places, with your <b className='text-purple-400 '>face clear</b>.</p>
                            </div>
                            <div>

                                <p> <b className='text-purple-400 '>No sunglasses on</b>, your eyes we must see,</p>
                                <p>Make sure it's <b className='text-purple-400'>just you</b>, no friends or family.</p>
                            </div>
                            <div>

                                <p> <b className='text-purple-400 '>No hats</b>, or <b className='text-purple-400'>hoods</b> on your head,</p>
                                <p>And <b className='text-purple-400 '>no masks</b>, we need your face instead.</p>
                            </div>
                            <div>
                                <p className='text-'>
                                    <b className='text-purple-400 '>Filters none,</b> or effects bizarre,
                                </p>
                                <p className='text-'>
                                    <b className='text-purple-400 '>Best pictures</b> choose, to make you a <b className='text-orange-400'>
                                        <span className='align-middle spin'>
                                            <Star set='bold' size='small' />
                                        </span>
                                    </b>
                                </p>
                            </div>

                        </div>

                    </div>



                    <p className='text-sm font-bold text-center my-6 p-2 bg-none bg-neutral-800 rounded-md'>We need at least 15 pics for the AI to do its magic right</p>

                </div>
            </>
        }
        {!uploading && <Button color={'secondary'} isDisabled={uploading} onClick={openSelect} className='w-full' disabled={uploading || uploadDisabled}>{uploading ? 'Uploading' : 'Upload'} 15+ Photos</Button>}
    </div >;
};


function ImageHorizontalScroll({ images, variant }: { images: any[], variant?: 'wrong' | 'right' }) {
    return <div className='flex flex-row overflow-x-auto gap-4  p-2'>
        {
            images.map((image, index) => {
                return <div className='w-32 h-32 bg-gray-200 rounded-md relative shrink-0'>

                    {
                        variant === 'wrong' ?
                            <X className='absolute top-2 left-2 h-6 w-6 text-red-500' /> :
                            <Check className='absolute top-2 left-2 h-6 w-6 text-green-500' />
                    }
                    <img alt={`${variant}${index}`} key={index} src={image} className='w-full h-full rounded-md' />

                </div>
            })
        }



    </div>
}