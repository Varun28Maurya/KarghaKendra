



import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2Icon,
  UsersIcon,
  FactoryIcon,
  AwardIcon,
  ShieldCheckIcon,
  GraduationCapIcon,
  WalletIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon } from
'lucide-react';
import type { StatItem } from '../../data/govData';

const iconMap: Record<string, React.ElementType> = {
  building: Building2Icon,
  users: UsersIcon,
  production: FactoryIcon,
  award: AwardIcon,
  shield: ShieldCheckIcon,
  graduation: GraduationCapIcon,
  wallet: WalletIcon
};

export function StatCard({ stat, index }: {stat: StatItem;index: number;}) {
  const Icon = iconMap[stat.icon] ?? Building2Icon;
  const isUp = stat.trendDir === 'up';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="rounded-2xl border p-5"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-start justify-between">
        <span
          className="grid place-items-center h-10 w-10 rounded-xl"
          style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
          
          <Icon className="h-5 w-5" />
        </span>
        <span
          className="inline-flex items-center gap-1 text-[11px] font-semibold rounded-full px-2 py-1"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: isUp ? 'var(--accent)' : 'var(--error)'
          }}>
          
          {isUp ? <ArrowUpRightIcon className="h-3 w-3" /> : <ArrowDownRightIcon className="h-3 w-3" />}
          {stat.trend}
        </span>
      </div>
      <p className="mt-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {stat.label}
      </p>
      <p className="font-amita text-3xl mt-0.5" style={{ color: 'var(--text)' }}>
        {stat.value}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
        {stat.sub}
      </p>
    </motion.div>);

}