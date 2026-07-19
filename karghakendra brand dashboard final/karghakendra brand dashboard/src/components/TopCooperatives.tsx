


import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, UsersIcon, GaugeIcon, TruckIcon, ArrowRightIcon } from 'lucide-react';
import { topCooperatives, Cooperative } from '../data/mock';

export function TopCooperatives() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-clay-800">Top Cooperatives</h2>
          <p className="text-sm text-clay-400">Highest rated partners this quarter</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-600">
          Explore all
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topCooperatives.map((coop, i) =>
        <CoopCard key={coop.id} coop={coop} index={i} />
        )}
      </div>
    </div>);

}

function CoopCard({ coop, index }: {coop: Cooperative;index: number;}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex flex-col rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft transition-shadow hover:shadow-card">
      
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay-600 font-display text-lg font-semibold text-gold-200">
          {coop.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-clay-800">{coop.name}</h3>
          <p className="text-xs text-clay-400">
            {coop.craft} · {coop.location}
          </p>
        </div>
      </div>

      <div className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold text-gold-600">
        <StarIcon className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
        {coop.rating.toFixed(1)} rating
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-clay-100 pt-4">
        <Stat icon={UsersIcon} label="Members" value={`${coop.members}`} />
        <Stat icon={GaugeIcon} label="Capacity" value={coop.capacity} />
        <div className="col-span-2">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-clay-500">
              <TruckIcon className="h-3.5 w-3.5" />
              On-time delivery
            </span>
            <span className="font-semibold text-clay-800">{coop.onTime}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-clay-100">
            <div className="h-full rounded-full bg-sage-400" style={{ width: `${coop.onTime}%` }} />
          </div>
        </div>
      </dl>

      <button className="mt-5 w-full rounded-xl border border-clay-200 py-2.5 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-600 hover:text-ivory-50 hover:border-clay-600">
        View Details
      </button>
    </motion.article>);

}

function Stat({
  icon: Icon,
  label,
  value




}: {icon: React.ComponentType<{className?: string;}>;label: string;value: string;}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-clay-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-clay-800">{value}</dd>
    </div>);

}