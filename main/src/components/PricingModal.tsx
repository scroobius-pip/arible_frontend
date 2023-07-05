import { Modal } from '@nextui-org/react';
import Pricing from './PricingCard';

interface Props {
    onClose: () => void;
    open: boolean;
    nextArgs: object & { preventClose?: boolean }

}



export default function PricingModal({ onClose, open, nextArgs }: Props) {
    const { preventClose } = nextArgs

    return <Modal
        css={{
            bgBlur: "#0f111466",
            // height: '100vh',
        }}
        fullScreen
        // noPadding
        closeButton={!preventClose}
        open={open}
        onClose={onClose}
        preventClose={preventClose}

    >

        <Modal.Body
        // className='w-full h-full  flex md:justify-center'
        >
            <div className=''>
                <Pricing nextArgs={nextArgs} />
            </div>
        </Modal.Body>

    </Modal >
}