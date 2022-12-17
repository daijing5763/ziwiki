import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from "next/head"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
