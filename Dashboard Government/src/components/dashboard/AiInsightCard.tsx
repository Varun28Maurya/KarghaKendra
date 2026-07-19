


import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, ArrowRightIcon, TrendingUpIcon } from 'lucide-react';

export function AiInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-3xl border p-6 flex flex-col"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-8 w-8 rounded-lg" style={{ backgroundColor: 'var(--highlight)' }}>
            <SparklesIcon className="h-[18px] w-[18px]" style={{ color: '#3B2418' }} />
          </span>
          <p className="font-semibold" style={{ color: 'var(--text)' }}>
            AI Insight
          </p>
        </div>
        <span
          className="text-[11px] font-semibold rounded-full px-2 py-0.5"
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
          
          New
        </span>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>Bhagalpur</span> clusters show{' '}
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>21% output growth</span> but low
        scheme uptake — directing the Yarn Subsidy here could onboard{' '}
        <span style={{ color: 'var(--text)', fontWeight: 600 }}>~1,900 weavers</span>.
      </p>

      <div className="mt-4 rounded-xl p-3" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Est. new beneficiaries
        </p>
        <div className="flex items-end justify-between mt-1">
          <p className="font-amita text-2xl" style={{ color: 'var(--text)' }}>
            1,900+
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
            <TrendingUpIcon className="h-3.5 w-3.5" /> High impact
          </span>
        </div>
      </div>

      <button
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform hover:gap-2.5"
        style={{ color: 'var(--primary)' }}>
        
        View recommendation <ArrowRightIcon className="h-4 w-4" />
      </button>
    </motion.div>);

}