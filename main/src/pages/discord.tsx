import { AppContext } from '@/lib/AppState'
import { Progress } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

export default function DiscordRedirect() {

    const { user, operations: { registerDiscord } } = useContext(AppContext)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()


    useEffect(() => {
        const { code } = router.query as { code: string }
        if (user && code) {
            registerDiscord(code)
                .then((result) => {
                    if (result.success) {
                        window.location.href = 'https://discord.com/channels/@me/1103730183061647402'
                    } else {
                        setError('Something went wrong while trying to connect your Discord account. Please try again, if issue persists, contact us for help.')
                    }
                })
                .catch((e) => {
                    setError(e.message)
                })
        }
    }, [user])



    return <div className='min-h-screen gap-4 p-8 flex flex-col justify-center items-center '>
        <h1 className='text-4xl font-black'>Redirecting...</h1>
        <Progress
            indeterminated
            color={'gradient'}
        />
        {error && <h2 className='text-red-500 text-lg'>{error}</h2>}
    </div>
}