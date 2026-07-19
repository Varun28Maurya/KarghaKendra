






import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, FileCheckIcon, ArrowRightIcon } from 'lucide-react';
import { verificationQueue } from '../../data/govData';

export function VerificationQueue() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-3xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
          <h2 className="font-amita text-2xl" style={{ color: 'var(--text)' }}>
            Verification Queue
          </h2>
        </div>
        <button
          className="inline-flex items-center gap-1 text-sm font-semibold"
          style={{ color: 'var(--primary)' }}>
          
          View all <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <ul className="space-y-2.5">
        {verificationQueue.map((item) =>
        <li
          key={item.id}
          className="flex items-center gap-3 rounded-xl border p-3.5"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
          
            <span
            className="grid place-items-center h-10 w-10 rounded-lg shrink-0"
            style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
            
              <FileCheckIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
                {item.coop}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                {item.doc} · {item.district}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              {item.priority === 'urgent' &&
            <span
              className="text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5"
              style={{ backgroundColor: 'rgba(178,34,34,0.12)', color: 'var(--error)' }}>
              
                  Urgent
                </span>
            }
              <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                {item.submitted}
              </span>
            </div>
            <button
            className="ml-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#FFF8EE] shrink-0 transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}>
            
              Review
            </button>
          </li>
        )}
      </ul>
    </motion.section>);

}