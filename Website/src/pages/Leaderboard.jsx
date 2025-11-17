import React, { useState, useMemo } from 'react';


const ALL_LEADERBOARD_DATA = {
    '1D': [
        { rank: 1, user: 'DayBreaker', return: 5.12, winRate: 70, trades: 15, pnl: 15000 },
        { rank: 2, user: 'AlphaTrader', return: 4.50, winRate: 88, trades: 10, pnl: 12000 },
        { rank: 3, user: 'RiskRunner', return: 3.90, winRate: 55, trades: 20, pnl: 9500 },
        { rank: 4, user: 'SmartBear', return: 2.11, winRate: 75, trades: 12, pnl: 5000 },
    ],
    '1W': [
        { rank: 1, user: 'AlphaTrader', return: 12.34, winRate: 85, trades: 50, pnl: 80000 },
        { rank: 2, user: 'BraveBull', return: 9.91, winRate: 78, trades: 45, pnl: 55000 },
        { rank: 3, user: 'DayBreaker', return: 8.55, winRate: 65, trades: 60, pnl: 40000 },
    ],
    '1M': [
        { rank: 1, user: 'AlphaTrader', return: 25.34, winRate: 85, trades: 125, pnl: 150000 },
        { rank: 2, user: 'BraveBull', return: 18.91, winRate: 78, trades: 92, pnl: 120000 },
        { rank: 3, user: 'CryptoKid', return: 15.55, winRate: 65, trades: 210, pnl: 95000 },
    ],
    '3M': [
        { rank: 1, user: 'AlphaTrader', return: 35.34, winRate: 85, trades: 250, pnl: 250000 },
        { rank: 2, user: 'BraveBull', return: 28.91, winRate: 78, trades: 180, pnl: 200000 },
        { rank: 3, user: 'CryptoKid', return: 22.55, winRate: 65, trades: 350, pnl: 150000 },
        { rank: 4, user: 'SmartBear', return: 19.11, winRate: 72, trades: 280, pnl: 120000 },
    ],
    '1Y': [
        { rank: 1, user: 'AlphaTrader', return: 55.34, winRate: 85, trades: 400, pnl: 450000 },
        { rank: 2, user: 'BraveBull', return: 48.91, winRate: 78, trades: 350, pnl: 380000 },
        { rank: 3, user: 'CryptoKid', return: 39.55, winRate: 65, trades: 600, pnl: 290000 },
    ],
    'All': [
        { rank: 1, user: 'GigaChad', return: 120.70, winRate: 60, trades: 1500, pnl: 1500000 },
        { rank: 2, user: 'AlphaTrader', return: 105.34, winRate: 85, trades: 1000, pnl: 1200000 },
        { rank: 3, user: 'SmartBear', return: 98.11, winRate: 72, trades: 1200, pnl: 900000 },
    ],
};

const Leaderboard = () => {
    const [activeFilter, setActiveFilter] = useState('1M');

    const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 0 }).format(value);

    // Function to retrieve data based on the active filter
    const getFilteredData = (filter) => {
        return ALL_LEADERBOARD_DATA[filter] || ALL_LEADERBOARD_DATA['1M'];
    };

    // Use useMemo to filter data only when the activeFilter changes
    const currentLeaderboardData = useMemo(() => getFilteredData(activeFilter), [activeFilter]);
    
    // NEW: Get the top trader data
    const topPerformer = currentLeaderboardData[0] || {};

    // Dynamic styles for the rank indicator
    const getRankStyle = (rank) => {
        if (rank === 1) return 'bg-yellow-500 text-gray-900 font-extrabold shadow-lg';
        if (rank === 2) return 'bg-gray-400 text-gray-900 font-bold';
        if (rank === 3) return 'bg-amber-700 text-white font-bold';
        return 'bg-gray-700 text-gray-400';
    };

    return (
        <div className="container mx-auto p-4 sm:p-8 min-h-screen">
            
            {/* --- Header and Filters --- */}
            <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Global Leaderboard</h1>
                    <p className="text-gray-400">Top ranked traders by selected metric and time period.</p>
                </div>
                <div className="flex gap-2 p-1 bg-gray-800 rounded-lg border border-gray-700">
                    {['1D', '1W', '1M', '3M', '1Y', 'All'].map(filter => (
                        <button 
                            key={filter}
                            // This onClick handler is already correctly wired up to change the state
                            onClick={() => setActiveFilter(filter)} 
                            className={`time-filter px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 
                                ${activeFilter === filter 
                                    ? 'bg-indigo-600 text-white shadow-md' 
                                    : 'bg-transparent text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Summary Stats --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 flex flex-col justify-between">
                    {/* UPDATED: Top Performer Card */}
                    <div className="flex items-center gap-4">
                        <div className="text-3xl">🥇</div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 uppercase mb-1">Top Trader ({activeFilter})</h3>
                            <h2 className="text-3xl font-bold text-white">{topPerformer.user || 'N/A'}</h2>
                        </div>
                    </div>
                    {/* NEW: Display Return explicitly below the name */}
                    <div className="mt-3">
                         <span className="text-xl font-bold text-green-500">
                            {topPerformer.return ? topPerformer.return.toFixed(2) : '0.00'}% Return
                        </span>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 flex items-center gap-4">
                    <div className="text-3xl">🎯</div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase mb-1">Average Win Rate</h3>
                        <h2 className="text-3xl font-bold text-white">65.2%</h2>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 flex items-center gap-4">
                    <div className="text-3xl">👥</div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 uppercase mb-1">Total Ranked Traders</h3>
                        <h2 className="text-3xl font-bold text-white">1,245</h2>
                    </div>
                </div>
            </div>

            {/* --- Rankings Table --- */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50">
                <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-3">Top Traders by Return ({activeFilter})</h2>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead>
                            <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                <th className="py-3 px-4">Rank</th>
                                <th className="py-3 px-4">Trader</th>
                                <th className="py-3 px-4 text-right">Total Return</th>
                                <th className="py-3 px-4 text-right">Win Rate</th>
                                <th className="py-3 px-4 text-right">Trades</th>
                                <th className="py-3 px-4 text-right">Total P&L (₹)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                            {/* Updated to use currentLeaderboardData */}
                            {currentLeaderboardData.map((trader) => (
                                <tr key={trader.user} className="hover:bg-gray-700 transition-colors duration-150">
                                    <td className="py-3 px-4">
                                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${getRankStyle(trader.rank)}`}>
                                            {trader.rank}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 font-bold text-white">{trader.user}</td>
                                    <td className="py-3 px-4 text-right font-bold text-green-500">
                                        {trader.return.toFixed(2)}%
                                    </td>
                                    <td className="py-3 px-4 text-right">{trader.winRate}%</td>
                                    <td className="py-3 px-4 text-right text-gray-400">{trader.trades}</td>
                                    <td className="py-3 px-4 text-right text-white">
                                        ₹{formatCurrency(trader.pnl)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
