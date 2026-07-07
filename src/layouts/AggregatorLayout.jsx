import { useState } from 'react'
import { Menu, Bell } from 'lucide-react'
import AggregatorSidebar from '../components/AggregatorSidebar'
import { aggregatorProfile } from '../data/aggregatorData'

export default function AggregatorLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-subtle)]">
      <AggregatorSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-[var(--bg)] border-b border-[var(--border)] flex items-center gap-4 px-6 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[var(--text-muted)] p-1 -ml-1"><Menu size={22} /></button>
          {title && <h1 className="font-display text-[20px] font-medium text-navy-700 dark:text-navy-100 hidden sm:block">{title}</h1>}
          <div className="flex-1" />
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400" />
          </button>
          <div className="w-9 h-9 rounded-full bg-purple
orange-500 flex items-center justify-center text-white font-display font-medium text-[14px]">{aggregatorProfile.avatar}</div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
