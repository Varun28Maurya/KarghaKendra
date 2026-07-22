import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiShield, FiDollarSign, FiCheck, FiSend } from 'react-icons/fi';
import { financeData } from '../utils/dummyData';

export default function Finance() {
  const [transactions, setTransactions] = useState(financeData.recentTransactions);
  const kpis = financeData.kpis;

  const handleReleasePayment = (txnId) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txnId) {
        return { ...t, status: 'Cleared' };
      }
      return t;
    }));
    alert(`Weaver wages released successfully via Bank NEFT API.`);
  };

  return (
    <div className="space-y-6">

  
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="premium-card p-5 space-y-2">
          <div className="flex justify-between items-center text-[#C9B79C]">
            <span className="text-xs font-semibold">Total Revenue Sourced</span>
            <FiTrendingUp size={18} className="text-[#4D7C4A]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
            ₹{kpis.revenue.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#4D7C4A] font-semibold">+12% vs last quarter</p>
        </div>

        <div className="premium-card p-5 space-y-2">
          <div className="flex justify-between items-center text-[#C9B79C]">
            <span className="text-xs font-semibold">Raw Material Expenses</span>
            <FiTrendingDown size={18} className="text-[#A94442]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
            ₹{kpis.expenses.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#C9B79C]">Includes Silk/Cotton yarns</p>
        </div>

        <div className="premium-card p-5 space-y-2">
          <div className="flex justify-between items-center text-[#C9B79C]">
            <span className="text-xs font-semibold">Net Profit Margin</span>
            <FiDollarSign size={18} className="text-[#B88A44]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
            ₹{kpis.profit.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#C9B79C]">Managed by cooperative board</p>
        </div>

        <div className="premium-card p-5 space-y-2">
          <div className="flex justify-between items-center text-[#C9B79C]">
            <span className="text-xs font-semibold">Weaver Wages Disbursed</span>
            <FiShield size={18} className="text-[#4D7C4A]" />
          </div>
          <h3 className="text-2xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
            ₹{kpis.weaversPaid.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#4D7C4A] font-semibold">GI cluster minimum rates</p>
        </div>

      </div>

      {/* Ledger Transactions */}
      <div className="premium-card p-5">
        <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-4">Financial Ledger & Disbursement Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#5C3B1E]/15 dark:border-white/10 text-[#C9B79C] font-semibold uppercase">
                <th className="pb-3 pl-2">Transaction ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Details / Purpose</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Clearance Status</th>
                <th className="pb-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 transition-all">
                  <td className="py-4 pl-2 font-bold text-[#B88A44]">{txn.id}</td>
                  <td className="py-4 text-[#C9B79C]">{txn.date}</td>
                  <td className="py-4 font-medium">{txn.description}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      txn.type === 'Income' 
                        ? 'bg-green-50 text-[#4D7C4A] dark:bg-green-950/15 dark:text-green-300' 
                        : 'bg-red-50 text-[#A94442] dark:bg-red-950/15 dark:text-red-300'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      txn.status === 'Cleared' 
                        ? 'bg-green-100 text-[#4D7C4A] dark:bg-green-950/20' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 animate-pulse'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    {txn.status !== 'Cleared' && txn.description.includes('Wage') ? (
                      <button
                        onClick={() => handleReleasePayment(txn.id)}
                        className="flex items-center gap-1 bg-[#4D7C4A] hover:bg-[#3d623b] text-white text-[10px] px-2.5 py-1.5 rounded-lg transition-colors font-bold"
                      >
                        <FiSend size={10} /> Disburse
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#C9B79C] italic">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
