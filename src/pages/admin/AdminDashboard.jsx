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
      <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-7">

        {/* Greeting */}
        <div>
          <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Good morning, {adminProfile.name.split(' ')[0]} 👋</h2>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{today} · Platform overview</p>
        </div>

        {/* KYC alert banner */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-clay-500/10 border border-clay-500/25">
          <div className="w-10 h-10 rounded-xl bg-clay-500 flex items-center justify-center text-white shrink-0">
            <UserCheck size={18} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium text-clay-700 dark:text-clay-300">27 KYC submissions pending review — 3 flagged</p>
            <p className="text-[13px] text-clay-600/70 dark:text-clay-400/70 mt-0.5">Oldest submission is 3 days old. Review needed to keep verification SLA.</p>
          </div>
          <Link to="/admin/kyc" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-clay-500 text-white text-[13.5px] font-medium hover:bg-clay-600 transition-colors">
            Review now <ArrowRight size={14} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platformStats.map(s => <StatCard key={s.label} stat={s} />)}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* User growth */}
          <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-[15px] text-[var(--text)]">User growth</h3>
              <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
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
          <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-[15px] text-[var(--text)]">Monthly orders</h3>
              <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
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
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <h3 className="font-medium text-[15px] text-[var(--text)]">Recent activity</h3>
            <span className="text-[13px] text-[var(--text-muted)]">Live feed</span>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentActivity.map(a => {
              const Icon = ACTIVITY_ICONS[a.type] ?? AlertTriangle
              return (
                <div key={a.id} className="flex items-start gap-4 px-6 py-4 hover:bg-[var(--bg-subtle)] transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${ACTIVITY_STYLE[a.status]}`}>
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[var(--text)]">{a.message}</p>
                  </div>
                  <span className="text-[12px] text-[var(--text-muted)] shrink-0 mt-0.5">{a.time}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
