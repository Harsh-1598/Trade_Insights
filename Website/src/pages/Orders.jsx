import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Orders = () => {
    const location = useLocation();
    const [orders, setOrders] = useState([]);

    // Load orders from localStorage on component mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('tradingOrders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // Handle new trade from modal and save to localStorage
    useEffect(() => {
        if (location.state?.newTrade) {
            const newOrder = location.state.newTrade;
            setOrders(prev => {
                const updatedOrders = [newOrder, ...prev];
                localStorage.setItem('tradingOrders', JSON.stringify(updatedOrders));
                return updatedOrders;
            });
            // Clear the location state to prevent duplicate processing
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Executed': return 'text-green-500 bg-green-500/20';
            case 'Pending': return 'text-yellow-500 bg-yellow-500/20';
            case 'Cancelled': return 'text-red-500 bg-red-500/20';
            default: return 'text-gray-500 bg-gray-500/20';
        }
    };

    const handleCancelOrder = (orderId) => {
        setOrders(prev => {
            const updatedOrders = prev.map(order => 
                order.id === orderId 
                    ? { ...order, status: 'Cancelled' }
                    : order
            );
            localStorage.setItem('tradingOrders', JSON.stringify(updatedOrders));
            return updatedOrders;
        });
    };

    const clearAllOrders = () => {
        setOrders([]);
        localStorage.removeItem('tradingOrders');
    };

    // Check if all orders are cancelled
    const allOrdersCancelled = orders.length > 0 && orders.every(order => order.status === 'Cancelled');

    const getTypeColor = (type) => {
        return type === 'Buy' ? 'text-green-500' : 'text-red-500';
    };

    const formatCurrency = (value) => new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR', 
        minimumFractionDigits: 2 
    }).format(value).replace('INR', '₹');

    return (
        <div className="container mx-auto p-4 sm:p-8 min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-8">Trading Orders</h1>

            {/* Orders Table */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl shadow-gray-950/50">
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Order History ({orders.length})
                        </h2>
                        {orders.length > 0 && !allOrdersCancelled && (
                            <p className="text-sm text-yellow-400 mt-1">
                                ⚠️ Cancel all orders before clearing history
                            </p>
                        )}
                    </div>
                    {orders.length > 0 && (
                        <button
                            onClick={clearAllOrders}
                            disabled={!allOrdersCancelled}
                            className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors duration-200 ${
                                allOrdersCancelled 
                                    ? 'bg-red-600 hover:bg-red-700 cursor-pointer' 
                                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                            }`}
                            title={allOrdersCancelled ? 'Clear all cancelled orders' : 'Cannot clear orders with active status'}
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📊</div>
                        <p className="text-gray-400 text-xl mb-2">No orders yet</p>
                        <p className="text-gray-500 text-sm">Start trading in Markets or Portfolio to see your orders here</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                                <tr className="text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                                    <th className="py-3 px-4">Order ID</th>
                                    <th className="py-3 px-4">Stock</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4 text-right">Quantity</th>
                                    <th className="py-3 px-4 text-right">Price (₹)</th>
                                    <th className="py-3 px-4 text-right">Total Value (₹)</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                                <th className="py-3 px-4">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-700 transition-colors duration-150">
                                        <td className="py-3 px-4 font-mono text-xs text-gray-400">
                                            #{order.id}
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-bold text-white">{order.symbol}</div>
                                            <div className="text-xs text-gray-500">{order.name}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`font-bold ${getTypeColor(order.type)}`}>
                                                {order.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right font-semibold">
                                            {order.quantity}
                                        </td>
                                        <td className="py-3 px-4 text-right text-white font-semibold">
                                            {formatCurrency(order.price)}
                                        </td>
                                        <td className="py-3 px-4 text-right text-white font-bold">
                                            {formatCurrency(order.totalValue)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {order.status === 'Executed' ? (
                                                <button
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                            ) : order.status === 'Cancelled' ? (
                                                <span className="text-gray-500 text-xs">-</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 text-xs">
                                            {order.timestamp}
                                        </td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="py-6 text-center text-gray-500">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">Total Orders</h3>
                    <div className="text-3xl font-bold text-white">{orders.length}</div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">Buy Orders</h3>
                    <div className="text-3xl font-bold text-green-500">
                        {orders.filter(o => o.type === 'Buy').length}
                    </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                    <h3 className="text-sm font-medium text-gray-400 uppercase mb-2">Sell Orders</h3>
                    <div className="text-3xl font-bold text-red-500">
                        {orders.filter(o => o.type === 'Sell').length}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
