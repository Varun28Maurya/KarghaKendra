

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { orderStatus } from '../data/mock';

export function OrderStatusChart() {
  const total = orderStatus.reduce((s, o) => s + o.value, 0);

  const getDynamicColor = (color: string) => {
    switch (color) {
      case '#C99A52': return 'var(--color-gold-400)';
      case '#8A4B2A': return 'var(--color-clay-600)';
      case '#D6C3A5': return 'var(--color-clay-200)';
      case '#7F9471': return 'var(--color-sage-400)';
      case '#3B2418': return 'var(--color-clay-800)';
      default: return color;
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft sm:p-6">
      <div className="mb-3">
        <h2 className="font-display text-lg font-semibold text-clay-800">Order Status</h2>
        <p className="text-sm text-clay-400">Distribution across the pipeline</p>
      </div>

      <div className="relative mx-auto h-52 w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={orderStatus}
              dataKey="value"
              nameKey="name"
              innerRadius={64}
              outerRadius={90}
              paddingAngle={2}
              stroke="none">
              
              {orderStatus.map((entry) =>
              <Cell key={entry.name} fill={getDynamicColor(entry.color)} />
              )}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--color-clay-100)',
                background: 'var(--color-ivory-50)',
                color: 'var(--color-clay-800)',
                fontSize: 12
              }}
              formatter={(v: number, n: string) => [`${v} orders`, n]} />
            
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-3xl font-semibold text-clay-800">{total}</p>
          <p className="text-xs font-medium text-clay-400">Total orders</p>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
        {orderStatus.map((o) =>
        <li key={o.name} className="flex items-center gap-2.5 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: getDynamicColor(o.color) }} />
            <span className="flex-1 text-clay-600">{o.name}</span>
            <span className="font-semibold text-clay-800">{o.value}</span>
            <span className="w-10 text-right text-xs text-clay-400">
              {Math.round(o.value / total * 100)}%
            </span>
          </li>
        )}
      </ul>
    </div>);

}