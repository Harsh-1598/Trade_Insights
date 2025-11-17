// src/App.jsx
import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Navbar from './components/core/Navbar';
import Overview from './pages/Overview';
import Markets from './pages/Markets';
import PlaceholderPage from './components/common/PlaceholderPage';
import Portfolio from './pages/Portfolio';
import Orders from './pages/Orders';
import Leaderboard from './pages/leaderboard';
import Insights from './pages/insights';
import Settings from './pages/settings';

function App() {
  return (
  
    <div className="bg-gray-900 transition-colors duration-300 min-h-screen">
        
            <Navbar />
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/insights" element={<Insights/>} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
            </Routes>
       
    </div>
  );
}

export default App;