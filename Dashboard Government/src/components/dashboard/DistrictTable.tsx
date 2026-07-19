










import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowUpRightIcon, ArrowDownRightIcon } from 'lucide-react';
import { districts } from '../../data/govData';

export function DistrictTable() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-3xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      
      <div className="flex items-center gap-2 mb-4">
        <MapPinIcon className="h-5 w-5" style={{ color: 'var(--accent)' }} />
        <h2 className="font-amita text-2xl" style={{ color: 'var(--text)' }}>
          Top Handloom Districts
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left" style={{ color: 'var(--text-secondary)' }}>
              <th className="font-medium pb-3 pr-4">District</th>
              <th className="font-medium pb-3 pr-4 hidden sm:table-cell">Cooperatives</th>
              <th className="font-medium pb-3 pr-4">Weavers</th>
              <th className="font-medium pb-3 pr-4 hidden md:table-cell">Output (YTD)</th>
              <th className="font-medium pb-3 text-right">Growth</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((d) => {
              const up = d.growth >= 0;
              return (
                <tr key={d.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="py-3 pr-4">
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>
                      {d.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {d.state}
                    </p>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell" style={{ color: 'var(--text)' }}>
                    {d.coops}
                  </td>
                  <td className="py-3 pr-4" style={{ color: 'var(--text)' }}>
                    {d.weavers}
                  </td>
                  <td className="py-3 pr-4 hidden md:table-cell" style={{ color: 'var(--text)' }}>
                    {d.output}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className="inline-flex items-center gap-1 font-semibold"
                      style={{ color: up ? 'var(--accent)' : 'var(--error)' }}>
                      
                      {up ? <ArrowUpRightIcon className="h-3.5 w-3.5" /> : <ArrowDownRightIcon className="h-3.5 w-3.5" />}
                      {Math.abs(d.growth)}%
                    </span>
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </motion.section>);

}