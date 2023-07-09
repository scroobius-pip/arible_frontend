import { ErrorType } from '@/lib/api';
import { AppContext } from '@/lib/AppState';
import { ModalContext } from '@/lib/ModalState';
import { Modal, Progress } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PersonSelectCard from './PersonSelectCard';
import UploadImageCard from './UploadImageCard';
import dynamic from 'next/dynamic';

const PhotoBooth = dynamic(() => import('..').then((mod) => mod.PhotoBooth), { ssr: false })

interface Props {

}


const wrapperComponent = ({ children, key }: any) => {
    return <motion.div
        className=''
        key={key}
        initial={{ opacity: 0, height: 0 }}
        animate={{
            opacity: 1, height: 'auto',
            transition: {
                height: { duration: 0.2, },
                opacity: { duration: 0.1, }
            }
        }}
        exit={{
            opacity: 0, height: 0,
            transition: {
                height: { duration: 0.2, },
                opacity: { duration: 0.1 }
            }
        }}
    >
        {children}
    </motion.div>
}


export default function PersonCreatorSection({ }: Props) {

    const [fileUrl, setFileUrl] = useState<string | null>(null)
    // const [open, setOpen] = useState(_open)
    const [personType, setPersonType] = useState('')
    const [personVariant, setPersonVariant] = useState<'real' | 'art' | null>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [name, setName] = useState('default')
    const { operations } = useContext(AppContext)
    const { setPricingModalVisible, setPersonCreatorModalVisible } = useContext(ModalContext);

    const router = useRouter()

    useEffect(() => {
        const { action, value } = router.query
        if (action === 'create' && value) {
            const decodedString = decodeURIComponent(value as string)
            const { personType, name, fileUrl, personVariant } = JSON.parse(decodedString)
            if (personType && name && fileUrl && personVariant) {
                setPersonType(personType as string)
                setPersonVariant(personVariant)
                setName(name as string)
                setFileUrl(fileUrl as string)
                setPersonCreatorModalVisible(true)
            }
        }
    }, [router.query])

    // clear state on close
    useEffect(() => {
        if (!open) {
            setFileUrl(null)
            setPersonType('')
            setName('')
            setCurrentStep(0)
            setPersonVariant(null)
        }
    }, [open])


    useEffect(() => {
        if (fileUrl && personType && personVariant) {
            setCurrentStep(2)
            operations.createNewPerson({
                person_type: personType as any,
                images_zip_url: fileUrl,
                name: 'default'
            }, 'real').then((result) => {

                if (result.error === ErrorType.Credits) {
                    setPricingModalVisible(true, {
                        fileUrl,
                        personType,
                        name,
                        personVariant
                    })
                    return
                }

                setTimeout(() => {
                    toast(`${name === 'default' ? 'Avatar' : name} Created! Check Back in 20 Minutes`, {
                        duration: 20000,
                        icon: '👍',
                        style: {
                            background: '#0a0a0a',
                            borderRadius: '10px',
                            border: '1px solid #262626',
                            fontSize: '0.9rem',
                            boxShadow: '0 0 10px #000',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                        }
                    })
                }, 1200)

                setTimeout(() => {

                    // onClose()
                    //navigate to platform selection etc
                }, 5000)

                setTimeout(() => {
                    window.location.replace(`/create`)
                }, 10000)

            }).catch((err) => {
                console.error(err)
                setCurrentStep(2)
            })

        }
        else if (personType) {
            setCurrentStep(1)
        }
        else {
            setCurrentStep(0)
        }
    }, [personType, fileUrl, name])

    const steps = [
        {
            component: <PersonSelectCard
                personType={{
                    type: personType,
                    variant: personVariant
                }}

                setPersonType={(value) => {
                    setPersonType(value.type)
                    setPersonVariant(value.variant)
                }}
            />,
            title: 'Create Your Avatar'
        },
        {
            component: <PhotoBooth
                setFileUrl={fileUrl => setFileUrl(fileUrl)}
            />,
            title: 'Take Photos'
        },
        {
            component: <div
                className='flex gap-2 flex-col w-full max-w-sm m-auto text-center p-4 bg-neutral-900 rounded-3xl border-solid border-neutral-800 '>
                <Progress
                    color={'gradient'}
                    indeterminated
                    size={'xl'}
                />
                <p className='text-neutral-300 text-sm animate-pulse capitalize'>Starting to Train Your New Avatar</p>
                {/* <p>Filename: {fileUrl}</p> */}
            </div>,
            title: 'Loading'
        }
    ]
    const wrapped_steps = steps.map((step, index) => wrapperComponent({ children: step.component, key: index }))

    return <>
        <div
            className="  h-full items-center justify-center lg:hidden">
            <Toaster />
            <AnimatePresence mode='wait'>
                {wrapped_steps[currentStep]}
            </AnimatePresence>
        </div>
        <div className='text-center bg-neutral-900 border-solid border-neutral-800 rounded-3xl max-w-lg m-auto p-6 hidden lg:block'>
            <h1 className='text-4xl font-extrabold'>This section is only available on mobile</h1>
            <div className='flex flex-col gap-6'>
                <p className='text-xl'>We need to use your phone camera. Please visit this page on your mobile device to create an avatar</p>
                <p>This page's link is <a className='text-purple-600 font-bold text-lg' href='arible.co/create'>arible.co/create</a></p>
                <p className='font-bold'>Or scan this QR code with your phone</p>
                <img className='rounded-xl' src='/create_qr.png' alt='qr code' />
            </div>
        </div>
    </>
}
