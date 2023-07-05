import { Navigation } from '@/components/Navigation'
import { AppContext } from '@/lib/AppState'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { ShowcaseSection } from '@/components/'
import { ModalContext } from '@/lib/ModalState'

export default () => {
    const router = useRouter()
    const { userId } = router.query as { userId?: string }

    return <div className='h-full'>
        <ShowcaseSection userId={userId} />
    </div>
}