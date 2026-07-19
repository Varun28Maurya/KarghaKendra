import React from "react";
import { motion } from "framer-motion";
import { BarChart3Icon, BoxIcon, CompassIcon, FileTextIcon, MessageSquareIcon, SettingsIcon, SparklesIcon, UsersRoundIcon } from "lucide-react";
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}
const navigationItems: NavItem[] = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: BoxIcon
}, {
  id: 'discover',
  label: 'Discover',
  icon: CompassIcon
}, {
  id: 'orders',
  label: 'Orders',
  icon: BoxIcon,
  badge: 38
}, {
  id: 'rfqs',
  label: 'RFQs',
  icon: FileTextIcon,
  badge: 12
}, {
  id: 'cooperatives',
  label: 'Cooperatives',
  icon: UsersRoundIcon
}, {
  id: 'analytics',
  label: 'Analytics',
  icon: BarChart3Icon
}, {
  id: 'messages',
  label: 'Messages',
  icon: MessageSquareIcon,
  badge: 5
}, {
  id: 'settings',
  label: 'Settings',
  icon: SettingsIcon
}];
interface SidebarProps {
  active: string;
  onSelect: (id: string) => void;
}
export function Sidebar({
  active,
  onSelect
}: SidebarProps) {
  return <aside className="sticky top-0 flex h-screen w-[72px] shrink-0 flex-col border-r sm:w-64" style={{
    borderColor: 'var(--border)',
    backgroundColor: 'var(--surface)'
  }}>
      <div className="flex h-[88px] items-center justify-center border-b px-3 sm:justify-start sm:gap-3 sm:px-5" style={{
      borderColor: 'var(--border)'
    }}>
        <img src="/KhaeghaKendra_Logo.jpg" alt="Kargha Kendra logo" className="h-11 w-11 shrink-0 rounded-full border object-cover" style={{
        borderColor: 'var(--border)'
      }} />
        <div className="hidden min-w-0 sm:block">
          <p className="font-amita text-xl leading-none whitespace-nowrap" style={{
          color: 'var(--text)'
        }}>
            KarghaKendra
          </p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] whitespace-nowrap" style={{
          color: 'var(--text-secondary)'
        }}>
            HANDLOOM HERITAGE
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4 sm:px-3" aria-label="Main navigation">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return <li key={item.id}>
                <button type="button" onClick={() => onSelect(item.id)} aria-current={isActive ? 'page' : undefined} aria-label={item.label} title={item.label} className="flex w-full items-center justify-center rounded-xl px-2 py-3 text-sm font-semibold transition-colors sm:justify-start sm:gap-3 sm:px-3 sm:py-2.5" style={{
              color: isActive ? '#FFF8EE' : 'var(--text)',
              backgroundColor: isActive ? 'var(--primary)' : 'transparent'
            }} onMouseEnter={(event) => {
              if (!isActive) event.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }} onMouseLeave={(event) => {
              if (!isActive) event.currentTarget.style.backgroundColor = 'transparent';
            }}>
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span className="hidden flex-1 text-left sm:block">{item.label}</span>
                  {item.badge !== undefined && <span className="hidden rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-block" style={{
                backgroundColor: isActive ? 'rgba(255,248,238,0.22)' : 'var(--bg-secondary)',
                color: isActive ? '#FFF8EE' : 'var(--text-secondary)'
              }}>
                      {item.badge}
                    </span>}
                </button>
              </li>;
        })}
        </ul>
      </nav>

      <div className="p-2 sm:p-3">
        <motion.section initial={{
        opacity: 0,
        y: 8
      }} animate={{
        opacity: 1,
        y: 0
      }} className="rounded-2xl border p-2.5 sm:p-4" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)'
      }} aria-label="Kargha Kendra AI assistant">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{
            backgroundColor: 'var(--highlight)'
          }}>
              <SparklesIcon className="h-4 w-4" style={{
              color: '#3B2418'
            }} aria-hidden="true" />
            </span>
            <p className="hidden text-sm font-bold sm:block" style={{
            color: 'var(--text)'
          }}>
              Kargha Kendra AI
            </p>
          </div>
          <p className="mt-3 hidden text-xs leading-relaxed sm:block" style={{
          color: 'var(--text-secondary)'
        }}>
            Let AI help you find insights across cooperatives, orders, and reports.
          </p>
          <button type="button" className="mt-2.5 flex w-full items-center justify-center rounded-lg py-2 text-xs font-bold text-[#FFF8EE] transition-colors sm:mt-3 sm:text-sm" style={{
          backgroundColor: 'var(--primary)'
        }} onMouseEnter={(event) => event.currentTarget.style.backgroundColor = 'var(--primary-hover)'} onMouseLeave={(event) => event.currentTarget.style.backgroundColor = 'var(--primary)'} aria-label="Ask the Assistant" title="Ask the Assistant">
            <span className="hidden sm:inline">Ask the Assistant</span>
            <SparklesIcon className="h-4 w-4 sm:hidden" aria-hidden="true" />
          </button>
        </motion.section>
      </div>
    </aside>;
}