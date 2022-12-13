import '../styles/globals.css'
import Head from "next/head"
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (



    <SessionProvider session={pageProps.session}>
      <Head>
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
