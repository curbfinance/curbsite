'use client'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { createBurnInstruction, getAssociatedTokenAddress } from '@solana/spl-token'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Burn() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleBurn = async () => {
    if (!publicKey || !amount) return
    
    setLoading(true)
    try {
      const curbMint = new PublicKey(process.env.NEXT_PUBLIC_CURB_MINT)
      const ata = await getAssociatedTokenAddress(curbMint, publicKey)
      
      const tx = new Transaction().add(
        createBurnInstruction(
          ata,
          curbMint,
          publicKey,
          BigInt(Number(amount) * BigInt(10 ** 9) // 9 decimals
        )
      )

      const signature = await sendTransaction(tx, connection)
      await connection.confirmTransaction(signature)
      
      toast.success(
        <a 
          href={`https://solscan.io/tx/${signature}`} 
          target="_blank" 
          rel="noopener"
          className="underline"
        >
          Burn successful! View on Solscan
        </a>
      )
      setAmount('')
    } catch (error) {
      toast.error(`Burn failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-400">🔥 BURN CURB</h2>
      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to burn"
          className="input-field"
        />
        <button
          onClick={handleBurn}
          disabled={!publicKey || !amount || loading}
          className={`btn-primary w-full ${
            loading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Burning...' : 'BURN TOKENS'}
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Warning: Burning is irreversible. You'll receive nothing in return.
      </p>
    </div>
  )
}
