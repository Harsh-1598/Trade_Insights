import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TradingModal = ({ stock, onClose }) => {
    const [action, setAction] = useState('Buy');
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    if (!stock) return null;

    const handleTrade = (e) => {
        e.preventDefault();
        
        // --- Simulation: Process Trade ---
        const tradeDetails = {
            id: Date.now(),
            symbol: stock.symbol,
            name: stock.name,
            type: action,
            quantity: quantity || 1,
            price: parseFloat(stock.price.toFixed(2)),
            totalValue: parseFloat(((quantity || 1) * stock.price).toFixed(2)),
            timestamp: new Date().toLocaleString(),
            status: 'Executed',
        };

        // --- Redirect to Orders Page ---
        onClose(); // Close the modal first
        navigate('/orders', { state: { newTrade: tradeDetails } });
    };

    const isBuy = action === 'Buy';
    const totalValue = ((quantity || 1) * stock.price).toFixed(2);
    const buttonColor = isBuy ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
                
                {/* Modal Header */}
                <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Execute Trade: {stock.symbol}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>

                {/* Trade Form */}
                <form onSubmit={handleTrade} className="p-5 space-y-4">
                    
                    {/* Stock Info */}
                    <div className="flex justify-between text-gray-300 border-b border-gray-700 pb-3">
                        <span className="font-semibold">{stock.name}</span>
                        <span className="text-lg font-extrabold text-white">₹{stock.price.toFixed(2)}</span>
                    </div>

                    {/* Buy/Sell Tabs */}
                    <div className="flex rounded-lg overflow-hidden bg-gray-700 p-1">
                        <button 
                            type="button"
                            onClick={() => setAction('Buy')}
                            className={`flex-1 py-2 text-center font-bold rounded-lg transition-colors ${isBuy ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        >
                            BUY
                        </button>
                        <button 
                            type="button"
                            onClick={() => setAction('Sell')}
                            className={`flex-1 py-2 text-center font-bold rounded-lg transition-colors ${!isBuy ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        >
                            SELL
                        </button>
                    </div>

                    {/* Quantity Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || (parseInt(value) > 0)) {
                                    setQuantity(value === '' ? '' : parseInt(value));
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value === '' || parseInt(e.target.value) < 1) {
                                    setQuantity(1);
                                }
                            }}
                            min="1"
                            required
                            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500"
                        />
                    </div>

                    {/* Summary */}
                    <div className="pt-3 border-t border-gray-700">
                        <div className="flex justify-between text-lg text-white font-bold">
                            <span>Total Value:</span>
                            <span>₹{totalValue}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button type="submit" className={`w-full py-3 rounded-lg text-white font-bold text-lg transition-colors ${buttonColor}`}>
                        {action} {stock.symbol}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TradingModal;
