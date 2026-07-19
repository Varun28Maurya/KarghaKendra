import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiPlus, FiStar, FiChevronRight } from 'react-icons/fi';
import { procurementQuotes } from '../utils/dummyData';

export default function Procurement() {
  const [quotes, setQuotes] = useState(procurementQuotes);
  const [showNewQuoteForm, setShowNewQuoteForm] = useState(false);
  const [itemName, setItemName] = useState('');
  const [targetQty, setTargetQty] = useState('');

  const handleApproveQuote = (quoteId, selectedSupplier) => {
    setQuotes(prev => prev.map(q => {
      if (q.id === quoteId) {
        return {
          ...q,
          status: 'Approved & PO Released',
          bids: q.bids.map(b => ({
            ...b,
            selected: b.supplier === selectedSupplier
          }))
        };
      }
      return q;
    }));
    alert(`Purchase order approved and drafted for ${selectedSupplier}`);
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!itemName || !targetQty) return;
    
    const newQuote = {
      id: `REQ-0${quotes.length + 42}`,
      item: `${targetQty} of ${itemName}`,
      bids: [
        { supplier: "Karnataka Silk Board Co.", price: 4200, rating: 4.8, selected: false },
        { supplier: "Coimbatore Cotton Mills", price: 290, rating: 4.6, selected: false },
        { supplier: "Surat Zari Emporium", price: 680, rating: 4.5, selected: false }
      ],
      status: "Awaiting Cooperative Approval",
      date: new Date().toISOString().split('T')[0]
    };
    
    setQuotes([newQuote, ...quotes]);
    setItemName('');
    setTargetQty('');
    setShowNewQuoteForm(false);
    alert("Procurement Request Broadcasted to all registered suppliers.");
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="premium-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Supplier Procurement Bids</h2>
          <p className="text-xs text-[#C9B79C] mt-0.5">Compare supplier quotes, approve orders, and generate purchase requests.</p>
        </div>
        <button 
          onClick={() => setShowNewQuoteForm(!showNewQuoteForm)}
          className="flex items-center gap-1.5 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#B88A44] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200"
        >
          <FiPlus size={16} /> Request Supplier Quote
        </button>
      </div>

      {/* New Quote Form Drawer/Modal */}
      {showNewQuoteForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-5 border-2 border-dashed border-[#B88A44]/40"
        >
          <h3 className="text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mb-3">Create New Procurement Tender</h3>
          <form onSubmit={handleCreateRequest} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-[10px] text-[#C9B79C] font-bold">RAW MATERIAL ITEM</label>
              <input 
                type="text" 
                placeholder="e.g. Mulberry Silk Yarn 80s" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-[#C9B79C] font-bold">QUANTITY NEEDED</label>
              <input 
                type="text" 
                placeholder="e.g. 200 kg" 
                value={targetQty} 
                onChange={(e) => setTargetQty(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-[#5C3B1E]/15 dark:border-white/10 bg-[#F8F3EA]/35 dark:bg-[#18130F]/45 text-[#3E2A1A] dark:text-[#F5E9D6] focus:outline-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <button 
                type="submit" 
                className="flex-grow bg-[#4D7C4A] hover:bg-[#40683e] text-white text-xs font-semibold py-2.5 rounded-xl transition-all"
              >
                Send Request
              </button>
              <button 
                type="button" 
                onClick={() => setShowNewQuoteForm(false)}
                className="px-3 border border-[#5C3B1E]/20 text-[#5C3B1E] dark:text-[#F5E9D6] dark:border-white/15 hover:bg-[#F8F3EA] dark:hover:bg-[#18130F] text-xs font-semibold py-2.5 rounded-xl transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Quote Comparison Cards */}
      <div className="space-y-6">
        {quotes.map((quote) => (
          <div key={quote.id} className="premium-card p-5 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#5C3B1E]/10 dark:border-white/5 pb-3">
              <div>
                <span className="text-[10px] text-[#C9B79C]">PROCUREMENT ID: <span className="font-bold text-[#B88A44]">{quote.id}</span></span>
                <h3 className="font-serif text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6] mt-0.5">{quote.item}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold mt-2 sm:mt-0 ${
                quote.status.includes('Approved') 
                  ? 'bg-green-100 text-[#4D7C4A] dark:bg-green-950/20 dark:text-green-300' 
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 animate-pulse'
              }`}>
                {quote.status}
              </span>
            </div>

            {/* Bids List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quote.bids.map((bid, idx) => (
                <div 
                  key={`${quote.id}-bid-${idx}`} 
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 relative ${
                    bid.selected 
                      ? 'border-[#4D7C4A] bg-[#4D7C4A]/5' 
                      : 'border-[#5C3B1E]/10 dark:border-white/10 bg-[#F8F3EA]/10 dark:bg-[#18130F]/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-xs text-[#3E2A1A] dark:text-[#F5E9D6] line-clamp-2 pr-2">
                        {bid.supplier}
                      </h4>
                      <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold shrink-0">
                        <FiStar size={12} fill="currentColor" /> {bid.rating}
                      </div>
                    </div>
                    <p className="text-lg font-bold text-[#5C3B1E] dark:text-[#EAD8B8]">
                      ₹{bid.price} <span className="text-[10px] text-[#C9B79C] font-normal">/ kg</span>
                    </p>
                  </div>

                  {quote.status !== 'Approved & PO Released' ? (
                    <button
                      onClick={() => handleApproveQuote(quote.id, bid.supplier)}
                      className="w-full flex items-center justify-center gap-1 bg-[#5C3B1E] dark:bg-[#B88A44] hover:bg-[#4D7C4A] text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200"
                    >
                      <FiCheck size={14} /> Accept Quote
                    </button>
                  ) : (
                    <div className="text-center py-1 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                      {bid.selected ? (
                        <span className="text-[#4D7C4A] bg-[#4D7C4A]/10 px-2 py-1 rounded flex items-center gap-1 w-full justify-center">
                          <FiCheck size={14} /> Approved Bid
                        </span>
                      ) : (
                        <span className="text-[#C9B79C] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex items-center gap-1 w-full justify-center opacity-50">
                          <FiX size={14} /> Declined
                        </span>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
