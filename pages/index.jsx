import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// Dynamic imports prevent SSR issues with wallets
const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)
const Burn = dynamic(
  () => import('../components/Burn'), 
  { ssr: false }
)
const Liquidity = dynamic(
  () => import('../components/Liquidity'),
  { ssr: false }
)
const Stats = dynamic(
  () => import('../components/Stats'),
  { ssr: false }
)

export default function Home() {
  const [activeTab, setActiveTab] = useState('burn')

  return (
    <>
      <Head>
        <title>Curb Finance - Memecoin on Solana</title>
        <meta name="description" content="The most un-stable DEX for degenerates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Rest of the code same as App Router version */}
      {/* ... */}
    </>
  )
}
