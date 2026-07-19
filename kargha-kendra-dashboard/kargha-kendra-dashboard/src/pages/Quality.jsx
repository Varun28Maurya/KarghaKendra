import React, { useState } from 'react';
import { FiCheck, FiX, FiInfo, FiTrendingUp } from 'react-icons/fi';
import { qualityChecks } from '../utils/dummyData';

export default function Quality() {
  const [inspections, setInspections] = useState(qualityChecks);

  const handleDecision = (id, approved) => {
    setInspections(prev => prev.filter(item => item.id !== id));
    alert(approved ? 'Fabric certified. Lot approved for packaging.' : 'Fabric rejected. Sourcing tickets sent back to weaving stage.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header alert info */}
      <div className="premium-card p-5 bg-[#5C3B1E]/5 dark:bg-[#2A221C]/25 border border-[#5C3B1E]/10 dark:border-white/5 flex gap-3.5 items-start">
        <FiInfo size={20} className="text-[#B88A44] mt-0.5 shrink-0" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">Fabric AI Vision Inspector</h4>
          <p className="text-[#C9B79C]">Weavers upload fabric scans using the Kargha Mobile App. The system performs computer-vision thread-density checks and flag tension defect anomalies before warehouse packaging.</p>
        </div>
      </div>

      {/* QC Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inspections.length === 0 ? (
          <div className="premium-card p-8 col-span-2 text-center text-xs text-[#C9B79C] space-y-2">
            <p className="font-bold text-sm">All warp scans are cleared</p>
            <p>No fabrics awaiting AI quality certification review.</p>
          </div>
        ) : (
          inspections.map((item) => (
            <div key={item.id} className="premium-card p-5 space-y-4">
              
              {/* Photo Preview */}
              <div className="relative h-48 rounded-xl overflow-hidden border border-[#5C3B1E]/10 dark:border-white/10 group">
                <img 
                  src={item.image} 
                  alt={item.fabric} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#5C3B1E] text-white px-2 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase">
                  {item.id}
                </span>
              </div>

              {/* Data and confidence */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#3E2A1A] dark:text-[#F5E9D6]">{item.fabric}</h3>
                    <p className="text-[10px] text-[#C9B79C]">Weaved by: {item.weaver}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#C9B79C] block">AI PASS PROBABILITY</span>
                    <span className="text-sm font-bold text-[#4D7C4A]">{item.aiConfidence}%</span>
                  </div>
                </div>

                {/* AI Defect confidence bar */}
                <div className="space-y-1">
                  <div className="w-full bg-[#5C3B1E]/10 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.aiConfidence > 95 ? 'bg-[#4D7C4A]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.aiConfidence}%` }}
                    />
                  </div>
                </div>

                {/* Issues Description */}
                <div className="text-xs bg-[#F8F3EA]/35 dark:bg-[#18130F]/40 p-2.5 rounded-xl border border-[#5C3B1E]/5">
                  <span className="text-[9px] text-[#C9B79C] font-semibold block">SCAN DIAGNOSTICS</span>
                  <p className="mt-0.5 font-medium">{item.defectsFound}</p>
                </div>
              </div>

              {/* Decision Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDecision(item.id, true)}
                  className="flex-grow flex items-center justify-center gap-1 bg-[#4D7C4A] hover:bg-[#3d623b] text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-sm"
                >
                  <FiCheck size={14} /> Approve Fabric
                </button>
                <button
                  onClick={() => handleDecision(item.id, false)}
                  className="flex-grow flex items-center justify-center gap-1 border border-[#A94442]/30 hover:bg-red-50 text-[#A94442] dark:hover:bg-red-950/20 text-xs font-semibold py-2.5 rounded-xl transition-all"
                >
                  <FiX size={14} /> Reject & Redo
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
