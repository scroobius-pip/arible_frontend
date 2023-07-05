import { PersonCreatorModal, StylesBar } from '@/components';
import GeneratedModal from '@/components/GeneratedModal';
import LoginModal from '@/components/LoginModal';
import PricingModal from '@/components/PricingModal';
import ShareModal, { ShareData } from '@/components/ShareModal';
import StyleSelectModal from '@/components/StylesBar/StyleSelectModal';
import { Generated } from '@/types';
import { useModal } from '@nextui-org/react';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

interface ModalState {
    setSelectedGenerated: (item: Generated) => void;
    setStyleModalVisible: (visible: boolean) => void;
    setPersonCreatorModalVisible: (visible: boolean,) => void;
    setPricingModalVisible: (visible: boolean, nextArgs: object) => void;
    setLoginModalVisible: (visible: boolean) => void;
    setShareModalVisible: (visible: boolean, data: ShareData) => void;
}

const initialState: ModalState = {
    setSelectedGenerated: () => { },
    setStyleModalVisible: () => { },
    setPersonCreatorModalVisible: () => { },
    setPricingModalVisible: () => { },
    setLoginModalVisible: () => { },
    setShareModalVisible: () => { },
};

export const ModalContext = createContext<ModalState>(initialState);

export const ModalProvider = ({ children }: any) => {
    const session = useSession()
    // const router = useRouter()
    const [selectedItem, setSelectedItem] = useState<Generated | null>(null);
    const { setVisible: styleModalVisible, bindings: styleModalBindings } = useModal();
    const { setVisible: personCreatorModalVisible, bindings: personCreatorModalBindings } = useModal();
    const { setVisible: pricingModalVisible, bindings: pricingModalBindings } = useModal();
    const { setVisible: loginModalVisible, bindings: loginModalBindings } = useModal()
    const { setVisible: shareModalVisible, bindings: shareModalBindings } = useModal()
    const [shareData, setShareData] = useState({});
    const [nextArgs, setNextArgs] = useState({})


    const state: ModalState = {
        setSelectedGenerated: (item) => {
            setSelectedItem(item);
        },
        setStyleModalVisible: (visible) => {
            styleModalVisible(visible);
        },
        setPersonCreatorModalVisible: (visible) => {
            personCreatorModalVisible(visible);
        },
        setPricingModalVisible: (visible, args) => {
            setNextArgs(args)
            pricingModalVisible(visible);
        },
        setLoginModalVisible: (visible) => {
            loginModalVisible(visible);
        },
        setShareModalVisible: (visible, data) => {
            setShareData(data)
            shareModalVisible(visible);
        }

    };

    return <ModalContext.Provider value={state}>

        <PersonCreatorModal {...personCreatorModalBindings} />

        <StyleSelectModal
            {...styleModalBindings}
        />
        <GeneratedModal
            watermark={!session}
            close={() => setSelectedItem(null)}
            selected={selectedItem}
        />
        <PricingModal
            nextArgs={nextArgs}
            {...pricingModalBindings}
        />
        <LoginModal
            {...loginModalBindings}
        // open={!session && !['/', '/prompts', '/pro', '/sentry_sample_error', '/avatars'].includes(router.pathname)}
        />
        <ShareModal
            {...shareModalBindings}
            data={shareData as ShareData}

        />
        {children}

    </ModalContext.Provider>;
};
