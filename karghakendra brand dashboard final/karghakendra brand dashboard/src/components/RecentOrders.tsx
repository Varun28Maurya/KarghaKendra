


import React from 'react';
import { MapPinIcon, ArrowRightIcon } from 'lucide-react';
import { recentOrders, OrderState } from '../data/mock';

const statusStyles: Record<OrderState, string> = {
  Pending: 'bg-gold-50 text-gold-600 ring-gold-100',
  Production: 'bg-clay-50 text-clay-600 ring-clay-100',
  'Quality Check': 'bg-ivory-200 text-clay-500 ring-clay-100',
  Transit: 'bg-sage-100 text-sage-500 ring-sage-100',
  Delivered: 'bg-clay-600/10 text-clay-700 ring-clay-100'
};

export function RecentOrders() {
  return (
    <div className="rounded-2xl border border-clay-100 bg-ivory-50 shadow-soft">
      <div className="flex items-center justify-between border-b border-clay-100 px-5 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-clay-800">Recent Orders</h2>
          <p className="text-sm text-clay-400">Latest procurement activity</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500 hover:text-gold-600">
          View all
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-clay-100 text-xs font-semibold uppercase tracking-wide text-clay-400">
              <th className="px-5 py-3 sm:px-6">Product</th>
              <th className="px-5 py-3">Cooperative</th>
              <th className="px-5 py-3">Quantity</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 sm:px-6">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-clay-100">
            {recentOrders.map((order) =>
            <tr key={order.id} className="group transition-colors hover:bg-ivory-100">
                <td className="px-5 py-4 sm:px-6">
                  <p className="text-sm font-semibold text-clay-800">{order.product}</p>
                  <p className="text-xs text-clay-400">
                    {order.id} · {order.category}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-clay-700">{order.cooperative}</p>
                  <p className="flex items-center gap-1 text-xs text-clay-400">
                    <MapPinIcon className="h-3 w-3" />
                    {order.location}
                  </p>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-clay-700">{order.quantity}</td>
                <td className="px-5 py-4">
                  <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[order.status]}`}>
                  
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-clay-700 sm:px-6">{order.eta}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}