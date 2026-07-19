import React, { useState } from 'react';
import { FiSave, FiSettings, FiGlobe, FiDatabase, FiLock, FiBriefcase } from 'react-icons/fi';

export default function Settings() {
  const [coopName, setCoopName] = useState('Varanasi Handloom Weavers Cooperative Guild');
  const [gstin, setGstin] = useState('09AAAFK1843K1Z1');
  const [bankAcc, setBankAcc] = useState('50200039294204');
  const [bankName, setBankName] = useState('Cooperative Bank of India, Varanasi Branch');
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    alert('Cooperative Settings updated successfully.');
  };

  const triggerBackup = () => {
    alert('Full database backup (.json schema) prepared and sent to Ministry of Textiles cloud vault.');
  };

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core Cooperative Details */}
        <div className="premium-card p-5 space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
            <FiBriefcase className="text-[#B88A44]" />
            <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Cooperative Institutional Profile</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="col-span-2 space-y-1">
              <label className="text-[9px] text-[#C9B79C] font-bold">COOPERATIVE NAME</label>
              <input 
                type="text" 
                value={coopName} 
                onChange={(e) => setCoopName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[9px] text-[#C9B79C] font-bold">GSTIN (TAX REVENUE)</label>
              <input 
                type="text" 
                value={gstin} 
                onChange={(e) => setGstin(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#C9B79C] font-bold">COOPERATIVE REGISTRATION NO.</label>
              <input 
                type="text" 
                value="VNS/HW/2026/089" 
                disabled
                className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/10 dark:border-white/5 bg-[#5C3B1E]/5 dark:bg-[#18130F]/20 text-[#C9B79C] focus:outline-none"
              />
            </div>

            <div className="col-span-2 border-t border-[#5C3B1E]/10 dark:border-white/5 pt-4 my-2 flex items-center gap-2">
              <span className="font-bold text-[#B88A44] text-[10px]">BANK SETTINGS (WEAVER WAGE DISBURSEMENT)</span>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#C9B79C] font-bold">CLEARANCE BANK NAME</label>
              <input 
                type="text" 
                value={bankName} 
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-[#C9B79C] font-bold">BANK ACCOUNT NUMBER</label>
              <input 
                type="text" 
                value={bankAcc} 
                onChange={(e) => setBankAcc(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5">
            <button 
              type="submit" 
              className="flex items-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all"
            >
              <FiSave size={14} /> Save Cooperative Details
            </button>
          </div>
        </div>

        {/* Side Panel: App Settings & Security */}
        <div className="space-y-6">
          
          {/* Preferences */}
          <div className="premium-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <FiGlobe className="text-[#B88A44]" />
              <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">App Preferences</h3>
            </div>
            
            <div className="text-xs space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">COOPERATIVE PORTAL LANGUAGE</label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold block">Push SMS Alerts</span>
                  <span className="text-[9px] text-[#C9B79C]">Send broadcast SMS to weaver mobile apps</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)}
                  className="w-4 h-4 accent-[#B88A44]"
                />
              </div>
            </div>
          </div>

          {/* Backup and Cloud */}
          <div className="premium-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <FiDatabase className="text-[#B88A44]" />
              <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Backup & Ministry Sync</h3>
            </div>
            <div className="text-xs space-y-3">
              <p className="text-[#C9B79C] leading-normal">Manually trigger state backups or synchronize loom census information directly to Handlooms Ministry databases.</p>
              <button 
                type="button" 
                onClick={triggerBackup}
                className="w-full flex items-center justify-center gap-1.5 border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] dark:border-white/15 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] font-semibold py-2.5 rounded-xl transition-all"
              >
                <FiDatabase size={14} /> Synchronize Ministry Data
              </button>
            </div>
          </div>

        </div>

      </form>

    </div>
  );
}
