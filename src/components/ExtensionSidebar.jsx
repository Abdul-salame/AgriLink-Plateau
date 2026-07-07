import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShieldCheck, Users, Newspaper, Settings, LogOut, Sprout, ChevronRight } from 'lucide-react'
import { extensionProfile } from '../data/extensionData'

const NAV = [
  { label: 'Dashboard',          icon: LayoutDashboard, path: '/extension/dashboard'      },
  { label: 'Farm Verifications', icon: ShieldCheck,     path: '/extension/verifications', badge: 7 },
  { label: 'Farmers I Support',  icon: Users,           path: '/extension/farmers'        },
  { label: 'Advisories',         icon: Newspaper,       path: '/extension/advisories'     },
  { label: 'Settings',           icon: Settings,        path: '/extension/settings'       },
]

function NavItem({ item, collapsed }) {
  const { pathname } = useLocation()
  const active = pathname === item.path
  return (
    <Link to={item.path}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group
        ${active ? 'bg-navy-600 text-white' : 'text-navy-300 hover:bg-navy-800 hover:text-white'}`}>
      <item.icon size={18} strokeWidth={2} className="shrink-0" />
      {!collapsed && <span className="text-[14px] font-medium flex-1">{item.label}</span>}
      {!collapsed && item.badge && <span className="text-[11px] font-bold bg-gold-400 text-navy-900 rounded-full px-1.5 py-0.5 min-w-[20px] text-center">{item.badge}</span>}
      {collapsed && item.badge && <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-gold-400 text-navy-900 rounded-full flex items-center justify-center">{item.badge}</span>}
      {collapsed && <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-navy-900 text-white text-[13px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-navy-700">{item.label}</div>}
    </Link>
  )
}

export default function ExtensionSidebar({ mobileOpen, setMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-navy-900 border-r border-navy-800 transition-all duration-300 lg:relative lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${collapsed ? 'w-[68px]' : 'w-[240px]'}`}>
        <div className={`flex items-center h-16 border-b border-navy-800 px-4 shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-400 text-navy-900 shrink-0"><Sprout size={16} strokeWidth={2.25} /></div>
          {!collapsed && <div><p className="font-display text-[16px] font-medium text-white leading-tight">AgriLink</p><p className="text-[11px] text-teal-400 font-medium uppercase tracking-wide">Extension</p></div>}
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-1">
          {NAV.map(item => <NavItem key={item.path} item={item} collapsed={collapsed} />)}
        </nav>
        {!collapsed && (
          <div className="px-3 py-3 mx-2 mb-2 rounded-xl bg-navy-800 border border-navy-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white font-display font-medium text-[14px] shrink-0">{extensionProfile.avatar}</div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white truncate">{extensionProfile.firstName}</p>
                <p className="text-[11.5px] text-navy-400 truncate">Extension Worker</p>
              </div>
              <span className="text-[10px] font-medium bg-green-900/60 text-green-400 px-1.5 py-0.5 rounded-full border border-green-800 shrink-0">✓ KYC</span>
            </div>
          </div>
        )}
        <div className="px-2 pb-4 border-t border-navy-800 pt-3">
          <Link to="/auth/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-navy-300 hover:bg-navy-800 hover:text-white transition-all">
            <LogOut size={18} strokeWidth={2} className="shrink-0" />
            {!collapsed && <span className="text-[14px] font-medium">Log out</span>}
          </Link>
        </div>
        <button onClick={() => setCollapsed(v => !v)} className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy-800 border border-navy-700 items-center justify-center text-navy-400 hover:text-white hover:bg-navy-700 transition-all">
          <ChevronRight size={13} className={`transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </aside>
    </>
  )
}
