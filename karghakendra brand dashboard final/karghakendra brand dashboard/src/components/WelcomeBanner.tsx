

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, TrendingUpIcon, ArrowRightIcon } from 'lucide-react';

export function WelcomeBanner() {
  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="stitched-panel relative overflow-hidden rounded-2xl border border-clay-100 bg-clay-600 p-6 text-ivory-50 shadow-card sm:p-8 xl:col-span-2">
        
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 10px), repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 10px)'
          }}
          aria-hidden="true" />
        
        <div className="relative">
          <p className="mb-2 text-sm font-medium text-gold-200">Sunday, 19 July 2026</p>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Welcome back, FabIndia <span className="align-middle"></span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory-200/90">
            Manage procurement, monitor orders, and collaborate with India's weaving
            cooperatives — all in one warm, connected workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-semibold text-clay-800 transition-colors hover:bg-gold-300">
              Create RFQ
              <ArrowRightIcon className="h-4 w-4" />
            </button>
            <button className="rounded-xl border border-ivory-50/25 bg-ivory-50/5 px-4 py-2.5 text-sm font-semibold text-ivory-50 transition-colors hover:bg-ivory-50/10">
              Discover Cooperatives
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="rounded-2xl border border-gold-100 bg-ivory-50 p-6 shadow-soft">
        
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-100 text-gold-500">
            <SparklesIcon className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold text-clay-800">AI Insight</p>
          <span className="ml-auto rounded-full bg-sage-100 px-2 py-0.5 text-[11px] font-semibold text-sage-500">
            New
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-clay-600">
          Consolidating your Chanderi &amp; Ikat orders with{' '}
          <span className="font-semibold text-clay-800">3 nearby cooperatives</span> could cut
          logistics overhead this quarter.
        </p>
        <div className="mt-4 flex items-end justify-between rounded-xl bg-sage-100/60 p-4">
          <div>
            <p className="text-xs font-medium text-clay-500">Est. quarterly savings</p>
            <p className="font-display text-2xl font-semibold text-clay-800">₹3.8L</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-sage-400/15 px-2 py-1 text-xs font-semibold text-sage-500">
            <TrendingUpIcon className="h-3.5 w-3.5" />
            14%
          </span>
        </div>
        <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-600">
          View recommendation
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </motion.div>
    </section>);

}