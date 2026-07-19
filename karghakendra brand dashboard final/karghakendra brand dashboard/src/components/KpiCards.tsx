

import React from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  PackageIcon,
  FileTextIcon,
  WalletIcon,
  FactoryIcon,
  CheckCircle2Icon,
  ArrowUpRightIcon,
  ArrowDownRightIcon } from
'lucide-react';
import { kpis, Kpi } from '../data/mock';

const iconMap: Record<string, React.ComponentType<{className?: string;}>> = {
  coops: UsersIcon,
  active: PackageIcon,
  rfq: FileTextIcon,
  spend: WalletIcon,
  production: FactoryIcon,
  completed: CheckCircle2Icon
};

export function KpiCards() {
  return (
    <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {kpis.map((kpi, i) =>
      <KpiCard key={kpi.id} kpi={kpi} index={i} />
      )}
    </section>);

}

function KpiCard({ kpi, index }: {kpi: Kpi;index: number;}) {
  const Icon = iconMap[kpi.icon];
  const up = kpi.trend === 'up';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft transition-shadow hover:shadow-card">
      
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-50 text-clay-600 transition-colors group-hover:bg-clay-600 group-hover:text-ivory-50">
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
          up ? 'bg-sage-100 text-sage-500' : 'bg-gold-50 text-gold-600'}`
          }>
          
          {up ? <ArrowUpRightIcon className="h-3.5 w-3.5" /> : <ArrowDownRightIcon className="h-3.5 w-3.5" />}
          {kpi.delta}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-clay-500">{kpi.label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-clay-800">{kpi.value}</p>
      <p className="mt-1 text-xs text-clay-400">{kpi.hint}</p>
    </motion.div>);

}