
import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboardIcon,
  CompassIcon,
  PackageIcon,
  FileTextIcon,
  UsersIcon,
  BarChart3Icon,
  MessageSquareIcon,
  SettingsIcon,
  XIcon,
  SparklesIcon } from
'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{className?: string;}>;
  badge?: string;
}

const navItems: NavItem[] = [
{ label: 'Dashboard', icon: LayoutDashboardIcon },
{ label: 'Discover', icon: CompassIcon },
{ label: 'Orders', icon: PackageIcon, badge: '38' },
{ label: 'RFQs', icon: FileTextIcon, badge: '12' },
{ label: 'Cooperatives', icon: UsersIcon },
{ label: 'Analytics', icon: BarChart3Icon },
{ label: 'Messages', icon: MessageSquareIcon, badge: '5' },
{ label: 'Settings', icon: SettingsIcon }];


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open &&
      <div
        className="fixed inset-0 z-30 bg-clay-900/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true" />

      }
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-clay-100 bg-ivory-50 transition-transform duration-300 lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'}`
        }>
        
        <div className="flex h-20 items-center justify-between px-6">
          <Logo />
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-clay-500 hover:bg-clay-50 lg:hidden"
            aria-label="Close navigation">
            
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-2" aria-label="Primary">
          {navItems.map((item) => {
            const active = item.label === 'Dashboard';
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                active ?
                'bg-clay-600 text-ivory-50 shadow-soft' :
                'text-clay-600 hover:bg-clay-50'}`
                }>
                
                {active &&
                <motion.span
                  layoutId="nav-active"
                  className="absolute -left-4 h-6 w-1 rounded-full bg-gold-400" />

                }
                <Icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge &&
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  active ? 'bg-ivory-50/20 text-ivory-50' : 'bg-clay-100 text-clay-600'}`
                  }>
                  
                    {item.badge}
                  </span>
                }
              </a>);

          })}
        </nav>

        <div className="p-4">
          <div className="stitched-panel rounded-2xl border border-gold-200 bg-gold-50 p-4 shadow-soft">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400 text-ivory-50">
                <SparklesIcon className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-clay-800">KarghaKendra AI</p>
            </div>
            <p className="text-xs leading-relaxed text-clay-500">
              Let AI match you with the best cooperatives for your next collection.
            </p>
            <button className="mt-3 w-full rounded-lg bg-clay-800 py-2 text-xs font-semibold text-ivory-50 transition-colors hover:bg-clay-700">
              Ask the Assistant
            </button>
          </div>
        </div>
      </aside>
    </>);

}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="KarghaKendra">
      <img
        src="/ChatGPT_Image_Jul_16,_2026,_10_15_38_PM.png"
        alt="KarghaKendra charkha emblem"
        className="h-12 w-12 rounded-full border border-clay-200 object-cover object-center" />
      
      <div className="leading-tight">
        <p className="font-display text-base font-bold text-clay-800">KarghaKendra</p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-500">
          Handloom &amp; Heritage
        </p>
      </div>
    </div>);

}