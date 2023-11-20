import { Style } from '@/types'
import { Card, Col, Row, Text } from '@nextui-org/react'
import { Heart } from 'lucide-react'
// import { Heart } from '@odyssoft/iconly-clone'
import { memo } from 'react'



interface Props {
    style: Style,
    selected: boolean,

}

// const cloudinary_base = "https://img.arible.co/cdn-cgi/image/width=256,height=256,fit=cover,format=auto/"

const StyleItem = ({ style: { image, style: { name } }, selected }: Props) => {
    // alert(prompt)
    const optimizer_base = 'https://ik.imagekit.io/crg7fqrjg/'
    let optimized_src = image?.replace('https://replicate.delivery/', optimizer_base) + '?tr=w-256,fo-auto'
    // optimized_src = optimized_src ? `${optimized_src}?tr=w-256,fo-auto` : undefined

    return <Card

        data-summary={name}
        // onClick={onPress}
        isHoverable
        isPressable
        className='w-full'
    // className=' relative  h-full group'
    >
        <Card.Body className='p-0' data-summary={name}>
            <Card.Image

                placeholder='blur'
                data-summary={name}
                src={optimized_src}
                width="100%"
                objectFit='cover'
                height="100%"
                alt={name}
            />
        </Card.Body>
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#ffffff66",
                borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                bottom: 0,
                zIndex: 1,
            }}
        >

            <Col>
                <Text color="#000" size={12} weight={'medium'}>
                    {name}
                </Text>
            </Col>
            <Col >
                <Row justify="flex-end">
                    {/* <Heart data-summary={name} primaryColor='#E2294F' filled={selected} /> */}
                    <Heart data-summary={name} />
                </Row>
            </Col>

        </Card.Footer>


    </Card >
}

export default memo(StyleItem)
//without
// export default StyleItem