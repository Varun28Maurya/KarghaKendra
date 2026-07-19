import React, { useState } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiPhone, FiShoppingCart, FiX, FiCheck } from 'react-icons/fi';
import { inventoryData } from '../utils/dummyData';

export default function Inventory() {
  const [inventory, setInventory] = useState(inventoryData);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [restockQty, setRestockQty] = useState('');

  const getStockBadge = (status) => {
    if (status === 'Low Stock') {
      return (
        <span className="flex items-center gap-1 text-[10px] bg-red-100 dark:bg-[#A94442]/20 text-[#A94442] dark:text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-200 dark:border-red-900/30">
          <FiAlertTriangle size={10} /> Low Stock
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-[10px] bg-green-100 dark:bg-green-950/20 text-[#4D7C4A] dark:text-green-300 font-bold px-2 py-0.5 rounded-full border border-green-200 dark:border-green-900/30">
        <FiCheckCircle size={10} /> In Stock
      </span>
    );
  };

  const openRestockModal = (item) => {
    setSelectedItem(item);
    setRestockQty('');
    setShowRestockModal(true);
  };

  const handleRestock = (e) => {
    e.preventDefault();
    if (!restockQty || isNaN(restockQty)) return;

    setInventory(prev => prev.map(item => {
      if (item.id === selectedItem.id) {
        // extract quantity unit (e.g. 'kg' or 'spools')
        const currentQtyString = item.quantity;
        const unit = currentQtyString.match(/[a-zA-Z]+/g)?.[0] || 'kg';
        const currentQtyVal = parseFloat(currentQtyString);
        const addQtyVal = parseFloat(restockQty);
        const newQtyVal = currentQtyVal + addQtyVal;
        
        // check threshold
        const thresholdVal = parseFloat(item.threshold);
        const newStatus = newQtyVal >= thresholdVal ? 'In Stock' : 'Low Stock';

        return {
          ...item,
          quantity: `${newQtyVal} ${unit}`,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));

    setShowRestockModal(false);
    alert(`${selectedItem.name} restocked successfully.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div key={item.id} className="premium-card p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-[#C9B79C] uppercase block">{item.category}</span>
                  <h3 className="font-serif text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] leading-tight">
                    {item.name}
                  </h3>
                </div>
                {getStockBadge(item.status)}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 p-3 rounded-xl border border-[#5C3B1E]/5">
                <div>
                  <span className="text-[8px] text-[#C9B79C] block">AVAILABLE</span>
                  <span className="text-xs font-bold text-[#5C3B1E] dark:text-[#F5E9D6]">{item.quantity}</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#C9B79C] block">THRESHOLD</span>
                  <span className="text-xs font-bold text-[#A94442]">{item.threshold}</span>
                </div>
              </div>

              {/* Supplier Info */}
              <div className="text-xs space-y-1.5 pt-2">
                <span className="text-[9px] text-[#C9B79C] block">PREFERRED SUPPLIER</span>
                <p className="font-semibold">{item.supplier}</p>
                <div className="flex items-center gap-1.5 text-[#5C3B1E]/60 dark:text-[#C9B79C]/60 text-[10px]">
                  <FiPhone size={12} /> <span>Supplier Registered (Verified)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-[#5C3B1E]/10 dark:border-white/5 pt-3 mt-2 flex items-center justify-between text-xs">
              <span className="text-[9px] text-[#C9B79C]">Last Count: {item.lastUpdated}</span>
              <button 
                onClick={() => openRestockModal(item)}
                className="flex items-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white font-semibold px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <FiShoppingCart size={12} /> Restock Material
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2A221C] w-full max-w-sm rounded-2xl p-6 shadow-2xl relative border border-[#5C3B1E]/10 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <h3 className="font-bold text-sm text-[#5C3B1E] dark:text-[#EAD8B8]">Restock Yarn / Material</h3>
              <button onClick={() => setShowRestockModal(false)} className="text-[#C9B79C] hover:text-[#A94442]"><FiX size={18} /></button>
            </div>
            <form onSubmit={handleRestock} className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[9px] text-[#C9B79C] uppercase block">Selected Item</span>
                <p className="font-semibold text-sm text-[#3E2A1A] dark:text-[#F5E9D6]">{selectedItem.name}</p>
                <p className="text-[10px] text-[#C9B79C]">Currently: {selectedItem.quantity}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] text-[#C9B79C] font-bold">ADDITIONAL QUANTITY</label>
                <input 
                  type="number" 
                  value={restockQty} 
                  onChange={(e) => setRestockQty(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full p-2.5 rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                  required 
                />
              </div>
              <div className="flex justify-end pt-4 border-t border-[#5C3B1E]/10 dark:border-white/5 gap-2">
                <button type="submit" className="bg-[#4D7C4A] hover:bg-[#3d623b] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1"><FiCheck /> Restock</button>
                <button type="button" onClick={() => setShowRestockModal(false)} className="border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] px-4 py-2 rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supplier Purchase History Table */}
      <div className="premium-card p-5">
        <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-3">Recent Purchase Orders & Procurement Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#5C3B1E]/15 dark:border-white/10 text-[#C9B79C] font-semibold uppercase">
                <th className="pb-3 pl-2">PO ID</th>
                <th className="pb-3">Raw Material Item</th>
                <th className="pb-3">Sourced Supplier</th>
                <th className="pb-3">Total Cost</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Dispatched Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C3B1E]/5 dark:divide-white/5">
              <tr className="hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 transition-all">
                <td className="py-3 pl-2 font-bold text-[#B88A44]">PO-2026-92</td>
                <td className="py-3 font-medium">100 kg Organic Cotton Yarn (100s)</td>
                <td className="py-3">Tamil Nadu Cotton Fed</td>
                <td className="py-3 font-semibold">₹34,000</td>
                <td className="py-3"><span className="text-[10px] bg-green-100 text-[#4D7C4A] dark:bg-green-950/20 px-2.5 py-0.5 rounded-full font-bold">Received</span></td>
                <td className="py-3">2026-07-12</td>
              </tr>
              <tr className="hover:bg-[#F8F3EA]/30 dark:hover:bg-white/5 transition-all">
                <td className="py-3 pl-2 font-bold text-[#B88A44]">PO-2026-93</td>
                <td className="py-3 font-medium">30 spools Golden Zari thread</td>
                <td className="py-3">Surat Zari Emporium</td>
                <td className="py-3 font-semibold">₹45,000</td>
                <td className="py-3"><span className="text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-900/20 px-2.5 py-0.5 rounded-full font-bold">In Transit</span></td>
                <td className="py-3">2026-07-18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
