








import React from 'react';
import { motion } from 'framer-motion';
import { AwardIcon, PlusIcon } from 'lucide-react';
import { schemes } from '../../data/govData';

export function SchemePerformance() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AwardIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          <h2 className="font-amita text-2xl" style={{ color: 'var(--text)' }}>
            Scheme Performance
          </h2>
        </div>
        <button
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-colors"
          style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--bg)' }}>
          
          <PlusIcon className="h-3.5 w-3.5" /> New scheme
        </button>
      </div>

      <ul className="space-y-4">
        {schemes.map((s) =>
        <li key={s.id}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                {s.name}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                {s.disbursed}
              </p>
            </div>
            <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: 'var(--primary)' }} />
            
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {s.beneficiaries} beneficiaries
              </p>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {s.progress}% disbursed
              </p>
            </div>
          </li>
        )}
      </ul>
    </motion.section>);

}