import Head from 'next/head'
import Header from '../components/Header'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  )
}
