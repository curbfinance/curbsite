'use client'
import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { getAccount } from '@solana/spl-token'
import { useEffect, useState } from 'react'

export default function Stats() {
  const { connection } = useConnection()
  const [stats, setStats] = useState({
    totalBurned: 0,
    tvl: 0,
    holders: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const curbMint = new PublicKey(process.env.NEXT_PUBLIC_CURB_MINT)
        const lpAccount = new PublicKey(process.env.NEXT_PUBLIC_RAYDIUM_LP)
        
        // Mock data - replace with actual on-chain calls
        setStats({
          totalBurned: 420_000_000,
          tvl: 69_420,
          holders: 1337
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }
    
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [connection])

  return (
    <div className="card bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">📊 CURB STATS</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total Burned:</span>
          <span className="font-mono">{stats.totalBurned.toLocaleString()} CURB</span>
        </div>
        <div className="flex justify-between">
          <span>TVL:</span>
          <span className="font-mono">${stats.tvl.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Holders:</span>
          <span className="font-mono">{stats.holders.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>APY:</span>
          <span className="font-mono text-green-400">69,420%</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-400 italic">
        Stats update every 30 seconds. May contain memes.
      </p>
    </div>
  )
}
