'use client' // Required for wallet interactions

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'

// Lazy load wallet-dependent components
const Header = dynamic(() => import('@/components/Header'), { ssr: false })
const Burn = dynamic(() => import('@/components/Burn'), { ssr: false })
const Liquidity = dynamic(() => import('@/components/Liquidity'), { ssr: false })
const Stats = dynamic(() => import('@/components/Stats'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('burn')

  return (
    <>
      <Head>
        <title>Curb Finance - Memecoin on Solana</title>
        <meta name="description" content="The most un-stable DEX for degenerates" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Tab Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('burn')}
              className={`px-6 py-3 rounded-lg font-bold ${
                activeTab === 'burn' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              🔥 Burn
            </button>
            <button
              onClick={() => setActiveTab('liquidity')}
              className={`px-6 py-3 rounded-lg font-bold ${
                activeTab === 'liquidity'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              💧 Liquidity
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {activeTab === 'burn' ? (
              <>
                <Burn />
                <Stats />
              </>
            ) : (
              <>
                <Liquidity />
                <Stats />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
