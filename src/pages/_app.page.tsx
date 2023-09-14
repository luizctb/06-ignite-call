import '@/lib/dayjs'
import { globalStyles } from '@/styles/global'
import { Roboto } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  preload: true,
})

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={roboto.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  )
}
