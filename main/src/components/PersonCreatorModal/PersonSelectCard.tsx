import { Card, Grid, Row, Text } from '@nextui-org/react'
import { Camera, Star } from '@odyssoft/iconly-clone'

const options = [
    {
        name: 'Male',
        enabled: true,
        real: true,
        image: '/man.png',
        title: 'Male',
    },
    {
        name: 'Female',
        enabled: true,
        real: true,
        image: '/woman.png',
        title: 'Female',
    }
]

interface Props {
    setPersonType: (_: {
        type: string;
        variant: 'real' | 'art';
    }) => void;
    personType: {
        type: string;
        variant: 'real' | 'art' | null;
    };
}

export default ({ setPersonType, personType }: Props) => {
    return <div className='p-6 m-auto bg-neutral-900 rounded-3xl border-solid border-neutral-800 max-w-lg'>
        <h1 className='text-2xl font-extrabold'>Create Your Avatar</h1>
        <div className='pb-8 text-left flex flex-col gap-4'>
            <h4 className='text-xl font-bold'>Hey, we're gonna teach the AI to recognize your face, and then you can: </h4>
            <div>
                <div className='align-middle opacity-80 text-sm font-medium'>
                    <span className='align-middle'> <Camera set='bold' size={20} /> </span><span className='align-top'>Make as many profile pics as you want</span>
                </div>
                <div className='align-middle opacity-80 text-sm font-medium'>
                    <span className='align-middle'> <Camera set='bold' size={20} /> </span><span className='align-top'>Whip up endless social media photos</span>
                </div>
                <div className='align-middle opacity-80 text-sm font-medium'>
                    <span className='align-middle'> <Camera set='bold' size={20} /> </span><span className='align-top'>Snap countless professional headshots</span>
                </div>
                <div className='align-middle opacity-80 text-sm font-medium'>
                    <span className='align-middle'> <Camera set='bold' size={20} /> </span><span className='align-top'>Craft epic portraits to print on canvas</span>
                </div>
                {/* <div className='align-middle opacity-100 text-sm font-medium bg-gradient-to-tr from-purple-400 to-purple-600 text-white p-2 rounded-md w-fit mt-4'>
                    <span className='align-middle'> <Star set='bold' size={20} /> </span><span className='align-top'>Plus, we'll email our coolest portrait styles of you every month!</span>
                </div> */}
            </div>
        </div>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 '>
            {options.map((option, index) => <SelectCard
                image={option.image}
                key={index}
                text={option.title}
                selected={personType.type === option.name}
                enabled={option.enabled}
                onClick={() => {
                    setPersonType({
                        type: option.name,
                        variant: option.real ? 'real' : 'art'
                    })
                }}
            />)}
        </div>
    </div>
}


interface SelectCardProps {
    text: string;
    image: string;
    selected: boolean;
    enabled: boolean;
    onClick: () => void;
}

const SelectCard = ({ text, image, selected, enabled, onClick }: SelectCardProps) => {

    return <Card
        isPressable
        isHoverable

        onClick={onClick}
        // variant='bordered'

        className={`${!enabled && 'pointer-events-none opacity-40'} ${selected && 'border-4 border-neutral-300'}`}
    >
        <Card.Body className='p-0'>
            <Card.Image
                src={image}
                objectFit="cover"
                width="100%"
                className='aspect-square border-purple-800 rounded-3xl'
                loading='eager'
                alt={text}
            />
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

            <Text b >{text}</Text>

        </Card.Footer>
    </Card >

}
