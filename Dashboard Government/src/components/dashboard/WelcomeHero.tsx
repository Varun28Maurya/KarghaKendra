

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, FileTextIcon } from 'lucide-react';

export function WelcomeHero() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="weave-panel relative overflow-hidden rounded-3xl p-7 sm:p-9 text-[#FFF8EE]">
      
      <p className="text-sm font-medium mb-3" style={{ color: 'rgba(255,248,238,0.85)' }}>
        {today}
      </p>
      <h1 className="font-amita text-4xl sm:text-5xl leading-tight">
        Namaste, Ministry of Textiles 
      </h1>
      <p className="mt-3 max-w-2xl text-sm sm:text-base" style={{ color: 'rgba(255,248,238,0.9)' }}>
        Monitor cooperatives, verify registrations, roll out schemes, and track grassroots
        production &amp; employment across India&apos;s handloom clusters — all in one place.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.98]"
          style={{ backgroundColor: 'var(--highlight)', color: '#3B2418' }}>
          
          Publish a Scheme <ArrowRightIcon className="h-4 w-4" />
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-[#FFF8EE] transition-colors"
          style={{ backgroundColor: 'rgba(255,248,238,0.14)', border: '1px solid rgba(255,248,238,0.4)' }}>
          
          <FileTextIcon className="h-4 w-4" /> Generate State Report
        </button>
      </div>
    </motion.section>);

}