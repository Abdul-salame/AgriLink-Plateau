import { NavLink } from 'react-router-dom'
import { LayoutGrid, MessageSquareWarning, ShieldCheck, X } from 'lucide-react'
import { adminProfile } from '../data/adminData'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/admin/disputes', label: 'Disputes', icon: MessageSquareWarning },
  { to: '/admin/kyc', label: 'KYC Review', icon: ShieldCheck },
]

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-[var(--border)] bg-[var(--bg)] p-5 transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between lg:justify-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">Agrilink</p>
            <h2 className="mt-1 font-display text-[20px] font-medium text-navy-700 dark:text-navy-100">Admin Panel</h2>
          </div>
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] lg:hidden">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-600 text-sm font-semibold text-gold-300">
              {adminProfile.avatar}
            </div>
            <div>
              <p className="text-[14px] font-medium text-[var(--text)]">{adminProfile.name}</p>
              <p className="text-[12px] text-[var(--text-muted)]">{adminProfile.role}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors ${isActive ? 'bg-navy-600 text-white' : 'text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]'}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
    </>
  )
}
