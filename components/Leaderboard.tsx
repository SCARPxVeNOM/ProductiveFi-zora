import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface LeaderboardEntry {
  address: string;
  performance: number;
  badges: string[];
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const { address: currentUserAddress } = useAccount();

  // Simulated leaderboard data - In a real app, this would come from your backend
  useEffect(() => {
    const mockData: LeaderboardEntry[] = [
      { address: '0x1234...5678', performance: 156.2, badges: ['🏆', '⭐'] },
      { address: '0x8765...4321', performance: 142.8, badges: ['🎯'] },
      { address: '0x9876...1234', performance: 128.5, badges: ['🌟'] },
      { address: '0x4321...8765', performance: 115.3, badges: ['🎮'] },
      { address: '0x5678...9012', performance: 98.7, badges: ['📚'] },
    ];
    setLeaderboardData(mockData);
  }, []);

  return (
    <div className="space-y-4">
      {leaderboardData.map((entry, index) => (
        <div 
          key={entry.address}
          className={`p-4 rounded-lg ${
            entry.address === currentUserAddress 
              ? 'bg-blue-50 border-2 border-blue-500'
              : 'bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
              <div>
                <p className="font-medium">{entry.address}</p>
                <div className="flex space-x-1">
                  {entry.badges.map((badge, i) => (
                    <span key={i} className="text-lg">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Performance</p>
              <p className={`font-bold ${entry.performance >= 100 ? 'text-green-600' : 'text-red-600'}`}>
                {entry.performance.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 