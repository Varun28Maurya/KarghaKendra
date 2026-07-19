import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, LineChart, Line, Legend 
} from 'recharts';
import { analyticsTimelineData } from '../utils/dummyData';

export default function Analytics() {
  const [filter, setFilter] = useState('month'); // 'week' | 'month' | 'year'
  const data = analyticsTimelineData[filter];

  return (
    <div className="space-y-6">
      
      {/* Filters Header */}
      <div className="premium-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Production & Sales Performance</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Statistical analysis showing weaver throughput against corporate demand.</p>
        </div>
        <div className="flex gap-1.5 bg-[#F8F3EA] dark:bg-[#18130F] p-1 rounded-xl border border-[#5C3B1E]/10 dark:border-white/10">
          {['week', 'month', 'year'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                filter === t 
                  ? 'bg-[#5C3B1E] dark:bg-[#B88A44] text-white shadow-sm' 
                  : 'text-[#5C3B1E]/60 dark:text-[#C9B79C]/60 hover:text-[#B88A44]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Fabric Output Output Chart */}
        <div className="premium-card p-5 h-[380px] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] capitalize">{filter}ly Loom Output (Meters)</h3>
            <p className="text-[10px] text-[#C9B79C] mb-4">Total volume of handloom fabrics produced.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="fabricOutputGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B88A44" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#B88A44" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <YAxis tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(42, 34, 28, 0.95)', 
                    borderRadius: '12px',
                    border: 'none', 
                    color: '#F5E9D6',
                    fontSize: '11px'
                  }} 
                />
                <Area type="monotone" dataKey="production" stroke="#B88A44" strokeWidth={2} fillOpacity={1} fill="url(#fabricOutputGrad)" name="Meters Produced" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Corporate Orders Sourced Line Chart */}
        <div className="premium-card p-5 h-[380px] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] capitalize">{filter}ly B2B Sales vs Orders Received</h3>
            <p className="text-[10px] text-[#C9B79C] mb-4">Correlation between incoming purchase orders and total items fulfilled.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.08} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <YAxis tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(42, 34, 28, 0.95)', 
                    borderRadius: '12px',
                    border: 'none', 
                    color: '#F5E9D6',
                    fontSize: '11px'
                  }} 
                />
                <Legend formatter={(value) => <span className="text-[11px] text-[#C9B79C] font-semibold">{value}</span>} />
                <Line type="monotone" dataKey="orders" stroke="#5C3B1E" strokeWidth={2.5} name="Total Orders" activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="sales" stroke="#4D7C4A" strokeWidth={2} name="Total Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
