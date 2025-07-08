import { useState } from 'react';
import Header from './components/Header';
import Burn from './components/Burn';
import Liquidity from './components/Liquidity';
import Stats from './components/Stats';

export default function App() {
  const [activeTab, setActiveTab] = useState('burn');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('burn')}
            className={`px-6 py-3 rounded-lg font-bold ${
              activeTab === 'burn' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Burn Curb
          </button>
          <button
            onClick={() => setActiveTab('liquidity')}
            className={`px-6 py-3 rounded-lg font-bold ${
              activeTab === 'liquidity' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Provide Liquidity
          </button>
        </div>

        {activeTab === 'burn' ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Burn />
            <Stats />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Liquidity />
            <Stats />
          </div>
        )}
      </div>
    </div>
  );
}
