import { Generated } from '@/types'
import { Badge, Button, Card, Tooltip } from '@nextui-org/react'
import { Delete, Edit, Heart, Search } from '@odyssoft/iconly-clone'
import { Copy, Printer, PrinterIcon, ShareIcon } from 'lucide-react'
import { extractImageUrl } from '../../lib/extractImageUrl';
import { memo, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
interface Props {
    data: Generated
    onPress: () => void
    onShare: () => void
    watermark?: boolean
}

const ShowcaseItem = ({ data: { status, id, marked_for_deletion }, onPress, onShare, watermark }: Props) => {

    const src = extractImageUrl(status) //null means generating
    const optimizer_base = `https://img.arible.co/cdn-cgi/image/format=webp,quality=20/`



    if (!src) {
        return < div role="status" className="animate-pulse" >
            <div className="flex items-center justify-center w-full aspect-square  bg-neutral-900 rounded-md h-full">
                <svg className="w-12 h-12 text-purple-400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
            </div>
        </div>
    }


    return <div

        onClick={marked_for_deletion ? undefined : onPress}
        id={id.toString()}
        className={`rounded-md relative  h-full  ${marked_for_deletion ? 'cursor-not-allowed' : 'cursor-zoom-in group'} ${marked_for_deletion ? 'opacity-30 duration-150' : ''}`}
    >


        <img
            alt={id.toString()}
            src={`${optimizer_base}${src}` ?? 'https://via.placeholder.com/150'}
            width='100%'
            className='rounded-lg'
        />
        <div className='absolute top-0 right-0 p-2 group-hover:opacity-100 bg-opacity-60 opacity-0 duration-300'>


        </div>
        <div className='absolute w-full  bottom-2  p-2    duration-300  '>
            <Card className='h-full '>

                <Card.Footer
                    className='flex justify-between gap-1 bg-neutral-700-300'
                    isBlurred
                    css={{
                        // opacity: 
                        // bgBlur: "#0f111466",
                    }}
                >

                    <Button
                        className='bg-neutral-600'
                        auto
                        onClick={onShare}
                        icon={<ShareIcon />}
                    />


                    <Button
                        color={'secondary'}
                        auto
                        icon={<PrinterIcon />}
                    />


                </Card.Footer>
            </Card>
            {/* </div> */}
        </div>
    </div >
}


export default memo(ShowcaseItem)