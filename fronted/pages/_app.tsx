import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from "next/head"
import { useRouter } from 'next/router';
import { useRef,useEffect } from 'react'
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core'



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { en, zh } from 'make-plural/plurals'

i18n.loadLocaleData('en', { plurals: en })
i18n.loadLocaleData('zh', { plurals: zh })


function MyApp({ Component, pageProps }) {
  const { locale } = useRouter()

  useEffect(() => {
    async function load(locale) {
      const { messages } = await import(`../locale/${locale}/messages.po`)

      i18n.load(locale, messages)
      i18n.activate(locale)
    }

    load(locale)
  }, [locale])


  return (
    <I18nProvider i18n={i18n}>
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Welcome to AIINFITE</title>
        <meta name="viewport" content='width=device-width,initial-scale=1'/>
        </Head>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={5000}
        closeOnClick
        theme="dark"
        position= "bottom-right"
      />
      </SessionProvider>
      </I18nProvider>
  )
}

export default MyApp
