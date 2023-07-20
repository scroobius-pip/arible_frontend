import { AppContext } from '@/lib/AppState';
import { ModalContext } from '@/lib/ModalState';
import { Button, Collapse, useModal, Text, Avatar, Tooltip } from '@nextui-org/react';
// import { Folder, Setting } from '@odyssoft/iconly-clone';
import { useContext, useState } from 'react';
import GenerateButton from '../GenerateButton';
import PersonSelector from './PersonSelector'
import StyleSelectModal from './StyleSelectModal';



export default () => {
    const [styleToggled, setStyleToggled] = useState(false)
    const { setPersonCreatorModalVisible, setStyleModalVisible, setLoginModalVisible } = useContext(ModalContext)
    const { persons, operations, selectedPerson, user, demoGeneratedCount } = useContext(AppContext)

    return <div className='p-2 md:p-4 bg-neutral-900 flex flex-row gap-4 border-0  border-b-[1px] border-solid border-b-neutral-600'>
        <div className='h-full flex flex-col md:flex-row gap-4 md:gap-2 justify-between  w-full'>
            <div className='flex flex-col md:flex-row gap-4 w-full justify-between'>
                <PersonSelector
                    onSelect={(id) => {
                        if (id === '-1') {
                            !user ? setLoginModalVisible(true) : setPersonCreatorModalVisible(true)
                            // setPersonCreatorModalVisible(true)
                        } else if (id === '-2') {
                            !user ? setLoginModalVisible(true) : alert('Coming Soon!')
                        } else {
                            //check if person has error and if so, don't select
                            if (persons.find(p => p.id === parseInt(id))?.error) {
                                return
                            }
                            operations.selectPerson(parseInt(id))
                        }
                    }}
                    selected_id={selectedPerson?.id}
                    persons={persons}
                />

                <div className='flex-row flex gap-2 md:w-full justify-between'>
                    <StyleSelectButton onClick={
                        () => {
                            if (!user && demoGeneratedCount >= 10) {
                                setLoginModalVisible(true)
                            } else {
                                setStyleModalVisible(true)
                            }
                        }
                    } />
                    {/* <Tooltip
                        content='Style Edits Coming Soon!'
                        placement='left'
                    >
                        <Button
                            disabled
                            onPress={() => setStyleToggled(!styleToggled)}
                            rounded
                            className={`'transform duration-300 bg-neutral-800   ease-in-out align-middle flex' ${styleToggled ? 'rotate-45' : 'rotate-0'}`}
                            auto
                        // icon={<Setting set="bold" />}
                        />
                    </Tooltip> */}
                </div>

            </div>
            {/* <GenerateButton /> */}
        </div>

    </div>
}



function StyleSelectButton({ onClick }: any) {



    return <div
        className='w-full '
    >
        <Button
            className='w-full bg-white text-neutral-800'
            // color={'white'}
            onClick={onClick}
        // icon={
        //     <Folder size={16} set="bold" primaryColor="black" />
        // }
        // bordered
        // size={'sm'}
        >
            Select Styles
        </Button>

    </div>
}