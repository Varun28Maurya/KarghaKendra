import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Weavers from './pages/Weavers';
import Orders from './pages/Orders';
import Production from './pages/Production';
import Inventory from './pages/Inventory';
import Procurement from './pages/Procurement';
import Buyers from './pages/Buyers';
import Finance from './pages/Finance';
import Analytics from './pages/Analytics';
import Quality from './pages/Quality';
import Communication from './pages/Communication';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route index element={<Dashboard />} />
          <Route path="weavers" element={<Weavers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="production" element={<Production />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="procurement" element={<Procurement />} />
          <Route path="buyers" element={<Buyers />} />
          <Route path="finance" element={<Finance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="quality" element={<Quality />} />
          <Route path="communication" element={<Communication />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
