import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, AlertTriangle, UserCheck, ShoppingCart, Users } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import AdminLayout from '../../layouts/AdminLayout'
import { platformStats, userGrowthChart, orderVolumeChart, recentActivity, adminProfile } from '../../data/adminData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const ACTIVITY_STYLE = {
  pending: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  info:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  alert:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  danger:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const ACTIVITY_ICONS = { kyc: UserCheck, order: ShoppingCart, user: Users, dispute: AlertTriangle, listing: TrendingUp }

function StatCard({ stat }) {
  return (
    <div className={`bg-[var(--bg)] rounded-2xl border p-5 flex flex-col gap-3 ${stat.trend === 'alert' ? 'border-clay-300 dark:border-clay-700' : 'border-[var(--border)]'}`}>
      {stat.trend === 'alert' && (
        <div className="flex items-center gap-1.5 text-clay-500 text-[12px] font-medium">
          <AlertTriangle size={13} /> Needs attention
        </div>
      )}
      <p className="text-[13px] text-[var(--text-muted)]">{stat.label}</p>
      <p className={`font-display text-[28px] font-medium leading-none ${stat.trend === 'alert' ? 'text-clay-500' : 'text-navy-700 dark:text-navy-100'}`}>{stat.value}</p>
      <p className={`text-[12.5px] flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : stat.trend === 'alert' ? 'text-clay-500' : 'text-[var(--text-muted)]'}`}>
        {stat.trend === 'up' && <TrendingUp size={13} />}{stat.sub}
      </p>
    </div>
  )
}

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('en-NG', { weekday:'long', day:'numeric', month:'long', year:'numeric' })

  return (
    <AdminLayout title="Dashboard">
      <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8 max-w-[1280px] mx-auto space-y-5 sm:space-y-6 lg:space-y-7">

        {/* Greeting */}
        <div>
          <h2 className="font-display text-[22px] sm:text-[26px] font-medium text-navy-700 dark:text-navy-100">Good morning, {adminProfile.name.split(' ')[0]} 👋</h2>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{today} · Platform overview</p>
        </div>

        {/* KYC alert banner */}
        <div className="flex flex-col gap-3 rounded-2xl border border-clay-500/25 bg-clay-500/10 p-4 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-clay-500 flex items-center justify-center text-white shrink-0">
              <UserCheck size={18} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-clay-700 dark:text-clay-300">27 KYC submissions pending review — 3 flagged</p>
              <p className="text-[13px] text-clay-600/70 dark:text-clay-400/70 mt-0.5">Oldest submission is 3 days old. Review needed to keep verification SLA.</p>
            </div>
          </div>
          <Link to="/admin/kyc" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-clay-500 px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-clay-600 sm:shrink-0">
            Review now <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {platformStats.map(s => <StatCard key={s.label} stat={s} />)}
        </div>

        {/* Charts */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* User growth */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="font-medium text-[15px] text-[var(--text)]">User growth</h3>
              <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={userGrowthChart} margin={{ top:4, right:4, left:0, bottom:0 }}>
                <defs>
                  <linearGradient id="farmerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1B3A7A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1B3A7A" stopOpacity={0}   />
                  </linearGradient>
                  <linearGradient id="buyerGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EFBA3A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EFBA3A" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:11, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:12, fontSize:13 }} />
                <Legend wrapperStyle={{ fontSize:13 }} />
                <Area type="monotone" dataKey="farmers" name="Farmers" stroke="#1B3A7A" strokeWidth={2} fill="url(#farmerGrad)" />
                <Area type="monotone" dataKey="buyers"  name="Buyers"  stroke="#EFBA3A" strokeWidth={2} fill="url(#buyerGrad)"  />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Order volume */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="font-medium text-[15px] text-[var(--text)]">Monthly orders</h3>
              <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={orderVolumeChart} margin={{ top:4, right:4, left:0, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:11, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:12, fontSize:13 }} />
                <Bar dataKey="orders" name="Orders" fill="#1B3A7A" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent activity */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]">
          <div className="flex flex-col gap-2 border-b border-[var(--border)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <h3 className="font-medium text-[15px] text-[var(--text)]">Recent activity</h3>
            <span className="text-[13px] text-[var(--text-muted)]">Live feed</span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentActivity.map(a => {
              const Icon = ACTIVITY_ICONS[a.type] ?? AlertTriangle
              return (
                <div key={a.id} className="flex flex-col gap-3 px-4 py-4 hover:bg-[var(--bg-subtle)] transition-colors sm:flex-row sm:items-start sm:gap-4 sm:px-6">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${ACTIVITY_STYLE[a.status]}`}>
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[var(--text)]">{a.message}</p>
                  </div>
                  <span className="text-[12px] text-[var(--text-muted)] shrink-0">{a.time}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
