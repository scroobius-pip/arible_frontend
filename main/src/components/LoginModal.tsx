import { Button, Divider, Input, Loading, Modal, useInput } from '@nextui-org/react'
import { Send } from '@odyssoft/iconly-clone';
import { useMemo, useState } from 'react';
import { Logo } from './Logo';
import { } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
interface Props {
    onClose: () => void;
    open: boolean;
}

export default function LoginModal({ open, onClose }: Props) {
    const { value, reset, bindings } = useInput("");
    const [emailLoading, setEmailLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const supabase = useSupabaseClient();
    const getURL = () => {
        const isDev = process.env.NODE_ENV === 'development'

        let url = isDev ?
            'http://localhost:3000/create' :
            `${process?.env?.NEXT_PUBLIC_SITE_URL}/create` ?? // Set this to your site URL in production env.
            `${process?.env?.NEXT_PUBLIC_VERCEL_URL}/create`  // Automatically set by Vercel.

        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`;
        // Make sure to including trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
        return url;
    };

    const validateEmail = (value: string) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
            isValid,
        };
    }, [value]);

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getURL(),
            },
        })
    }

    async function signInWithEmail() {
        setEmailLoading(true);
        const { data, error } = await supabase.auth.signInWithOtp({
            email: value,
            options: {
                emailRedirectTo: getURL(),
            },
        })
        console.log(data, error)
        if (!error) {
            setEmailSent(true);
        }
        setEmailLoading(false);
    }


    return <Modal
        css={{
            bgBlur: "#0f111466",
        }}

        preventClose
        open={open}
        title='Login'
        onClose={onClose}

    >

        <Modal.Body
            className='w-full p-6'
        >
            <div className='m-auto w-max pb-12'>
                <Logo variant='light' />
            </div>
            <h4 className='text-center font-bold'>Sign Up / Login</h4>
            <div className='flex gap-12 flex-col'>
                <div className='w-full m-auto h-full flex items-center flex-col gap-2'>

                    <Button
                        onClick={signInWithGoogle}
                        size={'xl'}
                        className='bg-neutral-900 bg-opacity-50 w-full '
                        icon={<img src='/google.svg' />}
                    >
                        Google
                    </Button>


                </div>
                <Divider />
                <div className='w-full '>
                    {/* <h2>Login</h2> */}
                    <Input
                        // title='Email'
                        {...bindings}
                        clearable
                        shadow
                        onClearClick={reset}
                        // @ts-ignore
                        status={helper.color}
                        // @ts-ignore
                        color={helper.color}
                        // @ts-ignore
                        helperColor={helper.color}
                        helperText={helper.text}

                        type="email"
                        // label="Email"
                        placeholder="Enter your email"
                        className='w-full'
                        size='xl'
                        fullWidth

                    />
                    <Button size={'xl'} color='secondary' className='px-2 w-full mt-2' disabled={!helper.isValid || emailLoading || emailSent} auto icon={<Send />}
                        onClick={signInWithEmail}
                    >
                        {
                            emailSent ?
                                `Email Sent Check Your Inbox` :
                                emailLoading ?
                                    <Loading type='points' size='xl' color={'currentColor'} />
                                    : 'Send Login Link'
                        }
                    </Button>
                    {emailSent && <Button
                        onClick={() => setEmailSent(false)}
                        flat light className='w-full mt-4'>
                        Resend
                    </Button>}
                </div>



            </div>
        </Modal.Body>

    </Modal>
}