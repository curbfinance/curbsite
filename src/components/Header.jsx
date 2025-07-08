import { useAccount, useDisconnect } from 'wagmi';

export default function Header() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-800 to-blue-600 text-white">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">CURB FINANCE</h1>
        <span className="ml-2 text-sm italic">(not affiliated with Curve)</span>
      </div>
      {isConnected ? (
        <div className="flex items-center">
          <span className="mr-2">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
          <button 
            onClick={disconnect}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <w3m-connect-button />
      )}
    </header>
  );
}
