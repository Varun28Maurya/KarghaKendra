import React, { useState } from 'react';
import { FiSearch, FiSun, FiMoon, FiBell, FiUser, FiHelpCircle, FiLogOut } from 'react-icons/fi';

export default function Navbar({ darkMode, toggleDarkMode, notifications = [], title = "Kargha Kendra Management" }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 right-0 left-0 bg-white dark:bg-[#2A221C] border-b border-[#5C3B1E]/10 dark:border-white/5 h-16 px-6 flex items-center justify-between z-20 shadow-sm transition-all duration-300">
      
      {/* Search Bar */}
      <div className="relative w-64 md:w-80 group">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#5C3B1E]/40 dark:text-[#C9B79C]/40 group-focus-within:text-[#B88A44] transition-colors">
          <FiSearch size={18} />
        </span>
        <input 
          type="text" 
          placeholder="Search weavers, orders, inventory..." 
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/30 dark:bg-[#18130F]/40 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44] focus:ring-1 focus:ring-[#B88A44] transition-all duration-200"
        />
      </div>

      {/* Action Items */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle (Sun/Moon) */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl border border-[#5C3B1E]/10 dark:border-white/10 text-[#5C3B1E] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] hover:text-[#B88A44] dark:hover:text-[#B88A44] transition-all duration-200"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? <FiSun size={18} className="animate-spin-slow" /> : <FiMoon size={18} />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl border border-[#5C3B1E]/10 dark:border-white/10 text-[#5C3B1E] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] hover:text-[#B88A44] dark:hover:text-[#B88A44] transition-all duration-200 relative"
          >
            <FiBell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#A94442] dark:bg-[#A94442] rounded-full ring-2 ring-white dark:ring-[#2A221C]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#2A221C] rounded-2xl shadow-xl border border-[#5C3B1E]/10 dark:border-white/5 overflow-hidden z-40 py-2">
                <div className="px-4 py-2 border-b border-[#5C3B1E]/10 dark:border-white/5 flex justify-between items-center bg-[#F8F3EA]/35 dark:bg-[#1F1A17]/35">
                  <span className="font-semibold text-sm text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Alerts</span>
                  <span className="text-xs text-[#B88A44] cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-xs text-[#5C3B1E]/60 dark:text-[#C9B79C]/60">
                      No new alerts
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-[#F8F3EA]/40 dark:hover:bg-[#18130F]/40 border-b border-[#5C3B1E]/5 dark:border-white/5 last:border-b-0 cursor-pointer">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            n.type === 'Emergency' 
                              ? 'bg-red-100 text-[#A94442] dark:bg-[#A94442]/20 dark:text-red-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                          }`}>
                            {n.type}
                          </span>
                          <span className="text-[10px] text-[#5C3B1E]/50 dark:text-[#C9B79C]/50">{n.time}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6] mt-1">{n.sender}</p>
                        <p className="text-xs text-[#5C3B1E]/80 dark:text-[#C9B79C]/80 mt-0.5 line-clamp-2">{n.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl border border-[#5C3B1E]/10 dark:border-white/10 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5C3B1E] text-white flex items-center justify-center font-bold text-sm">
              AD
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">Anish Devangan</span>
              <span className="text-[10px] text-[#C9B79C]">Cooperative Admin</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2A221C] rounded-2xl shadow-xl border border-[#5C3B1E]/10 dark:border-white/5 overflow-hidden z-40 py-1">
                <div className="px-4 py-2 border-b border-[#5C3B1E]/5 dark:border-white/5">
                  <p className="text-xs text-[#C9B79C]">User ID: KK-ADM-01</p>
                  <p className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">Varanasi Cluster</p>
                </div>
                <button className="w-full text-left px-4 py-2.5 text-xs text-[#3E2A1A] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] flex items-center gap-2">
                  <FiUser size={14} /> My Profile
                </button>
                <button className="w-full text-left px-4 py-2.5 text-xs text-[#3E2A1A] dark:text-[#F5E9D6] hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] flex items-center gap-2">
                  <FiHelpCircle size={14} /> Government Helpdesk
                </button>
                <button className="w-full text-left px-4 py-2.5 text-xs text-[#A94442] hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 border-t border-[#5C3B1E]/5 dark:border-white/5">
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
