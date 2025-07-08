import { useContractRead } from 'wagmi';
import { CURB_TOKEN_ADDRESS, CURB_LP_ADDRESS } from '../constants';
import curbTokenABI from '../abis/curbToken.json';
import lpTokenABI from '../abis/lpToken.json';

export default function Stats() {
  // Total burned (assuming your token has a burn counter)
  const { data: totalBurned } = useContractRead({
    address: CURB_TOKEN_ADDRESS,
    abi: curbTokenABI,
    functionName: 'totalBurned',
    watch: true
  });

  // Total value locked (simplified)
  const { data: reserves } = useContractRead({
    address: CURB_LP_ADDRESS,
    abi: lpTokenABI,
    functionName: 'getReserves',
    watch: true
  });

  const tvl = reserves ? (Number(reserves[1]) / 10 ** 18 * 2 * 1800).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  }) : '$0';

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8 text-white">
      <h2 className="text-2xl font-bold mb-4">Curb Stats</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Total Curb Burned:</span>
          <span>{totalBurned ? (Number(totalBurned) / 10 ** 18).toLocaleString() : '0'}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Value Locked:</span>
          <span>{tvl}</span>
        </div>
        <div className="flex justify-between">
          <span>APY:</span>
          <span>69,420%</span> {/* Hardcoded for memes */}
        </div>
      </div>
      <p className="mt-4 text-gray-400 text-xs italic">
        Disclaimer: This is 100% a meme. Don't invest what you can't afford to lose to a parody project.
      </p>
    </div>
  );
}
