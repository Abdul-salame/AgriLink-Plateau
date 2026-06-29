import { Link } from 'react-router-dom'
import {
  TrendingUp, TrendingDown, Minus, Plus, ArrowRight,
  Eye, Tag, Calendar, Package, Truck, Clock, CheckCircle2, Circle,
  Hand, Leaf,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import FarmerLayout from '../../layouts/FarmerLayout'
import Button from '../../components/Button'
import {
  farmerProfile, farmerStats, recentOrders, activeListings,
  upcomingHarvests, priceSnapshot, earningsChart, ordersChart,
} from '../../data/farmerData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

function StatusBadge({ status }) {
  const map = {
    pending:    { label: 'Pending',    cls: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',         icon: Circle       },
    confirmed:  { label: 'Confirmed',  cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',         icon: CheckCircle2 },
    in_transit: { label: 'In transit', cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: Truck        },
    delivered:  { label: 'Delivered',  cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',     icon: CheckCircle2 },
  }
  const { label, cls, icon: Icon } = map[status] ?? map.pending
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${cls}`}>
      <Icon size={11} strokeWidth={2.5} />{label}
    </span>
  )
}

function StatCard({ stat }) {
  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) p-5 flex flex-col gap-3">
      <p className="text-[13px] text-(--text-muted)">{stat.label}</p>
      <p className="font-display text-[28px] font-medium text-navy-700 dark:text-navy-100 leading-none">{stat.value}</p>
      <p className={`text-[12.5px] flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-(--text-muted)'}`}>
        {stat.trend === 'up' && <TrendingUp size={13} />}{stat.sub}
      </p>
    </div>
  )
}

function PriceRow({ item }) {
  const up = item.change > 0; const flat = item.change === 0
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-(--border) last:border-0">
      <span className="text-[14px] text-(--text)">{item.crop}</span>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[13.5px] text-(--text)">{fmt(item.price)}</span>
        <span className={`flex items-center gap-1 font-mono text-[12.5px] w-16 justify-end ${flat ? 'text-(--text-muted)' : up ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {flat ? <Minus size={12} /> : up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {flat ? '0.0%' : `${Math.abs(item.change)}%`}
        </span>
      </div>
    </div>
  )
}

function HarvestUrgency({ days }) {
  if (days <= 3) return <span className="text-[11px] font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">{days}d left</span>
  if (days <= 7) return <span className="text-[11px] font-medium text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/20 px-2 py-0.5 rounded-full">{days}d left</span>
  return <span className="text-[11px] font-medium text-(--text-muted) bg-(--bg-subtle) px-2 py-0.5 rounded-full">{days}d left</span>
}

/* custom tooltip for earnings chart */
function EarningsTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-(--bg) border border-(--border) rounded-xl px-4 py-3 shadow-lg">
      <p className="text-[12px] text-(--text-muted) mb-1">{label}</p>
      <p className="font-mono text-[14px] font-medium text-navy-700 dark:text-navy-100">{fmt(payload[0].value)}</p>
    </div>
  )
}

function OrdersTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-(--bg) border border-(--border) rounded-xl px-4 py-3 shadow-lg">
      <p className="text-[12px] text-(--text-muted) mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-[13px] font-medium" style={{ color: p.color }}>
          {p.name === 'completed' ? 'Completed' : 'Pending'}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function FarmerDashboard() {
  const today = new Date().toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <FarmerLayout title="Dashboard">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-7">

        {/* Greeting */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100 flex items-center gap-2">
              
              Good morning, {farmerProfile.name}
              <Hand size={50} className="text-gold-500" />
            </h2>
            <p className="text-[14px] text-(--text-muted) mt-1">{today}</p>
          </div>
          <Button as={Link} to="/farmer/listings/new" variant="accent" size="md">
            <Plus size={16} /> Add new listing
          </Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {farmerStats.map(s => <StatCard key={s.label} stat={s} />)}
        </div>

        {/* ── Charts row ── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Earnings area chart */}
          <div className="bg-(--bg) rounded-2xl border border-(--border) p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[14px] font-medium text-(--text)">Earnings over time</p>
                <p className="text-[12.5px] text-(--text-muted) mt-0.5">Jan – Jun 2026</p>
              </div>
              <span className="text-[12px] font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">
                ↑ 27% vs last period
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={earningsChart} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1B3A7A" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#1B3A7A" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false}
                  tickFormatter={v => `₦${(v / 1000).toFixed(0)}k`} width={48} />
                <Tooltip content={<EarningsTooltip />} cursor={{ stroke: '#1B3A7A', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="earnings" stroke="#1B3A7A" strokeWidth={2.5}
                  fill="url(#earningsGrad)" dot={{ r: 4, fill: '#1B3A7A', strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#EFBA3A', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Orders bar chart */}
          <div className="bg-(--bg) rounded-2xl border border-(--border) p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[14px] font-medium text-(--text)">Orders by month</p>
                <p className="text-[12.5px] text-(--text-muted) mt-0.5">Completed vs pending</p>
              </div>
              <div className="flex items-center gap-4 text-[12px] text-(--text-muted)">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-navy-600 inline-block" />Completed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold-400 inline-block" />Pending</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ordersChart} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} width={28} />
                <Tooltip content={<OrdersTooltip />} cursor={{ fill: 'var(--bg-subtle)' }} />
                <Bar dataKey="completed" fill="#1B3A7A" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="pending"   fill="#EFBA3A" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Main 2-col grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Recent orders */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">
                <h3 className="font-medium text-[15px] text-(--text)">Recent orders</h3>
                <Link to="/farmer/orders" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">
                  View all <ArrowRight size={13} />
                </Link>
              </div>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[12.5px] text-(--text-muted) bg-(--bg-subtle)">
                      <th className="font-medium px-6 py-3">Order</th>
                      <th className="font-medium px-6 py-3">Buyer</th>
                      <th className="font-medium px-6 py-3">Produce</th>
                      <th className="font-medium px-6 py-3">Amount</th>
                      <th className="font-medium px-6 py-3">Status</th>
                      <th className="font-medium px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o, i) => (
                      <tr key={o.id} className={`hover:bg-(--bg-subtle) transition-colors ${i !== recentOrders.length - 1 ? 'border-b border-(--border)' : ''}`}>
                        <td className="px-6 py-3.5 font-mono text-[13px] text-(--text-muted)">{o.id}</td>
                        <td className="px-6 py-3.5 text-[14px] font-medium text-(--text)">{o.buyer}</td>
                        <td className="px-6 py-3.5 text-[14px] text-(--text-muted)">{o.produce}</td>
                        <td className="px-6 py-3.5 font-mono text-[14px] text-(--text)">{fmt(o.amount)}</td>
                        <td className="px-6 py-3.5"><StatusBadge status={o.status} /></td>
                        <td className="px-6 py-3.5 text-[13px] text-(--text-muted)">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="sm:hidden divide-y divide-(--border)">
                {recentOrders.map(o => (
                  <div key={o.id} className="px-5 py-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-(--text)">{o.buyer}</p>
                      <p className="text-[12.5px] text-(--text-muted) mt-0.5">{o.produce} · {o.qty}</p>
                      <p className="text-[12px] text-(--text-muted) mt-0.5">{o.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-[14px] font-medium text-(--text)">{fmt(o.amount)}</span>
                      <StatusBadge status={o.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active listings */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">
                <h3 className="font-medium text-[15px] text-(--text)">Active listings</h3>
                <Link to="/farmer/listings" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">
                  Manage all <ArrowRight size={13} />
                </Link>
              </div>
              <div className="divide-y divide-(--border)">
                {activeListings.map(l => (
                  <div key={l.id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center shrink-0 text-green-600 dark:text-green-400">
                      <Leaf size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-medium text-(--text)">{l.produce}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <span className="flex items-center gap-1 text-[12.5px] text-(--text-muted)"><Package size={12} />{l.qty}</span>
                        <span className="flex items-center gap-1 text-[12.5px] text-(--text-muted)"><Tag size={12} />{fmt(l.price)}/{l.unit}</span>
                        <span className="flex items-center gap-1 text-[12.5px] text-(--text-muted)"><Calendar size={12} />Harvest {l.harvestDate}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="flex items-center gap-1 text-[12.5px] text-(--text-muted)"><Eye size={12} />{l.views}</span>
                      {l.offers > 0 && (
                        <span className="text-[11.5px] font-medium bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full">
                          {l.offers} offer{l.offers > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Quick actions */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) p-5">
              <h3 className="font-medium text-[15px] text-(--text) mb-4">Quick actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'New listing',   icon: Plus,       path: '/farmer/listings/new', accent: true },
                  { label: 'View orders',   icon: Package,    path: '/farmer/orders'                     },
                  { label: 'Get logistics', icon: Truck,      path: '/farmer/logistics'                  },
                  { label: 'Market prices', icon: TrendingUp, path: '/farmer/prices'                     },
                ].map(a => (
                  <Link key={a.label} to={a.path}
                    className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all text-center
                      ${a.accent ? 'bg-navy-600 border-navy-600 text-white hover:bg-navy-700' : 'border-(--border) text-(--text) hover:border-(--border-mid) hover:bg-(--bg-subtle)'}`}>
                    <a.icon size={18} strokeWidth={2} />
                    <span className="text-[13px] font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming harvests */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-(--border)">
                <Clock size={15} className="text-gold-500" />
                <h3 className="font-medium text-[15px] text-(--text)">Upcoming harvests</h3>
              </div>
              <div className="divide-y divide-(--border)">
                {upcomingHarvests.map(h => (
                  <div key={h.produce + h.field} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-(--text)">{h.produce}</p>
                      <p className="text-[12.5px] text-(--text-muted)">{h.field} · {h.qty}</p>
                    </div>
                    <HarvestUrgency days={h.daysLeft} />
                  </div>
                ))}
              </div>
            </div>

            {/* Price snapshot */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
                <h3 className="font-medium text-[15px] text-(--text)">Market prices</h3>
                <Link to="/farmer/prices" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">
                  Full board <ArrowRight size={13} />
                </Link>
              </div>
              <div className="px-5 py-2">
                {priceSnapshot.map(p => <PriceRow key={p.crop} item={p} />)}
              </div>
              <p className="px-5 py-3 text-[11.5px] text-(--text-muted) border-t border-(--border)">
                Updated today · Plateau State local markets
              </p>
            </div>

            {/* KYC badge */}
            <div className="flex gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-[13.5px] font-medium text-green-800 dark:text-green-300">Identity verified</p>
                <p className="text-[12.5px] text-green-700/70 dark:text-green-500 mt-0.5">
                  Your NIN and documents have been confirmed. Buyers can see your verified badge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FarmerLayout>
  )
}
