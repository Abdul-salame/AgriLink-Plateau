import { useState } from 'react'
import { Menu, Bell } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'
import { adminProfile } from '../data/adminData'

export default function AdminLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-subtle)]">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-[var(--bg)] border-b border-[var(--border)] flex items-center gap-4 px-6 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden text-[var(--text-muted)] p-1 -ml-1"><Menu size={22} /></button>
          {title && <h1 className="font-display text-[20px] font-medium text-navy-700 dark:text-navy-100 hidden sm:block">{title}</h1>}
          <div className="flex-1" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-clay-500/10 border border-clay-500/20">
            <span className="w-2 h-2 rounded-full bg-clay-500 animate-pulse" />
            <span className="text-[12.5px] font-medium text-clay-600 dark:text-clay-400">Admin panel</span>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-clay-500" />
          </button>
          <div className="w-9 h-9 rounded-full bg-clay-500 flex items-center justify-center text-white font-display font-medium text-[14px]">{adminProfile.avatar}</div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
