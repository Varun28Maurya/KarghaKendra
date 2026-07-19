import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, PieChart, Pie, Cell, Legend, CartesianGrid 
} from 'recharts';
import { 
  FiUsers, FiShoppingBag, FiDollarSign, FiPackage, 
  FiClock, FiCheckCircle, FiAlertTriangle, FiTruck 
} from 'react-icons/fi';
import { weaversData, ordersData, inventoryData } from '../utils/dummyData';

// Reusable Counter Animation Component
const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;
    
    const duration = 1.2; // seconds
    const incrementTime = Math.abs(Math.floor((duration * 1000) / end));
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // speed up counting
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, Math.max(incrementTime, 20));
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Chart Colors
const COLORS = {
  primary: '#5C3B1E',
  gold: '#B88A44',
  success: '#4D7C4A',
  danger: '#A94442',
  lightGray: '#EAD8B8',
  pie: ['#5C3B1E', '#B88A44', '#4D7C4A', '#EAD8B8']
};

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Populate simple monthly production/revenue charts data
    setChartData([
      { month: 'Jan', production: 280, revenue: 450000 },
      { month: 'Feb', production: 340, revenue: 580000 },
      { month: 'Mar', production: 410, revenue: 690000 },
      { month: 'Apr', production: 390, revenue: 620000 },
      { month: 'May', production: 520, revenue: 850000 },
      { month: 'Jun', production: 610, revenue: 980000 },
      { month: 'Jul', production: 580, revenue: 1245800 },
    ]);
  }, []);

  // Compute stats
  const totalWeavers = weaversData.length;
  const activeWeavers = weaversData.filter(w => w.status === 'Active').length;
  const totalOrders = ordersData.length;
  const pendingOrders = ordersData.filter(o => o.status !== 'Delivered' && o.status !== 'Shipped').length;
  const completedOrders = ordersData.filter(o => o.status === 'Delivered' || o.status === 'Shipped').length;
  const lowStockItems = inventoryData.filter(i => i.status === 'Low Stock').length;
  
  const orderPieData = [
    { name: 'Pending', value: pendingOrders },
    { name: 'Completed', value: completedOrders }
  ];

  // Top Weaver List for dashboard
  const topWeavers = weaversData.slice(0, 3);

  const kpiCards = [
    { title: "Total Weavers", value: totalWeavers, subtitle: `${activeWeavers} Active looms`, icon: FiUsers, color: "text-[#B88A44]", bg: "bg-[#B88A44]/10" },
    { title: "Active Orders", value: totalOrders, subtitle: "FabIndia, Taneira & retail", icon: FiShoppingBag, color: "text-[#5C3B1E] dark:text-[#EAD8B8]", bg: "bg-[#5C3B1E]/10" },
    { title: "Revenue (INR)", value: 1245800, subtitle: "+18.2% vs last month", icon: FiDollarSign, color: "text-[#4D7C4A]", bg: "bg-[#4D7C4A]/10", prefix: "₹" },
    { title: "Inventory items", value: inventoryData.length, subtitle: "Yarns, silk & natural dyes", icon: FiPackage, color: "text-[#B88A44]", bg: "bg-[#B88A44]/10" },
    { title: "Pending Orders", value: pendingOrders, subtitle: "Weaving & warping status", icon: FiClock, color: "text-[#B88A44]", bg: "bg-amber-100/50 dark:bg-amber-900/10" },
    { title: "Completed Orders", value: completedOrders, subtitle: "Delivered & invoiced", icon: FiCheckCircle, color: "text-[#4D7C4A]", bg: "bg-green-100/50 dark:bg-green-900/10" },
    { title: "Low Stock Alert", value: lowStockItems, subtitle: "Mulberry Silk, Gold Zari", icon: FiAlertTriangle, color: "text-[#A94442]", bg: "bg-red-100/50 dark:bg-red-950/10" },
    { title: "Dispatched Deliveries", value: 3, subtitle: "Varanasi & Rajasthan", icon: FiTruck, color: "text-[#5C3B1E] dark:text-[#EAD8B8]", bg: "bg-[#5C3B1E]/10" }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. Large KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="premium-card p-5 flex items-center justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#5C3B1E]/60 dark:text-[#C9B79C]/60 uppercase tracking-wider">{kpi.title}</span>
                <h3 className="text-2xl font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">
                  <AnimatedCounter value={kpi.value} prefix={kpi.prefix} />
                </h3>
                <span className="text-[10px] text-[#C9B79C] block">{kpi.subtitle}</span>
              </div>
              <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                <Icon size={24} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Production */}
        <div className="premium-card p-5 lg:col-span-2 flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Monthly Fabric Production</h3>
            <p className="text-[11px] text-[#C9B79C] mb-4">Total meters produced by weaver cooperatives.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="productionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B88A44" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#B88A44" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <YAxis tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(42, 34, 28, 0.95)', 
                    borderRadius: '12px',
                    border: 'none', 
                    color: '#F5E9D6',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="production" stroke="#B88A44" strokeWidth={2.5} fillOpacity={1} fill="url(#productionGrad)" name="Meters Produced" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie */}
        <div className="premium-card p-5 flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Order Fulfilment Status</h3>
            <p className="text-[11px] text-[#C9B79C] mb-4">Current distribution of cooperative orders.</p>
          </div>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={COLORS.gold} />
                  <Cell fill={COLORS.success} />
                </Pie>
                <Tooltip />
                <Legend formatter={(value) => <span className="text-xs text-[#3E2A1A] dark:text-[#C9B79C] font-semibold">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-[#C9B79C]">
            <span className="font-bold text-[#4D7C4A]">{completedOrders} Deliveries completed</span> out of {totalOrders} total.
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Trend */}
        <div className="premium-card p-5 lg:col-span-2 flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Revenue Stream Trend</h3>
            <p className="text-[11px] text-[#C9B79C] mb-4">Earnings overview (INR) generated from B2B bulk orders.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <YAxis tick={{ fontSize: 11 }} stroke="#C9B79C" />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(42, 34, 28, 0.95)', 
                    borderRadius: '12px',
                    border: 'none', 
                    color: '#F5E9D6',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="revenue" fill="#5C3B1E" radius={[6, 6, 0, 0]} name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Weavers */}
        <div className="premium-card p-5 flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Top Performing Weavers</h3>
            <p className="text-[11px] text-[#C9B79C] mb-4">Weavers with high productivity ratings.</p>
          </div>
          <div className="space-y-4 overflow-y-auto pr-1">
            {topWeavers.map((weaver) => (
              <div key={weaver.id} className="flex items-center justify-between border-b border-[#5C3B1E]/5 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={weaver.avatar} alt={weaver.name} className="w-10 h-10 rounded-full object-cover border border-[#B88A44]/30" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">{weaver.name}</h4>
                    <p className="text-[9px] text-[#C9B79C]">{weaver.skill}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#4D7C4A]">{weaver.productivity}%</span>
                  <p className="text-[8px] text-[#C9B79C]">Efficiency</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-[#5C3B1E]/5 pt-3 text-center">
            <span className="text-xs font-semibold text-[#B88A44] hover:underline cursor-pointer">
              View all weaver logs
            </span>
          </div>
        </div>

      </div>

      {/* 3. Recent Orders & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders Table */}
        <div className="premium-card p-5 lg:col-span-2 overflow-x-auto">
          <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-3">Recent Orders</h3>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#5C3B1E]/10 dark:border-white/10 text-[#C9B79C] font-semibold">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Buyer Name</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
              {ordersData.map((order) => (
                <tr key={order.id} className="hover:bg-[#F8F3EA]/30 dark:hover:bg-[#18130F]/20 transition-all">
                  <td className="py-3 font-semibold text-[#B88A44]">{order.id}</td>
                  <td className="py-3">{order.buyer}</td>
                  <td className="py-3 max-w-[200px] truncate">{order.items}</td>
                  <td className="py-3 font-semibold">₹{order.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      order.status === 'Delivered' || order.status === 'Shipped'
                        ? 'bg-green-100 text-[#4D7C4A] dark:bg-[#4D7C4A]/20 dark:text-green-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live Cooperative Feed */}
        <div className="premium-card p-5">
          <h3 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-3">Live Cooperative Feed</h3>
          <div className="space-y-3">
            <div className="relative pl-6 border-l-2 border-[#B88A44]">
              <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#B88A44]" />
              <span className="text-[10px] text-[#C9B79C]">3 mins ago</span>
              <p className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">Quality inspection passed for ORD-2026-002</p>
            </div>
            <div className="relative pl-6 border-l-2 border-[#5C3B1E]/20 dark:border-white/10">
              <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#5C3B1E]/40" />
              <span className="text-[10px] text-[#C9B79C]">1 hour ago</span>
              <p className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">Weaver wage release approved by Cooperative Bank</p>
            </div>
            <div className="relative pl-6 border-l-2 border-[#5C3B1E]/20 dark:border-white/10">
              <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#5C3B1E]/40" />
              <span className="text-[10px] text-[#C9B79C]">4 hours ago</span>
              <p className="text-xs font-semibold text-[#3E2A1A] dark:text-[#F5E9D6]">Low Stock warning: Mulberry Silk Yarn (Grade A)</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
