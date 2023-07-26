import { AppContext } from '@/lib/AppState';
import { Person } from '@/types';
import { Button, Text, useModal, Modal, Dropdown, Avatar, Loading, Switch } from '@nextui-org/react';
// import { Camera, User, Plus } from '@odyssoft/iconly-clone';
import { useCallback, useContext, useState } from 'react';




interface Props {
    selected_id?: Person['id'] | null;
    onSelect: (id: string) => void
    persons: Person[]
}



export default function PersonSelector({ persons, onSelect, selected_id }: Props) {
    const { user } = useContext(AppContext)
    function pastel_colour(input_str: string) {

        //TODO: adjust base colour values below based on theme
        var baseRed = 128;
        var baseGreen = 128;
        var baseBlue = 128;

        //lazy seeded random hack to get values from 0 - 256
        //for seed just take bitwise XOR of first two chars
        var seed = input_str.charCodeAt(0) ^ input_str.charCodeAt(1);
        var rand_1 = Math.abs((Math.sin(seed++) * 10000)) % 256;
        var rand_2 = Math.abs((Math.sin(seed++) * 10000)) % 256;
        var rand_3 = Math.abs((Math.sin(seed++) * 10000)) % 256;

        //build colour
        var red = Math.round((rand_1 + baseRed) / 2);
        var green = Math.round((rand_2 + baseGreen) / 2);
        var blue = Math.round((rand_3 + baseBlue) / 2);

        const hex = "#" + ("000000" + rgbToHex(red, green, blue)).slice(-6);

        return hex;
    }
    const cachedPasteColor = useCallback((name: string) => {
        return pastel_colour(name)
    }, [])

    return <Dropdown

    >
        <Dropdown.Button
            //@ts-ignore 
            color={''}
            className={user ? '' : 'animate-bounce  duration-1000 hover:animate-none'}
            auto
            bordered
        >

            <Text
                // h3
                size={20}
                itemType="span"
                css={{
                    color: "white",

                }}
                weight="bold"
            >

                @{persons.find(p => p.id === selected_id)?.name ?? 'Select Person'}
            </Text>

        </Dropdown.Button>
        <Dropdown.Menu
            onAction={(key) => {
                onSelect(key as string)
            }}

            items={persons.filter(p => {
                const now = new Date().getTime() / 1000
                const two_days_ago = now - (60 * 60 * 24 * 2)
                return p.created_at > two_days_ago || !p.error
            })}
        >
            {(item: any) => (
                item.name === 'New Person' || item.name === 'New Product' ?
                    <Dropdown.Item key={item.id} withDivider={item.name === 'New Person'} command='⌘⇧N'
                    // icon={<Plus set="curved" />}
                    >
                        {item.name}
                    </Dropdown.Item> :
                    <Dropdown.Item
                        key={item.id}
                        className={`${item.is_done ? '' : 'animate-pulse'}`}
                        icon={
                            <Avatar

                                size="sm"
                                as="button"
                                //@ts-ignore
                                color={'gradient'}
                                src={item.avatar}
                            />
                        }

                        description={item?.error ? item.error : item.is_done ? '' : 'Your Avatar is Processing'}
                    >
                        <div className='flex justify-between items-center w-full truncate'>
                            <p className='text-sm font-bold'>
                                {(item.name.length <= 20) ? item.name : item.name.slice(0, 20) + '...'}
                            </p>

                            {item?.error ? <></> : item.is_done ? <></> : <Loading className='w-full ml-2' size="xs" />}
                        </div>

                        {/* <Button */}
                    </Dropdown.Item>
            )}
        </Dropdown.Menu>
    </Dropdown>
}

interface DropDownItemProps {
    person: Person
    onClick?: () => void
}

const DropDownItem = ({ person }: DropDownItemProps) => {
    return <Dropdown.Item

        key={person.id}
        className={`${person.is_done ?? 'animate-pulse'}`}
        icon={
            <Avatar

                size="sm"
                as="button"
                color="secondary"
                src={person.avatar}
            />
        }
    >
        <div className='flex justify-between items-center'>
            <Text>
                {person.name}
            </Text>
            <Loading size="xs" />
        </div>
    </Dropdown.Item>
}

function rgbToHex(red: number, green: number, blue: number) {
    var rgb = blue | (green << 8) | (red << 16);
    return rgb.toString(16);
}
