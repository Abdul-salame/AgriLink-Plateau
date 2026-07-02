import { useState } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import BuyerSidebar from '../components/BuyerSidebar'
import { buyerProfile } from '../data/buyerData'

export default function BuyerLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-subtle)]">
      <BuyerSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-[var(--bg)] border-b border-[var(--border)] flex items-center gap-4 px-6 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text)] p-1 -ml-1">
            <Menu size={22} />
          </button>
          {title && <h1 className="font-display text-[20px] font-medium text-navy-700 dark:text-navy-100 hidden sm:block">{title}</h1>}
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-muted)] text-[14px] min-w-[200px]">
            <Search size={14} /><span>Search…</span>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--border-mid)] transition-all">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400" />
          </button>
          <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[14px] cursor-pointer">
            {buyerProfile.avatar}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
