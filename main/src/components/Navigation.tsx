import { AppContext } from '@/lib/AppState';
import { ModalContext } from '@/lib/ModalState';
import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { useContext } from 'react';
import { Logo } from './Logo';

export function Navigation() {
    // const session = useSession()
    const { user } = useContext(AppContext)
    const supabase = useSupabaseClient();
    const { setPricingModalVisible, setLoginModalVisible } = useContext(ModalContext)

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log('Error logging out:', error.message);
        // reload
        window.location.reload();
    };


    return <Navbar containerCss={{
        // margin: '0 auto',
        width: '100%',
        marginLeft: 0,
        marginRight: 0,
        margin: 0,
        position: 'unset'
    }} shouldHideOnScroll
        style={{
            width: '100%',
            marginLeft: 0,
            marginRight: 0,
            margin: 0,
            position: 'unset'
        }}
        className='w-full p-2' isBordered variant={'floating'}>
        <Navbar.Brand >
            <Logo variant='light' />

        </Navbar.Brand>
        <Navbar.Content>
            <Dropdown placement="bottom-right">
                <Navbar.Item>
                    <Dropdown.Trigger>
                        <Avatar
                            bordered
                            as="button"
                            color="gradient"
                            src={user?.profile_image ?? undefined}
                            size="md"
                            id={user?.data?.email}
                        />
                    </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                    aria-label="User menu actions"
                    color="secondary"
                    onAction={(actionKey) => {
                        if (actionKey === 'logout') {
                            logout();
                        }
                        if (actionKey === 'pricing') {
                            user ? setPricingModalVisible(true, {}) : setLoginModalVisible(true)
                            // setPricingModalVisible(true, {})
                        }
                        if (actionKey === 'login' || actionKey === 'profile') {
                            setLoginModalVisible(true)
                        }
                    }}
                >
                    {user ? <Dropdown.Item key="profile" css={{ height: "$18" }} description={`${user?.data?.credits} Credits Available`}>
                        <Text b color="inherit" css={{ d: "flex", my: '$2' }} size='small'>
                            {user?.data?.email}
                        </Text>
                    </Dropdown.Item> :
                        <Dropdown.Item key="profile" css={{ height: "$18" }} description={`Login to get started`}>
                            <Text b color="inherit" css={{ d: "flex", my: '$2' }} size='small'>
                                Login
                            </Text>
                        </Dropdown.Item>

                    }


                    <Dropdown.Item key="affiliate" withDivider={!!user}>
                        <a href="https://arible.getrewardful.com/signup" target="_blank">
                            <Text b color="inherit" css={{ d: "flex" }} size='small'>
                                Affiliate & Referrals: Earn 20%
                            </Text>
                        </a>
                    </Dropdown.Item>
                    <Dropdown.Item key="pricing"  >
                        <Text b color="inherit" css={{ d: "flex" }} size='small'>
                            Pricing
                        </Text>
                    </Dropdown.Item>

                    <Dropdown.Item key="support" withDivider >
                        <Text b color="inherit" css={{ d: "flex" }} size='small'>
                            Support:  simdi@arible.co
                        </Text>
                    </Dropdown.Item>
                    <Dropdown.Item key="discord" >
                        <a href="https://discord.gg/kmKMVNPE74" target="_blank">
                            <Text b color="inherit" css={{ d: "flex" }} size='small'>
                                Discord
                            </Text>
                        </a>
                    </Dropdown.Item>
                    {user ? <Dropdown.Item key="logout" withDivider color="error">
                        <Text b color="inherit" css={{ d: "flex" }} size='small'>
                            Logout
                        </Text>
                    </Dropdown.Item> :
                        <Dropdown.Item key="login" withDivider color="secondary">
                            <Text b color="inherit" css={{ d: "flex" }} size='small'>
                                Login
                            </Text>
                        </Dropdown.Item>
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Navbar.Content>
    </Navbar>;

}
