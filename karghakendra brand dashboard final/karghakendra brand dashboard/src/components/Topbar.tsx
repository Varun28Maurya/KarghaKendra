
import React, { useState } from 'react';
import { SearchIcon, BellIcon, MenuIcon, ChevronDownIcon, SunIcon, MoonIcon } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-clay-100 bg-ivory-100/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-clay-600 hover:bg-clay-50 lg:hidden"
        aria-label="Open navigation">
        
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-clay-300" />
        <input
          type="search"
          placeholder="Search cooperatives, orders, RFQs…"
          className="w-full rounded-xl border border-clay-100 bg-ivory-50 py-2.5 pl-10 pr-4 text-sm text-clay-800 placeholder:text-clay-300 focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100" />
        
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          className="rounded-lg p-2 text-clay-600 hover:bg-clay-50 md:hidden"
          aria-label="Search">
          
          <SearchIcon className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-xl border border-clay-100 bg-ivory-50 p-2.5 text-clay-600 transition-colors hover:bg-clay-50"
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>

        <button
          className="relative rounded-xl border border-clay-100 bg-ivory-50 p-2.5 text-clay-600 transition-colors hover:bg-clay-50"
          aria-label="Notifications, 3 unread">
          
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
        </button>

        <button className="flex items-center gap-2.5 rounded-xl border border-clay-100 bg-ivory-50 py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-clay-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay-600 text-sm font-semibold text-ivory-50">
            FI
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-semibold text-clay-800">FabIndia</span>
            <span className="block text-[11px] text-clay-400">Brand · Procurement</span>
          </span>
          <ChevronDownIcon className="hidden h-4 w-4 text-clay-400 sm:block" />
        </button>
      </div>
    </header>);

}