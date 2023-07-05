import { ErrorType } from '@/lib/api';
import { AppContext } from '@/lib/AppState';
import { ModalContext } from '@/lib/ModalState';
import { Modal, Progress } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NameSelectModal from './NameSelectModal';
import PersonSelectCard from './PersonSelectCard';
import UploadImageCard from './UploadImageCard';
// import { isIOS } from 'react-device-detect'

interface Props {
    onClose: () => void;
    open: boolean;

}


const wrapperComponent = ({ children, key }: any) => {
    return <motion.div
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


export default function PersonCreatorModal({ onClose, open }: Props) {

    const [fileUrl, setFileUrl] = useState<string | null>(null)
    // const [open, setOpen] = useState(_open)
    const [personType, setPersonType] = useState('')
    const [personVariant, setPersonVariant] = useState<'real' | 'art' | null>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [name, setName] = useState('')
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
        if (fileUrl && personType && personVariant && name) {
            setCurrentStep(3)
            operations.createNewPerson({
                person_type: personType as any,
                images_zip_url: fileUrl,
                name
            }, personVariant).then((result) => {

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
                    toast(`${name} Created! Check Back in 20 Minutes`, {
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

                    onClose()
                }, 5000)

                setTimeout(() => {
                    window.location.replace(`/create`)
                }, 10000)

            }).catch((err) => {
                console.error(err)
                setCurrentStep(2)
            })

        } else if (personType && fileUrl) {
            setCurrentStep(2)
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
            title: 'Select a Person'
        },
        {
            component: <UploadImageCard
                setValue={fileUrl => setFileUrl(fileUrl)}
            />,
            title: 'Upload Photos'
        },
        {
            component: <NameSelectModal
                setValue={setName}
                value={name}
            />,
            title: 'Name Your Person'
        },
        {
            component: <div
                style={{
                    // width: 'calc(100vw - 10rem)',
                    // maxWidth: 'calc(100vw - 10rem)',

                }}
                className='flex gap-8 flex-col w-full'>
                <Progress
                    color={'gradient'}
                    indeterminated
                />
                <p className='text-neutral-300 animate-pulse capitalize'>Starting to Train Your New Avatar</p>
                {/* <p>Filename: {fileUrl}</p> */}
            </div>,
            title: 'Loading'
        }
    ]
    const wrapped_steps = steps.map((step, index) => wrapperComponent({ children: step.component, key: index }))

    return <Modal
        css={{
            bgBlur: "#0f111466",
        }}
        fullScreen
        closeButton

        open={open}
        onClose={onClose}

    >
        <Toaster />

        <Modal.Header className=''>
            <h1 className='text-3xl font-black'>{steps[currentStep].title}</h1>
        </Modal.Header>
        <Modal.Body className='text-center'>

            <div className=' bg-neutral-900 border-solid border-purple-400 shadow-2xl m-auto  p-8 md:p-12 rounded-xl max-w-2xl'>

                <AnimatePresence mode='wait'>
                    {wrapped_steps[currentStep]}
                </AnimatePresence>
            </div>
        </Modal.Body>

    </Modal>
}
