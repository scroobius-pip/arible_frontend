import { Avatar, Badge, Card, Row, Text, Tooltip } from '@nextui-org/react';
import { Check, CheckCheckIcon, CheckCircle2, CheckSquare, PersonStanding } from 'lucide-react';
// import { TickSquare } from '@odyssoft/iconly-clone';
import { memo } from 'react';
import { Style } from '@/types';

// export interface Prompt {
//     id: string
//     prompt: string
//     negative_prompt: string
//     summary: string
//     seed: number
//     height: number
//     width: number
//     guidance_scale: number
//     num_inference_steps: number
//     preview_image: string
//     pose_data: PoseData

// }

interface Props {
    data: Style
    selected: boolean
    onPress: (id: string) => void
}

const optimizer_base = 'https://ik.imagekit.io/crg7fqrjg/'

function StyleItem({ data, selected, onPress }: Props) {
    const image_src = data.image ? `${data.image.replace('https://replicate.delivery/', optimizer_base)}?tr=w-256,fo-auto` : '/arible_logo_light.svg'

    return <Card
        color='success'
        variant='bordered'
        className=''
        isHoverable
        isPressable
        data-style_id={data.style.name}
        onClick={() => onPress(data.id)}
    >
        <Card.Header

            css={{
                position: "absolute",

            }}
        >

            <div className='flex w-full justify-between items-center'>
                <Tooltip content={"This style is posed, and will generate predictable postures"}>
                    <PersonStanding color='white' />
                </Tooltip>


                {
                    selected && <CheckCircle2

                    />
                }
            </div>

        </Card.Header>
        <Card.Body
            className='p-0'
        >
            {
                image_src &&
                <Card.Image
                    src={image_src}

                    placeholder='blur'
                    color='success'
                    data-style_id={data.id}
                    objectFit={data.image ? "cover" : 'fill'}
                    width={'100%'}
                    loading='lazy'
                    alt={data.style.name}
                    className='aspect-square'
                    css={{
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)'
                        // aspectRatio: `${prompt.aspect_ratio[0]}/${prompt.aspect_ratio[1]}`,
                    }}
                />
            }
        </Card.Body>
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#0f111466",
                bottom: 0,
                zIndex: 1,
            }}
        >

            <p className='truncate text-sm text-white'>{data.style.name}</p>

        </Card.Footer>

    </Card>


}

export default memo(StyleItem)