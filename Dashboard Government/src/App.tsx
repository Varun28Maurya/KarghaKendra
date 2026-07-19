
import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { WelcomeHero } from './components/dashboard/WelcomeHero';
import { AiInsightCard } from './components/dashboard/AiInsightCard';
import { StatCard } from './components/dashboard/StatCard';
import { ProductionChart } from './components/dashboard/ProductionChart';
import { VerificationQueue } from './components/dashboard/VerificationQueue';
import { SchemePerformance } from './components/dashboard/SchemePerformance';
import { DistrictTable } from './components/dashboard/DistrictTable';
import { heroStats, secondaryStats } from './data/govData';

export function App() {
  const [active, setActive] = useState('dashboard');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="weave-bg flex w-full min-h-screen" style={{ color: 'var(--text)' }}>
      <Sidebar active={active} onSelect={setActive} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar dark={dark} onToggleTheme={() => setDark((d) => !d)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Hero row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <WelcomeHero />
            </div>
            <AiInsightCard />
          </div>

          {/* Primary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {heroStats.map((stat, i) =>
            <StatCard key={stat.id} stat={stat} index={i} />
            )}
          </div>

          {/* Chart + verification */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ProductionChart />
            </div>
            <VerificationQueue />
          </div>

          {/* Secondary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {secondaryStats.map((stat, i) =>
            <StatCard key={stat.id} stat={stat} index={i} />
            )}
          </div>

          {/* Schemes + districts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SchemePerformance />
            <DistrictTable />
          </div>
        </main>
      </div>
    </div>);

}