import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { createBurnInstruction } from '@solana/spl-token';
import { CURB_TOKEN_MINT, SOLANA_RPC, DECIMALS } from '../constants';

export default function Burn() {
  const { publicKey, sendTransaction } = useWallet();
  const [burnAmount, setBurnAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState('');

  const connection = new Connection(SOLANA_RPC);

  const handleBurn = async () => {
    if (!publicKey || !burnAmount) return;
    
    setLoading(true);
    try {
      // Get token account
      const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { 
        mint: new PublicKey(CURB_TOKEN_MINT) 
      });
      
      if (tokenAccounts.value.length === 0) throw new Error("No Curb token account found");
      
      const tokenAccount = tokenAccounts.value[0].pubkey;
      
      // Create burn instruction
      const burnIx = createBurnInstruction(
        tokenAccount,
        new PublicKey(CURB_TOKEN_MINT),
        publicKey,
        BigInt(burnAmount * (10 ** DECIMALS))
      );
      
      // Send transaction
      const tx = new Transaction().add(burnIx);
      const signature = await sendTransaction(tx, connection);
      await connection.confirmTransaction(signature);
      
      setTxSig(signature);
      setBurnAmount('');
    } catch (error) {
      console.error("Burn failed:", error);
      alert(`Burn failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">🔥 Burn Curb Tokens</h2>
      <div className="mb-4">
        <input
          type="number"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
          placeholder="Amount to burn"
          className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
        />
      </div>
      <button
        onClick={handleBurn}
        disabled={!publicKey || !burnAmount || loading}
        className={`w-full py-3 px-4 rounded-lg font-bold ${
          !publicKey || !burnAmount || loading 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {loading ? 'Burning...' : 'BURN CURB'}
      </button>
      
      {txSig && (
        <div className="mt-4 text-sm">
          <p className="text-green-400">Burn successful!</p>
          <a 
            href={`https://solscan.io/tx/${txSig}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View on Solscan
          </a>
        </div>
      )}
      <p className="mt-4 text-gray-400 text-sm italic">
        Warning: Burning permanently removes tokens from circulation.
      </p>
    </div>
  );
}
