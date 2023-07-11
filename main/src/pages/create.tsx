import { AppContext } from '@/lib/AppState';
import { ModalContext, ModalProvider } from '@/lib/ModalState';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import PersonCreatorSection from '@/components/PersonCreatorModal/PersonCreatorSection';
import { Button } from '@nextui-org/react';
import { Compass } from 'lucide-react';
import GeneratedSection from '@/components/GeneratedSection/GeneratedSection';
import { StylesBar } from '@/components';


export default () => {
    const { user, } = useContext(AppContext)

    const loading = !user?.data?.persons;
    const personCreated = user?.data?.persons && user?.data?.persons.length > 0
    const [showGeneratedSection, setShowGeneratedSection] = useState(false)
    const { setPricingModalVisible } = useContext(ModalContext)

    useEffect(() => {
        if (user && user.data?.credits === 0) {
            setPricingModalVisible(true, { preventClose: true })
        }
    }, [user])


    const GeneratedSectionC = useCallback(() => <>
        <StylesBar />
        <GeneratedSection />
    </>, [])

    return <div className="min-h-screen flex flex-col ">
        <Navigation />

        {
            loading ? <GeneratedSectionC /> : user ?
                (personCreated ? (
                    showGeneratedSection ?
                        <GeneratedSectionC /> :
                        <PlatformSelector setShowGeneratedSection={setShowGeneratedSection} />
                ) : <PersonCreatorSection />) :
                <GeneratedSectionC />
        }

    </div >

}


const PlatformSelector = ({ setShowGeneratedSection }: any) => {
    return <section className='bg-neutral-900 border-solid border-neutral-800 text-neutral-100 max-w-xl m-auto p-6 rounded-2xl flex gap-6 flex-col'>
        <h1 className='text-2xl font-black'>Select a Platform</h1>
        <h2 className='text-lg'>Choose a platform to use Arible on. They all provide the same functionality.</h2>
        <div>
            <div className='w-full m-auto h-full flex items-center flex-col gap-2'>

                <a href='https://discord.com/api/oauth2/authorize?client_id=1103209118510100491&redirect_uri=https%3A%2F%2Farible.co%2Fdiscord&response_type=code&scope=identify%20guilds.join' className='w-full'>
                    <Button
                        size={'xl'}
                        className='bg-[#7289DA] w-full '
                        icon={<img src='/discord.svg' />}
                    >
                        Discord
                    </Button>

                </a>
                {/* <a href='https://arible.pro/create' className='w-full'> */}
                <Button
                    onClick={() => setShowGeneratedSection(true)}
                    size={'xl'}
                    className='bg-white w-full text-neutral-900'
                    icon={<Compass size={32} />}
                >
                    Web Interface
                </Button>
                {/* </a> */}
                <Button
                    size={'xl'}
                    className='bg-white w-full text-neutral-900 pointer-events-none opacity-25'
                    icon={<img src='/facebook.svg' />}
                >
                    Facebook Messenger (Coming Soon)
                </Button>


            </div>
        </div>
    </section>
}