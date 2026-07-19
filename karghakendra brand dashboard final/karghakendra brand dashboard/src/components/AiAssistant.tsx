



import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  LightbulbIcon,
  TrendingUpIcon,
  HandshakeIcon,
  PiggyBankIcon,
  SendIcon } from
'lucide-react';

interface Insight {
  icon: React.ComponentType<{className?: string;}>;
  title: string;
  body: string;
  tag: string;
}

const insights: Insight[] = [
{
  icon: HandshakeIcon,
  title: 'Supplier recommendation',
  body: 'Bhujodi Weavers Trust matches your linen sourcing needs with 22% lower lead time.',
  tag: 'Sourcing'
},
{
  icon: TrendingUpIcon,
  title: 'Demand forecast',
  body: 'Festive-season demand for silk sarees is projected to rise 31% by October.',
  tag: 'Forecast'
},
{
  icon: LightbulbIcon,
  title: 'Procurement insight',
  body: 'Batch your Chanderi & Maheshwari RFQs to unlock volume pricing tiers.',
  tag: 'Optimize'
}];


export function AiAssistant() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-clay-100 bg-clay-800 p-6 text-ivory-50 shadow-card sm:p-8">
      
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/10 blur-2xl"
        aria-hidden="true" />
      
      <div className="relative flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-72 lg:shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400 text-clay-800">
              <SparklesIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">AI Procurement Assistant</h2>
              <p className="text-xs text-ivory-200/70">Powered by KarghaKendra AI</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ivory-200/80">
            Personalized recommendations to help you source smarter, forecast demand, and reduce
            procurement costs.
          </p>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-gold-400/10 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/20 text-gold-200">
              <PiggyBankIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-ivory-200/70">Estimated savings identified</p>
              <p className="font-display text-2xl font-semibold text-gold-200">₹6.4L</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {insights.map((ins) => {
            const Icon = ins.icon;
            return (
              <div
                key={ins.title}
                className="flex items-start gap-3 rounded-xl border border-ivory-50/10 bg-ivory-50/5 p-4 transition-colors hover:bg-ivory-50/[0.08]">
                
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ivory-50/10 text-gold-200">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{ins.title}</p>
                    <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gold-200">
                      {ins.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-200/75">{ins.body}</p>
                </div>
              </div>);

          })}

          <div className="flex items-center gap-2 rounded-xl border border-ivory-50/10 bg-ivory-50/5 p-2 pl-4">
            <input
              type="text"
              placeholder="Ask about sourcing, pricing, or forecasts…"
              className="flex-1 bg-transparent text-sm text-ivory-50 placeholder:text-ivory-200/50 focus:outline-none" />
            
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-clay-800 transition-colors hover:bg-gold-300"
              aria-label="Send message to assistant">
              
              <SendIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>);

}