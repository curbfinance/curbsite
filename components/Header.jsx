'use client'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-blue-600 text-white">
      <div className="flex items-center space-x-2">
        <Image 
          src="/logo.png" 
          alt="Curb Logo" 
          width={40} 
          height={40}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold font-meme">CURB FINANCE</h1>
      </div>
      <div className="wallet-adapter-dropdown">
        <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
      </div>
    </header>
  )
}
