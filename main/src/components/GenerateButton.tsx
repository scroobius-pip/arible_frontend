import { AppContext } from '@/lib/AppState';
import { Button, Loading } from '@nextui-org/react';
import { useContext } from 'react';

export default function GenerateButton({ text }: { text?: string }) {
    const { operations: { imFeelingLucky } } = useContext(AppContext)

    return <Button
        onClick={imFeelingLucky}

        color="gradient"
    >
        {text || 'Generate'}
        <Loading type="points" color="currentColor" size="sm" />
    </Button>

}
