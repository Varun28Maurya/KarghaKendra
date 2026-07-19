

import React from 'react';
import { SearchIcon, BellIcon, MoonIcon, SunIcon, ChevronDownIcon } from 'lucide-react';

interface TopBarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export function TopBar({ dark, onToggleTheme }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center gap-3 px-4 sm:px-6 h-[88px] border-b backdrop-blur"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
      
      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <label className="relative block">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: 'var(--text-secondary)' }} />
          
          <input
            type="search"
            placeholder="Search cooperatives, districts, schemes…"
            aria-label="Search"
            className="w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:ring-2"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }} />
          
        </label>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          className="grid place-items-center h-11 w-11 rounded-xl border transition-colors"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text)' }}>
          
          {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>

        <button
          aria-label="Notifications"
          className="relative grid place-items-center h-11 w-11 rounded-xl border transition-colors"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text)' }}>
          
          <BellIcon className="h-5 w-5" />
          <span
            className="absolute top-2 right-2 h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--error)' }} />
          
        </button>

        <button
          className="flex items-center gap-2.5 rounded-xl border pl-2 pr-3 py-1.5 transition-colors"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          
          <span
            className="grid place-items-center h-8 w-8 rounded-lg text-xs font-bold text-[#FFF8EE]"
            style={{ backgroundColor: 'var(--primary)' }}>
            
            MT
          </span>
          <span className="text-left hidden sm:block">
            <span className="block text-sm font-semibold leading-none" style={{ color: 'var(--text)' }}>
              Ministry of Textiles
            </span>
            <span className="block text-[11px] mt-1" style={{ color: 'var(--text-secondary)' }}>
              Govt · District Officer
            </span>
          </span>
          <ChevronDownIcon className="h-4 w-4" style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>
    </header>);

}