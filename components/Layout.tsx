import { ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Leaderboard from './Leaderboard';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <div className="min-h-screen bg-blue-600 p-4">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 mb-4">
        <div className="flex justify-between items-center">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">UNIQUE PROFILE IMAGE WILL BE DISPLAYED HERE</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold">
            ProductiveFi
          </h1>

          {/* Wallet Connect */}
          <div className="bg-yellow-300 px-6 py-3 rounded-xl">
            <button
              onClick={() => isConnected ? disconnect() : connect()}
              className="font-medium text-gray-800"
            >
              {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-4">
        {/* Left Sidebar */}
        <div className="w-64 bg-white rounded-xl p-6">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <span>📊</span>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/studyfi" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <span>📚</span>
                  <span>StudyFi</span>
                </Link>
              </li>
              <li>
                <Link href="/gamefi" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <span>🎮</span>
                  <span>GameFi</span>
                </Link>
              </li>
              <li>
                <Link href="/token" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <span>🪙</span>
                  <span>Token&NFT</span>
                </Link>
              </li>
            </ul>
            <div className="mt-4 text-xs text-gray-500">
              <p>ON THIS PAGE THE MENU OF THIS WEBSITE WILL BE SHOWN AS: DASHBOARD, STUDYFI, GameFi, Token&NFT creators hub and focus mode. after clicking any of the option user will get redirected to its page. a small icon will be in the start of each menu name.</p>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-xl p-6">
          {children}
        </div>

        {/* Right Sidebar - Leaderboard */}
        <div className="w-80 bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">LEADER-BOARD</h2>
          <p className="text-sm text-gray-600 mb-4">
            THE LEADERBOARD SECTION. HERE ALL THE USERS COIN WILL BE RANKED ACCORDING TO THEIR ZORA COIN EARNED PERFORMANCES.
          </p>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
} 