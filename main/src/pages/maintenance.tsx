import ScrollingDiv from '@/components/ScrollingDiv';
import { Card } from '@nextui-org/react';

export default function Maintenance() {

    return <div className='flex min-h-screen justify-center items-center flex-col'>
        <h2 className='text-center '>We're currently upgrading the service to serve you better. </h2>
        <h3 className='text-center'>Sorry for the inconvenience</h3>

        <ScrollingDiv className='grid gap-10 w-full grid-cols-1 mt-12 md:grid-cols-3 lg:grid-cols-4 grid-flow-col '>

            <Card isHoverable isPressable className='rounded-[3.5rem]  md:hidden lg:block' >

                <Card.Image
                    src="https://res.cloudinary.com/disn5401t/image/upload/v1680750466/pro_head3_fa8fr4.webp"
                    objectFit="cover"
                    className='bg-neutral-200'

                    alt="Card image background"
                />
            </Card>
            <Card isHoverable isPressable className='rounded-[3.5rem]  '>

                <Card.Image
                    src="https://res.cloudinary.com/disn5401t/image/upload/v1680750465/pro_head5_jnduod.webp"
                    objectFit="cover"
                    className='bg-red-400'

                    alt="Card image background"
                />
            </Card>
            <Card isHoverable isPressable className='rounded-[3.5rem] '>

                <Card.Image
                    src="https://res.cloudinary.com/disn5401t/image/upload/v1680750466/pro_head1_masjbp.webp"
                    objectFit="cover"
                    className='bg-green-300'

                    alt="Card image background"
                />
            </Card>
            <Card isHoverable isPressable className='rounded-[3.5rem] '>

                <Card.Image
                    src="https://res.cloudinary.com/disn5401t/image/upload/v1680750653/pro_head7_gy6jww.webp"
                    objectFit="cover"
                    className='bg-blue-300'

                    alt="Card image background"
                />
            </Card>
        </ScrollingDiv>
    </div>
}
