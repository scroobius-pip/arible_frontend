import { Button, Card, Input, useInput } from '@nextui-org/react'

export interface Props {
    setValue: (name: string) => void;
    value: string;
}

export default function NameSelectModal({ setValue }: Props) {
    const { value, bindings } = useInput("")

    return <div className='flex flex-col gap-8 text-left p-4'>
        {/* <h3>LastlEnter a Name</h3> */}
        <div>
            <h3>What would you like to call this person?</h3>
            <p className='text-gray-500'>You can use anything random that comes to mind!</p>
        </div>
        <Input
            {...bindings}
            value={value}
            label="Name"
            shadow
            type={'text'}
            className='w-full'
            size='xl'
            fullWidth
            placeholder="Enter a name for this person"
        />
        <Button onClick={() => {
            setValue(value);
        }}
            size={'xl'} color='secondary' className='px-2 w-full mt-2' disabled={!value} auto>
            Continue
        </Button>

    </div>
}