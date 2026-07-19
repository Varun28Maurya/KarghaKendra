import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { KpiCards } from './components/KpiCards';
import { ProcurementChart } from './components/ProcurementChart';
import { OrderStatusChart } from './components/OrderStatusChart';
import { RecentOrders } from './components/RecentOrders';
import { TopCooperatives } from './components/TopCooperatives';
import { AiAssistant } from './components/AiAssistant';
import { Notifications } from './components/Notifications';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full w-full bg-ivory-100 text-clay-800">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-[1500px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <WelcomeBanner />

          <KpiCards />

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProcurementChart />
            </div>
            <div className="lg:col-span-1">
              <OrderStatusChart />
            </div>
          </section>

          <RecentOrders />

          <TopCooperatives />

          <AiAssistant />

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Notifications />
            </div>
            <div className="hidden lg:col-span-1 lg:block">
              <QuickActions />
            </div>
          </section>

          <footer className="flex flex-col items-center justify-between gap-2 border-t border-clay-100 pt-6 text-xs text-clay-400 sm:flex-row">
            <p>© 2026 KarghaKendra · Woven with care across India 🧵</p>
            <p>Empowering 142 cooperatives · 11 states</p>
          </footer>
        </main>
      </div>
    </div>);

}

function QuickActions() {
  const actions = [
  { title: 'Create new RFQ', desc: 'Request quotes from cooperatives' },
  { title: 'Onboard a cooperative', desc: 'Invite & verify a new partner' },
  { title: 'Export procurement report', desc: 'Download this month’s summary' }];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-clay-100 bg-ivory-50 p-5 shadow-soft sm:p-6">
      <h2 className="font-display text-lg font-semibold text-clay-800">Quick Actions</h2>
      <p className="text-sm text-clay-400">Common procurement tasks</p>
      <div className="mt-4 space-y-3">
        {actions.map((a) =>
        <button
          key={a.title}
          className="group flex w-full items-center gap-3 rounded-xl border border-clay-100 bg-ivory-100 p-3.5 text-left transition-colors hover:border-clay-200 hover:bg-clay-50">
          
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay-600 text-ivory-50 transition-transform group-hover:scale-105">
              +
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-clay-800">{a.title}</span>
              <span className="block text-xs text-clay-400">{a.desc}</span>
            </span>
          </button>
        )}
      </div>
    </div>);

}