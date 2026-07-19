import React, { useState } from 'react';
import { FiSearch, FiFileText, FiCalendar, FiClock, FiPlusCircle, FiX, FiCheck } from 'react-icons/fi';
import { ordersData } from '../utils/dummyData';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null); // For invoice preview modal
  
  // Create order modal states
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [formBuyer, setFormBuyer] = useState('');
  const [formItems, setFormItems] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-[#A94442] dark:bg-red-950/20 dark:text-red-300 border border-red-200 dark:border-red-900/30';
      case 'high':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/25 dark:text-amber-300 border border-amber-200 dark:border-amber-900/30';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-300 border border-orange-200 dark:border-orange-900/30';
      default:
        return 'bg-green-100 text-[#4D7C4A] dark:bg-green-950/20 dark:text-green-300 border border-green-200 dark:border-green-900/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-[#4D7C4A] dark:bg-[#4D7C4A]/20 dark:text-green-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'ready for dispatch':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
    }
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!formBuyer || !formItems || !formAmount) return;

    const newOrder = {
      id: `ORD-2026-0${Math.floor(10 + Math.random() * 90)}`,
      buyer: formBuyer,
      date: new Date().toISOString().split('T')[0],
      items: formItems,
      amount: parseInt(formAmount),
      status: 'In Production',
      priority: formPriority,
      timeline: [
        { status: "Ordered", date: new Date().toISOString().split('T')[0], done: true },
        { status: "Material Sourced", date: "--", done: false },
        { status: "Weaving", date: "--", done: false },
        { status: "Quality Check", date: "--", done: false },
        { status: "Shipped", date: "--", done: false }
      ]
    };

    setOrders([newOrder, ...orders]);
    setShowAddOrderModal(false);
    setFormBuyer('');
    setFormItems('');
    setFormAmount('');
    alert(`B2B Order created for ${formBuyer} and allocated to production queue.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Filters */}
      <div className="premium-card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#5C3B1E]/40 dark:text-[#C9B79C]/40">
            <FiSearch size={16} />
          </span>
          <input 
            type="text" 
            placeholder="Search by buyer, order ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none focus:border-[#B88A44]"
          />
        </div>

        <button 
          onClick={() => setShowAddOrderModal(true)}
          className="flex items-center justify-center gap-2 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 w-full md:w-auto"
        >
          <FiPlusCircle size={16} /> Create B2B Order
        </button>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="premium-card p-5 space-y-4 flex flex-col justify-between">
            <div>
              {/* Order ID & Badge Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#C9B79C] block">ORDER ID</span>
                  <span className="font-bold text-[#B88A44]">{order.id}</span>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Info */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#C9B79C] block text-[9px]">BUYER ACCOUNTS</span>
                  <span className="font-semibold">{order.buyer}</span>
                </div>
                <div>
                  <span className="text-[#C9B79C] block text-[9px]">ORDER DATE</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <FiCalendar size={12} className="text-[#B88A44]" /> {order.date}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#C9B79C] block text-[9px]">ORDERED FABRICS</span>
                  <p className="font-medium bg-[#F8F3EA]/55 dark:bg-[#18130F]/30 p-2.5 rounded-xl border border-[#5C3B1E]/5 mt-1 text-[#3E2A1A]/90 dark:text-[#F5E9D6]/90">
                    {order.items}
                  </p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-5">
                <span className="text-[#C9B79C] block text-[9px] mb-3">PRODUCTION PIPELINE PROGRESS</span>
                <div className="flex items-center justify-between relative pl-2 pr-2">
                  {order.timeline.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center relative z-10 flex-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.done 
                          ? 'bg-[#4D7C4A] text-white' 
                          : 'bg-[#5C3B1E]/10 dark:bg-white/10 text-[#C9B79C]'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-[8px] mt-1 text-center font-medium max-w-[50px] truncate block text-[#C9B79C]">
                        {step.status}
                      </span>
                    </div>
                  ))}
                  {/* Line overlay */}
                  <div className="absolute top-[9px] left-[10%] right-[10%] h-[2px] bg-[#5C3B1E]/10 dark:bg-white/10 z-0" />
                </div>
              </div>
            </div>

            {/* Total & Action Footer */}
            <div className="border-t border-[#5C3B1E]/10 dark:border-white/5 pt-4 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#C9B79C] block">TOTAL AMOUNT</span>
                <span className="font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">₹{order.amount.toLocaleString()}</span>
              </div>
              <button 
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1.5 border border-[#5C3B1E] dark:border-[#B88A44] hover:bg-[#5C3B1E] hover:text-white dark:hover:bg-[#B88A44] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all duration-200"
              >
                <FiFileText size={14} /> Invoice Details
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Create Order Modal */}
      {showAddOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-md rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Register New B2B Saree Order</h3>
              <button onClick={() => setShowAddOrderModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">BUYER NAME (RETAILER / GUILD)</label>
                <input 
                  type="text" 
                  value={formBuyer} 
                  onChange={(e) => setFormBuyer(e.target.value)}
                  placeholder="e.g. FabIndia Corporate"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">ORDER DETAILS & SPECIFICATIONS</label>
                <textarea 
                  rows="2"
                  value={formItems} 
                  onChange={(e) => setFormItems(e.target.value)}
                  placeholder="e.g. 50x Silk Sarees, 100x Cotton Dupattas"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">TOTAL AMOUNT (INR)</label>
                  <input 
                    type="number" 
                    value={formAmount} 
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="e.g. 150000"
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-[#C9B79C] font-bold">PRIORITY LABEL</label>
                  <select 
                    value={formPriority} 
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5 gap-2">
                <button type="submit" className="bg-[#4D7C4A] hover:bg-[#3d623b] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"><FiCheck /> Create Order</button>
                <button type="button" onClick={() => setShowAddOrderModal(false)} className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] px-4 py-2 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#5C3B1E]/10 dark:border-white/5 pb-4">
              <div>
                <h3 className="font-bold text-[#5C3B1E] dark:text-[#EAD8B8] text-lg">Kargha Kendra Cooperative</h3>
                <p className="text-[10px] text-[#C9B79C]">GSTIN: 09AAAFK1843K1Z1</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-[#C9B79C] hover:text-[#A94442] p-1 rounded-lg hover:bg-[#F8F3EA]/50 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Invoice Contents */}
            <div className="space-y-4 text-xs">
              <div className="flex justify-between">
                <div>
                  <span className="text-[#C9B79C] block text-[9px]">BILL TO:</span>
                  <span className="font-bold">{selectedOrder.buyer}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#C9B79C] block text-[9px]">INVOICE ID:</span>
                  <span className="font-bold text-[#B88A44]">INV-{selectedOrder.id}</span>
                </div>
              </div>

              <div className="border border-[#5C3B1E]/10 dark:border-white/5 rounded-xl overflow-hidden mt-4">
                <table className="w-full text-left">
                  <thead className="bg-[#F8F3EA]/35 dark:bg-[#18130F]/45">
                    <tr className="border-b border-[#5C3B1E]/10 dark:border-white/5 font-semibold">
                      <th className="p-3">Description</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#5C3B1E]/5 dark:border-white/5">
                      <td className="p-3">{selectedOrder.items}</td>
                      <td className="p-3 text-right">₹{selectedOrder.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="font-bold">
                      <td className="p-3 text-[#C9B79C]">Subtotal</td>
                      <td className="p-3 text-right">₹{selectedOrder.amount.toLocaleString()}</td>
                    </tr>
                    <tr className="font-bold text-[#5C3B1E] dark:text-[#EAD8B8] bg-[#F8F3EA]/20 dark:bg-white/5">
                      <td className="p-3">Total Payable (GST Incl.)</td>
                      <td className="p-3 text-right">₹{selectedOrder.amount.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5">
              <button 
                onClick={() => {
                  alert("Sending PDF invoice copy to client portal...");
                  setSelectedOrder(null);
                }}
                className="bg-[#5C3B1E] hover:bg-[#B88A44] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
              >
                Send Invoice
              </button>
              <button 
                onClick={() => window.print()}
                className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] dark:border-white/15 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
              >
                Print PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
