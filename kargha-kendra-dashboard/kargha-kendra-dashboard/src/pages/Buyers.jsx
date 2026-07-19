import React, { useState } from 'react';
import { FiStar, FiMail, FiPhone } from 'react-icons/fi';
import { buyersData } from '../utils/dummyData';

export default function Buyers() {
  const [buyers, setBuyers] = useState(buyersData);

  const handleSendEmail = (buyer) => {
    // Standard mailto link
    const email = `${buyer.contact.toLowerCase().replace(/\s+/g, '')}@${buyer.name.toLowerCase().split(' ')[0]}.com`;
    const subject = encodeURIComponent("Kargha Kendra Handloom Cooperative - Order Status Update");
    const body = encodeURIComponent(`Dear ${buyer.contact},\n\nHope you are doing well.\n\nWe wanted to share an update regarding your cooperative orders. The weaving process is progressing smoothly.\n\nBest regards,\nCooperative Admin\nKargha Kendra`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCallOfficer = (buyer) => {
    // Standard tel link
    window.location.href = `tel:+919876543210`;
  };

  return (
    <div className="premium-card p-6 space-y-6">
      
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">B2B Retail Buyers Directory</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Manage details, order frequencies, and payment statuses for corporate clients.</p>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buyers.map((buyer) => (
          <div key={buyer.id} className="p-5 border border-[#5C3B1E]/10 dark:border-white/10 rounded-2xl bg-[#F8F3EA]/10 dark:bg-[#18130F]/10 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            
            {/* Header detail */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] text-[#C9B79C] block">{buyer.id}</span>
                <h3 className="text-base font-serif font-bold text-[#5C3B1E] dark:text-[#EAD8B8] leading-tight">
                  {buyer.name}
                </h3>
                <p className="text-xs text-[#C9B79C] mt-1">Contact Rep: {buyer.contact}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-xs px-2.5 py-1 rounded-lg font-bold">
                <FiStar size={12} fill="currentColor" className="text-amber-500" /> {buyer.rating}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 bg-white dark:bg-[#2A221C] p-3.5 rounded-xl border border-[#5C3B1E]/5">
              <div>
                <span className="text-[8px] text-[#C9B79C] block uppercase font-semibold">Orders Placed</span>
                <span className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">{buyer.ordersCount} Purchases</span>
              </div>
              <div>
                <span className="text-[8px] text-[#C9B79C] block uppercase font-semibold">Total Revenue Sourced</span>
                <span className="text-sm font-bold text-[#4D7C4A]">₹{buyer.totalSpent.toLocaleString()}</span>
              </div>
            </div>

            {/* Communication info */}
            <div className="flex gap-4 text-xs pt-2">
              <button 
                onClick={() => handleSendEmail(buyer)}
                className="flex items-center gap-1.5 text-[#5C3B1E] dark:text-[#C9B79C] hover:text-[#B88A44] font-semibold"
              >
                <FiMail size={14} /> Send Email
              </button>
              <button 
                onClick={() => handleCallOfficer(buyer)}
                className="flex items-center gap-1.5 text-[#5C3B1E] dark:text-[#C9B79C] hover:text-[#B88A44] font-semibold"
              >
                <FiPhone size={14} /> Call Officer
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
