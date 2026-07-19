import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiGrid, FiUsers, FiShoppingBag, FiLayers, FiPackage, 
  FiTruck, FiBriefcase,  FiBarChart2, 
  FiCheckSquare, FiMessageSquare, FiBookOpen, FiDownload, 
  FiSliders, FiSettings, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';
import { FaRupeeSign } from "react-icons/fa";

const menuItems = [
  { name: 'Dashboard', path: '/', icon: FiGrid },
  { name: 'Weavers', path: '/weavers', icon: FiUsers },
  { name: 'Orders', path: '/orders', icon: FiShoppingBag },
  { name: 'Production', path: '/production', icon: FiLayers },
  { name: 'Inventory', path: '/inventory', icon: FiPackage },
  { name: 'Procurement', path: '/procurement', icon: FiTruck },
  { name: 'Buyers', path: '/buyers', icon: FiBriefcase },
  { name: 'Finance', path: '/finance', icon: FaRupeeSign },
  { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
  { name: 'Quality Control', path: '/quality', icon: FiCheckSquare },
  { name: 'Communication', path: '/communication', icon: FiMessageSquare },
  { name: 'Reports', path: '/reports', icon: FiDownload },
  { name: 'Settings', path: '/settings', icon: FiSettings },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-[#5C3B1E] dark:bg-[#18130F] text-[#F8F3EA] dark:text-[#F5E9D6] transition-all duration-300 z-30 shadow-xl flex flex-col justify-between border-r border-[#3E2A1A] ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Logo and Brand */}
        <div className="p-4 border-b border-[#3E2A1A] flex items-center gap-3 relative">
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white rounded-xl overflow-hidden border border-[#B88A44]/20 shadow-sm">
            {/* Actual Uploaded Logo */}
            <img src="/logo.jpg" alt="Kargha Kendra Logo" className="w-full h-full object-cover scale-105" />
          </div>
          
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden transition-all duration-200">
              <span className="font-display font-bold text-lg tracking-wider text-[#EAD8B8]">KARGHA KENDRA</span>
              <span className="text-[10px] text-[#C9B79C] italic whitespace-nowrap">From Tradition to Progress</span>
            </div>
          )}

          {/* Toggle button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute top-1/2 -right-3 -translate-y-1/2 bg-[#B88A44] hover:bg-[#a37637] text-white p-1 rounded-full shadow-md z-40 transition-colors"
          >
            {isCollapsed ? <FiChevronRight size={14} /> : <FiChevronLeft size={14} />}
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                    isActive 
                      ? 'bg-[#B88A44] text-[#F8F3EA] font-semibold' 
                      : 'hover:bg-[#3E2A1A] hover:text-[#B88A44]'
                  }`
                }
              >
                <Icon size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                {isCollapsed && (
                  <span className="absolute left-16 hidden group-hover:block bg-[#3E2A1A] text-[#F5E9D6] text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-50">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Cooperative Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-[#3E2A1A] text-[11px] text-[#C9B79C]/80 bg-[#3E2A1A]/20">
          <p className="font-semibold text-[#EAD8B8]">Varanasi Weavers Co.</p>
          <p>Registration: VNS/HW/2026/089</p>
        </div>
      )}
    </aside>
  );
}
