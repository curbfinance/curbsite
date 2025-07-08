'use client' // Required for wallet components

import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'
import Head from 'next/head'

// CSS imports
import '@solana/wallet-adapter-react-ui/styles.css'
import './globals.css'

export default function RootLayout({ children }) {
  // Use mainnet for production
  const endpoint = useMemo(() => clusterApiUrl('mainnet'), [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter()
    ],
    []
  )

  return (
    <html lang="en">
      <Head>
        <title>Curb Finance - Memecoin on Solana</title>
        <meta name="description" content="The most un-stable DEX for degenerates" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="min-h-screen bg-gray-900 text-white">
        <WalletProvider wallets={wallets} autoConnect endpoint={endpoint}>
          <WalletModalProvider>
            {children}
            
            {/* Meme watermark */}
            <footer className="text-center p-4 text-gray-500 text-xs">
              <p>100% memes. 0% utility. Not financial advice.</p>
            </footer>
          </WalletModalProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
