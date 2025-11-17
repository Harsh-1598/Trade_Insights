import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const PERFORMANCE_DATA = {
    'Weekly': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        profits: [8, 5, 12, 7, 9],
        losses: [3, 6, 4, 5, 2]
    },
    'Monthly': {
        labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
        profits: [35, 42, 28, 55],
        losses: [15, 20, 10, 25]
    },
    'Daily': {
        labels: ['9:30', '11:00', '1:00', '3:00'],
        profits: [4, 3, 2, 1],
        losses: [1, 2, 1, 0]
    }
};

const Insights = () => {
    const [timeFilter, setTimeFilter] = useState('Weekly');
    const chartData = PERFORMANCE_DATA[timeFilter];

    // Chart options dynamically set for permanent dark theme
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    color: '#9ca3af', // gray-400
                }
            },
            tooltip: {
                backgroundColor: '#1f2937', // Dark background for tooltip
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#374151',
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9ca3af', // gray-400
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: '#374151' // gray-700 for grid lines
                },
                ticks: {
                    color: '#9ca3af',
                    callback: (value) => `₹${value}k`
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Profits (k)',
                data: chartData.profits,
                backgroundColor: '#3b82f6', // blue-500
                borderRadius: 4,
            },
            {
                label: 'Losses (k)',
                data: chartData.losses,
                backgroundColor: '#ef4444', // red-500
                borderRadius: 4,
            }
        ]
    };

    return (
        <div className="container mx-auto p-4 sm:p-8 min-h-screen">
            
            {/* --- Header and Filters --- */}
            <div className="flex justify-between items-start flex-wrap gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">⚡ Performance Analysis</h1>
                    <p className="text-gray-400">ML Model Insights for your trading activity.</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Time Filter Dropdown */}
                    <select
                        className="bg-gray-800 text-white border border-gray-700 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-md"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Daily">Daily</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    {/* Date Range Input (Placeholder) */}
                    <div className="relative">
                        <input 
                            type="text" 
                            defaultValue="Oct 16, 2025 - Oct 23, 2025" 
                            readOnly 
                            className="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg p-2 cursor-pointer shadow-md"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                {/* --- Performance Card (2/3 width) --- */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50 min-h-[400px] flex flex-col">
                    <h2 className="text-xl font-semibold text-white mb-4">P&L Comparison ({timeFilter})</h2>
                    <div className="flex-1 h-full min-h-[300px]">
                        <Bar data={data} options={chartOptions} />
                    </div>
                </div>

                {/* --- Trading Statistics Card (1/3 width) --- */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50">
                    <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-700 pb-3">📊 Trading Statistics</h2>
                    <div className="space-y-4">
                        
                        {/* Stat Item 1 */}
                        <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">💎</div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-300">Most Profitable Segment</h3>
                                    <p className="text-white font-semibold">Bank Nifty Options</p>
                                </div>
                            </div>
                            <div className="text-green-500 font-bold">+₹45,000</div>
                        </div>

                        {/* Stat Item 2 */}
                        <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">⏰</div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-300">Best Trading Session</h3>
                                    <p className="text-white font-semibold">Morning (9:15-11:30)</p>
                                </div>
                            </div>
                            <div className="text-white font-semibold">72% Win Rate</div>
                        </div>

                        {/* Stat Item 3 */}
                        <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="text-2xl">🎯</div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-300">Top Strategy</h3>
                                    <p className="text-white font-semibold">Gap Trading</p>
                                </div>
                            </div>
                            <div className="text-white font-semibold">85% Success</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Trading Insights Cards --- */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">✨ ML Trading Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Insight Card 1 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50 border-l-4 border-indigo-500">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className="text-xl">🚀</div>
                                <h3 className="text-lg font-semibold text-white">Bank Nifty Pattern</h3>
                            </div>
                            <div className="text-green-500 font-bold">📈</div>
                        </div>
                        <p className="text-gray-400 mb-3">Model predicts 80% success rate trading Bank Nifty in the first hour.</p>
                        <div className="text-xl font-bold text-indigo-400 mb-3 border-t border-b border-gray-700 py-2">+₹25,000 Average Profit</div>
                        <p className="text-sm text-green-500 font-medium">Recommendation: Focus on Bank Nifty opening range breakout strategy.</p>
                    </div>

                    {/* Insight Card 2 */}
                    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50 border-l-4 border-green-500">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <div className="text-xl">💰</div>
                                <h3 className="text-lg font-semibold text-white">Options Trading Bias</h3>
                            </div>
                            <div className="text-green-500 font-bold">📈</div>
                        </div>
                        <p className="text-gray-400 mb-3">Put options trades are showing statistically higher profitability this month.</p>
                        <div className="text-xl font-bold text-green-400 mb-3 border-t border-b border-gray-700 py-2">+35% Higher Returns</div>
                        <p className="text-sm text-green-500 font-medium">Recommendation: Consider increasing put options allocation in choppy markets.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insights;
