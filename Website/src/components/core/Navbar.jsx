// src/components/core/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// DarkModeToggle import REMOVED

const NAV_LINKS = [
    { to: '/', label: 'Overview' },
    { to: '/markets', label: 'Markets' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/orders', label: 'Orders' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/insights', label: 'Insights' },
    { to: '/settings', label: 'Settings' },
];

const Navbar = () => {
    const location = useLocation();
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        // PERMANENT DARK THEME CLASSES: bg-gray-900, shadow-xl, text-white
        <nav className="sticky top-0 z-50 bg-gray-900 shadow-xl p-4 sm:px-8 border-b border-gray-800">
            <div className="flex justify-between items-center flex-wrap gap-4">
                {/* Logo and Nav Links */}
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-bold text-white">📈AIQuant</h1>
                    <div className="hidden md:flex space-x-1">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`
                                    px-3 py-2 rounded-lg text-md  font-medium transition-colors duration-200
                                    ${location.pathname === link.to 
                                        ? 'bg-indigo-600 text-white shadow-md' 
                                        : 'text-gray-300 hover:bg-gray-700'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
              
               
                <div className="flex items-center space-x-4 text-blue-400">
                    <span className="text-lg font-mono hidden sm:inline">
                        🕒 {currentTime}
                    </span>
                   
                </div>
            </div>
        </nav>
    );
};

export default Navbar;