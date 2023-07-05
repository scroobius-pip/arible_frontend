import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider, useSSR } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

import '@/styles/globals.css'
import { ModalProvider } from '@/lib/ModalState';
import { AppProvider } from '@/lib/AppState';
import { useState } from 'react';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {}, // optional
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {}, // optional
  }
})

export default function App({ Component, pageProps }: AppProps<{
  initialSession: Session
}>) {
  const { isBrowser } = useSSR()
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return isBrowser &&
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <NextThemesProvider
        defaultTheme='dark'
        value={{
          light: lightTheme.className,
          dark: darkTheme.className
        }}
        attribute="class">
        <NextUIProvider>
          <AppProvider>
            <ModalProvider>
              <Component {...pageProps} />
            </ModalProvider>
          </AppProvider>
        </NextUIProvider>
      </NextThemesProvider>
    </SessionContextProvider>
}
