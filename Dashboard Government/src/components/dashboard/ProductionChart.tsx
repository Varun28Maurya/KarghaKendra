




import React from 'react';
import { motion } from 'framer-motion';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend } from
'recharts';
import { productionEmployment } from '../../data/govData';

export function ProductionChart() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="font-amita text-2xl" style={{ color: 'var(--text)' }}>
            Production &amp; Employment
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Fabric output (000&apos; m) vs active weavers (000&apos;) — last 7 months
          </p>
        </div>
      </div>

      <div className="h-72 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={productionEmployment} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                color: 'var(--text)'
              }}
              cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }} />
            
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
            <Bar yAxisId="left" name="Fabric output" dataKey="production" fill="var(--accent)" radius={[6, 6, 0, 0]} barSize={26} />
            <Line
              yAxisId="right"
              name="Active weavers"
              type="monotone"
              dataKey="weavers"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4, fill: 'var(--highlight)' }} />
            
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.section>);

}