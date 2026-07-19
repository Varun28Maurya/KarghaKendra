import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { communicationAlerts } from '../utils/dummyData';

export default function Layout({ darkMode, toggleDarkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Page title mapping based on pathname
  const getPageTitle = (path) => {
    const titles = {
      '/': 'Dashboard Overview',
      '/weavers': 'Weaver Registry',
      '/orders': 'Order Management',
      '/production': 'Production Kanban',
      '/inventory': 'Yarn & Raw Material Inventory',
      '/procurement': 'Procurement & Quotes',
      '/buyers': 'Buyer Accounts',
      '/finance': 'Finance & Disbursements',
      '/analytics': 'Cooperative Analytics',
      '/quality': 'Fabric AI Quality Control',
      '/communication': 'Cooperative Announcements',
      '/reports': 'Cooperative Reports',
      '/settings': 'System Settings'
    };
    return titles[path] || 'Kargha Kendra ERP';
  };

  return (
    <div className="min-h-screen bg-[#F8F3EA] dark:bg-[#1F1A17] text-[#3E2A1A] dark:text-[#F5E9D6] transition-colors duration-300 flex">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      <div 
        className="flex-grow flex flex-col min-h-screen transition-all duration-300"
        style={{ paddingLeft: isCollapsed ? '80px' : '256px' }}
      >
        {/* Navbar */}
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          notifications={communicationAlerts}
          title={getPageTitle(location.pathname)}
        />

        {/* Dynamic Sub-page Container with Framer Motion Page Transition */}
        <div className="p-6 flex-grow overflow-x-hidden">
          <header className="mb-6">
            <h1 className="text-3xl font-display font-bold text-[#5C3B1E] dark:text-[#F5E9D6] tracking-wide">
              {getPageTitle(location.pathname)}
            </h1>
            <p className="text-xs text-[#C9B79C] mt-1">Kargha Kendra cooperative management portal.</p>
          </header>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
