import Image from 'next/image';
import { Badge } from '@nextui-org/react';
import { Dropdown } from "@nextui-org/react";
import { useRouter } from 'next/router';

export function Logo({ variant = 'dark', text = '', color = 'secondary', }) {
    const router = useRouter();

    return <Dropdown >
        <Dropdown.Trigger>
            <div className={`max-w-fit relative ${variant === 'light' ? '' : 'sheen'}`}>

                <Image
                    className='inline-block align-middle'
                    src={variant === 'dark' ? "/arible_logo.svg" : '/arible_logo_light.svg'}
                    alt="Arible Logo"
                    width={100}
                    height={24}
                    priority />


                {text && <Badge className='inline-block align-middle' variant={'flat'} color={color as any}>{text}</Badge>}

            </div>
        </Dropdown.Trigger>
        <Dropdown.Menu
            selectedKeys={[router.pathname]}
            onAction={(actionKey) => {
                router.push(actionKey.toString())
            }}
        >
            <Dropdown.Item as='a' className='mb-4 py-8' description='Your Virtual Photographer' key="/" ><b>Avatars</b></Dropdown.Item>
            <Dropdown.Item className='py-8 ' showFullDescription description='Prompts for Stable Diffusion & Midjourney' key="/prompts"><b>Prompts</b></Dropdown.Item>
            <Dropdown.Item className='py-8 ' showFullDescription description='Professional Corporate Portraits' key="/pro"><b>Professional Portraits</b></Dropdown.Item>
            {/* <Dropdown.Item className='py-8' showFullDescription description='Professional Portrait Photography Without Photographers' key="/"><b>Pro</b></Dropdown.Item> */}

        </Dropdown.Menu>
    </Dropdown>
}
