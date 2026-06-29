import { useState } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import FarmerSidebar from '../components/FarmerSidebar'
import { farmerProfile } from '../data/farmerData'

export default function FarmerLayout({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-(--bg-subtle)">
      <FarmerSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-16 bg-(--bg) border-b border-(--border) flex items-center gap-4 px-6 shrink-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-(--text-muted) hover:text-(--text) transition-colors p-1 -ml-1"
          >
            <Menu size={22} />
          </button>

          {/* Page title */}
          {title && (
            <h1 className="font-display text-[20px] font-medium text-navy-700 dark:text-navy-100 hidden sm:block">
              {title}
            </h1>
          )}

          <div className="flex-1" />

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 h-9 px-3.5 rounded-xl border border-(--border) bg-(--bg-subtle) text-(--text-muted) text-[14px] min-w-50">
            <Search size={14} />
            <span>Search…</span>
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-(--border) text-(--text-muted) hover:text-(--text) hover:border-(--border-mid) transition-all">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[14px] cursor-pointer">
            {farmerProfile.avatar}
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
