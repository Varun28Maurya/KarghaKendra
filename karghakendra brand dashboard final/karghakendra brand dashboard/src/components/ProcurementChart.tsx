

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend } from
'recharts';
import { procurementData } from '../data/mock';

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-clay-100 bg-ivory-50 px-3.5 py-2.5 shadow-card">
      <p className="mb-1 text-xs font-semibold text-clay-800">{label} 2026</p>
      {payload.map((p: any) =>
      <p key={p.dataKey} className="text-xs text-clay-500">
          <span
          className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
          style={{ background: p.color }} />
        
          {p.name}: <span className="font-semibold text-clay-800">₹{p.value}L</span>
        </p>
      )}
    </div>);

}

export function ProcurementChart() {
  return (
    <div className="rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-clay-800">Procurement Analytics</h2>
          <p className="text-sm text-clay-400">Monthly spend vs. AI forecast (₹ lakh)</p>
        </div>
        <div className="flex rounded-lg border border-clay-100 bg-ivory-100 p-1 text-xs font-medium">
          {['6M', '12M', 'YTD'].map((r, i) =>
          <button
            key={r}
            className={`rounded-md px-3 py-1.5 transition-colors ${
            i === 1 ? 'bg-clay-600 text-ivory-50 shadow-soft' : 'text-clay-500 hover:text-clay-800'}`
            }>
            
              {r}
            </button>
          )}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={procurementData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--color-clay-200)" strokeDasharray="4 4" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-clay-500)', fontSize: 12 }} />
            
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--color-clay-500)', fontSize: 12 }}
              tickFormatter={(v) => `₹${v}L`} />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-clay-200)', strokeWidth: 1 }} />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: 'var(--color-clay-500)', paddingTop: 8 }} />
            
            <Area
              type="monotone"
              dataKey="spend"
              name="Actual spend"
              stroke="var(--color-clay-600)"
              strokeWidth={2.5}
              fill="var(--color-clay-600)"
              fillOpacity={0.12}
              activeDot={{ r: 5, fill: 'var(--color-clay-600)', stroke: 'var(--color-ivory-50)', strokeWidth: 2 }} />
            
            <Line
              type="monotone"
              dataKey="forecast"
              name="AI forecast"
              stroke="var(--color-gold-400)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false} />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>);

}