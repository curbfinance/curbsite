'use client'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import { getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Liquidity() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [curbAmount, setCurbAmount] = useState('')
  const [solAmount, setSolAmount] = useState('')
  const [loading, setLoading] = useState(false)

  // Simplified liquidity addition (replace with actual Raydium SDK logic)
  const handleAddLiquidity = async () => {
    if (!publicKey || !curbAmount || !solAmount) return
    
    setLoading(true)
    try {
      const curbMint = new PublicKey(process.env.NEXT_PUBLIC_CURB_MINT)
      const ata = await getAssociatedTokenAddress(curbMint, publicKey)
      
      const tx = new Transaction()
      // Add actual Raydium liquidity instructions here
      // This is a placeholder transaction
      tx.add(createTransferInstruction(
        ata,
        new PublicKey(process.env.NEXT_PUBLIC_RAYDIUM_LP),
        publicKey,
        BigInt(Number(curbAmount) * BigInt(10 ** 9)
      ))

      const signature = await sendTransaction(tx, connection)
      await connection.confirmTransaction(signature)
      
      toast.success(
        <a 
          href={`https://raydium.io/liquidity/add/?coin0=${curbMint}&coin1=SOL`} 
          target="_blank"
          className="underline"
        >
          Liquidity added! Manage on Raydium
        </a>
      )
      setCurbAmount('')
      setSolAmount('')
    } catch (error) {
      toast.error(`Failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">💧 ADD LIQUIDITY</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">CURB Amount</label>
          <input
            type="number"
            value={curbAmount}
            onChange={(e) => setCurbAmount(e.target.value)}
            placeholder="0.0"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">SOL Amount</label>
          <input
            type="number"
            value={solAmount}
            onChange={(e) => setSolAmount(e.target.value)}
            placeholder="0.0"
            className="input-field"
          />
        </div>
        <button
          onClick={handleAddLiquidity}
          disabled={!publicKey || !curbAmount || !solAmount || loading}
          className={`btn-primary w-full ${
            loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Processing...' : 'ADD TO RAYDIUM'}
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        You'll receive LP tokens representing your pool share
      </p>
    </div>
  )
}
