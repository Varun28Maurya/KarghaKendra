



import React from 'react';
import { FileTextIcon, TruckIcon, WalletIcon, BadgeCheckIcon } from 'lucide-react';
import { notifications, NotifKind } from '../data/mock';

const kindConfig: Record<
  NotifKind,
  {icon: React.ComponentType<{className?: string;}>;ring: string;bg: string;text: string;}> =
{
  rfq: { icon: FileTextIcon, ring: 'ring-gold-100', bg: 'bg-gold-50', text: 'text-gold-600' },
  shipment: { icon: TruckIcon, ring: 'ring-sage-100', bg: 'bg-sage-100', text: 'text-sage-500' },
  payment: { icon: WalletIcon, ring: 'ring-clay-100', bg: 'bg-clay-50', text: 'text-clay-600' },
  update: { icon: BadgeCheckIcon, ring: 'ring-ivory-300', bg: 'bg-ivory-200', text: 'text-clay-500' }
};

export function Notifications() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-clay-800">Recent Notifications</h2>
          <p className="text-sm text-clay-400">RFQs, shipments &amp; updates</p>
        </div>
        <button className="text-sm font-semibold text-gold-500 hover:text-gold-600">Mark all read</button>
      </div>

      <ol className="relative space-y-1">
        <span
          className="absolute bottom-4 left-[19px] top-4 w-px bg-clay-100"
          aria-hidden="true" />
        
        {notifications.map((n) => {
          const cfg = kindConfig[n.kind];
          const Icon = cfg.icon;
          return (
            <li key={n.id} className="relative flex gap-3.5 rounded-xl p-2 transition-colors hover:bg-ivory-100">
              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-ivory-50 ${cfg.bg} ${cfg.text}`}>
                
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-clay-800">{n.title}</p>
                  <span className="shrink-0 text-xs text-clay-400">{n.time}</span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-clay-500">{n.body}</p>
              </div>
            </li>);

        })}
      </ol>

      <button className="mt-5 w-full rounded-xl bg-ivory-100 py-2.5 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-50">
        View all notifications
      </button>
    </div>);

}