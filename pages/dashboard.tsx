import { useAccount } from 'wagmi';
import { createWalletClient, createPublicClient, http, parseEther } from 'viem';
import { base } from 'viem/chains';
import Layout from '../components/Layout';
import PriceChart from '../components/PriceChart';
import { useState, useEffect } from 'react';
import { getZoraCoinData } from '../services/coinMarketCap';

// Import the contract bytecode and ABI from Zora's package
const CONTRACT_BYTECODE = "0x60806040523480156200001157600080fd5b506040516200156838038062001568833981016040819052620000349162000183565b600362000042838262000281565b50600462000051828262000281565b5060056200006082826200028..."; // This is a placeholder, you'll need the actual bytecode

const erc20Abi = [
  {
    inputs: [
      { name: "name", type: "string" },
      { name: "symbol", type: "string" },
      { name: "uri", type: "string" },
      { name: "payoutRecipient", type: "address" },
      { name: "platformReferrer", type: "address" },
      { name: "initialPurchaseWei", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  }
] as const;

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [coinData, setCoinData] = useState<any>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      const data = await getZoraCoinData();
      if (data) {
        setCoinData(data);
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  async function handleCreateCoin() {
    if (!isConnected || !address) return alert('Connect your wallet');
    if (isDeploying) return;

    try {
      setIsDeploying(true);
      const walletClient = createWalletClient({
        account: address,
        chain: base,
        transport: http('https://rpc-zora-mainnet-0.t.conduit.xyz/8hFKBHYtcmNiik3KswWDZJX5vHpYDmij'),
      });

      const publicClient = createPublicClient({
        chain: base,
        transport: http('https://rpc-zora-mainnet-0.t.conduit.xyz/8hFKBHYtcmNiik3KswWDZJX5vHpYDmij'),
      });

      // Deploy the contract
      const hash = await walletClient.deployContract({
        abi: erc20Abi,
        bytecode: CONTRACT_BYTECODE as `0x${string}`,
        args: [
          'EduCreator Coin',
          'EDU',
          'ipfs://QmVv5pzBnSoA6HnPWV8H4EJqCafiHo7rucXQBwqtS8QrFi',
          address,
          address,
          parseEther('0.01')
        ],
        account: address,
        chain: base
      });

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      console.log('Coin deployed at:', receipt.contractAddress);
      alert('Coin Created: ' + receipt.contractAddress);
    } catch (error) {
      console.error('Error creating coin:', error);
      alert('Error creating coin. Check console for details.');
    } finally {
      setIsDeploying(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Zora Coin Analytics</h2>
          <button 
            onClick={handleCreateCoin} 
            className={`bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors ${
              isDeploying 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
            }`}
            disabled={isDeploying}
          >
            {isDeploying ? 'Creating Token...' : 'Create My Creator Token'}
          </button>
        </div>

        {/* Coin Graph Section */}
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">ZORA COIN GRAPH SECTION WITH COIN MARKET CAP API</h3>
          <p className="text-sm text-gray-600 mb-6">
            ALL THE INSIGHT OF ZORA COIN WILL BE SHOWN HERE. USER WILL GET PRICE HISTORY, THE GRAPH AND COIN INFORMATION DIRECTLY FROM COIN MARKET CAP USING THE API.
          </p>
          <PriceChart />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="text-sm text-gray-500 mb-2">Current Price</h4>
              <p className="text-xl font-bold">
                ${coinData?.quote?.USD?.price?.toFixed(4) || '--'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="text-sm text-gray-500 mb-2">Market Cap</h4>
              <p className="text-xl font-bold">
                ${coinData?.quote?.USD?.market_cap?.toLocaleString() || '--'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="text-sm text-gray-500 mb-2">24h Volume</h4>
              <p className="text-xl font-bold">
                ${coinData?.quote?.USD?.volume_24h?.toLocaleString() || '--'}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-sm text-gray-500 mb-2">24h Change</h4>
            <p className={`text-xl font-bold ${
              (coinData?.quote?.USD?.percent_change_24h || 0) >= 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {coinData?.quote?.USD?.percent_change_24h?.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-sm text-gray-500 mb-2">7d Change</h4>
            <p className={`text-xl font-bold ${
              (coinData?.quote?.USD?.percent_change_7d || 0) >= 0 
                ? 'text-green-600' 
                : 'text-red-600'
            }`}>
              {coinData?.quote?.USD?.percent_change_7d?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}