import { Generated } from '@/types'
import { Badge, Button, Card, Tooltip } from '@nextui-org/react'
// import { Delete, Edit, Heart, Search } from '@odyssoft/iconly-clone'
import { Copy, Trash2 } from 'lucide-react'
import { extractImageUrl } from '../../lib/extractImageUrl';
import { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
interface Props {
    data: Generated
    onPress: () => void
    onCopy: () => void
    onDrop: (acceptedFiles: File[]) => void
    onDelete: () => void
    watermark?: boolean
}

const GeneratedItem = ({ data: { status, id, marked_for_deletion }, onPress, onCopy, onDrop, onDelete, watermark }: Props) => {

    const src = extractImageUrl(status) //null means generating
    // const optimizer_base = `https://img.arible.co/cdn-cgi/image/format=webp,quality=20/`
    const optimizer_base = 'https://ik.imagekit.io/crg7fqrjg/'
    let optimized_src = src?.replace('https://replicate.delivery/', optimizer_base)
    optimized_src = optimized_src ? `${optimized_src}?tr=w-256,fo-auto` : undefined

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            image: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
        }
    })

    if (!src) {
        return < div role="status" className="animate-pulse" >
            <div className="flex items-center justify-center w-full aspect-square  bg-neutral-900 rounded-md h-full">
                <svg className="w-12 h-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
            </div>
        </div>
    }


    return <div
        {...getRootProps()}
        onClick={marked_for_deletion ? undefined : onPress}
        id={id.toString()}
        className={`rounded-md relative  h-full  ${marked_for_deletion ? 'cursor-not-allowed' : 'cursor-zoom-in group'} ${isDragActive ? 'scale-105 duration-300' : ''} ${marked_for_deletion ? 'opacity-30 duration-150' : ''}`}
    >
        <input {...getInputProps()} />

        <img
            alt={id.toString()}
            src={optimized_src ?? 'https://via.placeholder.com/150'}
            width='100%'
            className='rounded-lg'
        />
        <div className='absolute top-0 right-0 p-2 group-hover:opacity-100 bg-opacity-60 opacity-0 duration-300'>

            <Button
                onClick={onDelete}
                className='bg-neutral-800 '
                auto
                icon={<Trash2 />}
            />

        </div>
        <div className='absolute w-fudll  bottom-2  p-2 opacity-0 duration-300 group-hover:opacity-100'>
            <Card className='h-full '>

                <Card.Footer
                    className='flex justify-between gap-1'
                >
                    <Tooltip placeholder='right' content={
                        <Badge color={'secondary'}>Copy this Style</Badge>
                    }>
                        <Button
                            onClick={onCopy}
                            className='bg-neutral-800'
                            auto
                            icon={<Copy />}
                        />
                    </Tooltip>

                    {/* <Tooltip placeholder='right' content={
                        <Badge color={'error'}>Edit Styles: Coming Soon</Badge>
                    }>
                        <Button
                            className='bg-neutral-800'
                            auto
                        // icon={<Edit />}
                        />
                    </Tooltip> */}
                    {/* <Tooltip placement='top' content={
                        <Badge color={'primary'}>Save Style: Coming Soon</Badge>
                    }>
                        <Button
                            className='bg-neutral-800'
                            auto
                        // icon={<Heart primaryColor='#E2294F' filled />}
                        />
                    </Tooltip> */}

                </Card.Footer>
            </Card>
            {/* </div> */}
        </div>
    </div >
}


export default memo(GeneratedItem)