import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, ShoppingBasket, Package, Bookmark, Star, CheckCircle2, Circle, Truck } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import BuyerLayout from '../../layouts/BuyerLayout'
import Button from '../../components/Button'
import { buyerProfile, buyerStats, buyerOrders, produceCatalogue, spendingChart } from '../../data/buyerData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_META = {
  pending:    { label:'Pending',    cls:'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',       icon:Circle       },
  confirmed:  { label:'Confirmed',  cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',       icon:CheckCircle2 },
  in_transit: { label:'In transit', cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',icon:Truck        },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',   icon:CheckCircle2 },
}

function StatusBadge({ status }) {
  const { label, cls, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending
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

function ProduceCard({ item }) {
  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) p-4 flex flex-col gap-3 hover:border-(--border-mid) transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-[20px] shrink-0">🌱</div>
        {item.verified && (
          <span className="text-[11px] font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">✓ Verified</span>
        )}
      </div>
      <div>
        <p className="text-[14.5px] font-medium text-(--text)">{item.produce}</p>
        <p className="text-[12.5px] text-(--text-muted) mt-0.5">{item.farmer} · {item.lga}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="text-gold-400 fill-gold-400" />
          <span className="text-[12px] text-(--text-muted)">{item.rating} ({item.reviews})</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[14px] font-medium text-navy-700 dark:text-gold-400">{fmt(item.price)}<span className="text-(--text-muted) font-normal text-[12px]">/{item.unit}</span></span>
        <Button as={Link} to="/buyer/browse" variant="primary" size="sm">Order</Button>
      </div>
    </div>
  )
}

export default function BuyerDashboard() {
  const today = new Date().toLocaleDateString('en-NG', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
  const recentOrders = buyerOrders.slice(0, 4)
  const recommended  = produceCatalogue.slice(0, 3)

  return (
    <BuyerLayout title="Dashboard">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-7">

        {/* Greeting */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Good morning, {buyerProfile.firstName} </h2>
            <p className="text-[14px] text-(--text-muted) mt-1">{today}</p>
          </div>
          <Button as={Link} to="/buyer/browse" variant="accent" size="md">
            <ShoppingBasket size={16} /> Browse produce
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {buyerStats.map(s => <StatCard key={s.label} stat={s} />)}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Spending chart */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-[15px] text-(--text)">Monthly spending</h3>
                <span className="text-[13px] text-(--text-muted)">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={spendingChart} margin={{ top:4, right:4, left:0, bottom:0 }}>
                  <defs>
                    <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1B3A7A" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1B3A7A" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fontSize:12, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:11, fill:'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v=>`₦${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={v=>[fmt(v),'Spent']} contentStyle={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:12, fontSize:13 }} />
                  <Area type="monotone" dataKey="spent" stroke="#1B3A7A" strokeWidth={2} fill="url(#spendGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent orders */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-(--border)">
                <h3 className="font-medium text-[15px] text-(--text)">Recent orders</h3>
                <Link to="/buyer/orders" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">View all <ArrowRight size={13} /></Link>
              </div>
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-(--bg-subtle) text-[12.5px] text-(--text-muted)">
                      <th className="font-medium px-6 py-3">Order</th>
                      <th className="font-medium px-6 py-3">Farmer</th>
                      <th className="font-medium px-6 py-3">Produce</th>
                      <th className="font-medium px-6 py-3">Amount</th>
                      <th className="font-medium px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o, i) => (
                      <tr key={o.id} className={`hover:bg-(--bg-subtle) transition-colors ${i < recentOrders.length-1 ? 'border-b border-(--border)' : ''}`}>
                        <td className="px-6 py-3.5 font-mono text-[13px] text-(--text-muted)">{o.id}</td>
                        <td className="px-6 py-3.5 text-[14px] font-medium text-(--text)">{o.farmer}</td>
                        <td className="px-6 py-3.5 text-[14px] text-(--text-muted)">{o.produce}</td>
                        <td className="px-6 py-3.5 font-mono text-[14px] text-(--text)">{fmt(o.amount)}</td>
                        <td className="px-6 py-3.5"><StatusBadge status={o.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile */}
              <div className="sm:hidden divide-y divide-(--border)">
                {recentOrders.map(o => (
                  <div key={o.id} className="px-5 py-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-(--text)">{o.farmer}</p>
                      <p className="text-[12.5px] text-(--text-muted) mt-0.5">{o.produce} · {o.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono text-[14px] font-medium text-(--text)">{fmt(o.amount)}</span>
                      <StatusBadge status={o.status} />
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
                  { label:'Browse produce', icon:ShoppingBasket, path:'/buyer/browse',   accent:true  },
                  { label:'My orders',      icon:Package,        path:'/buyer/orders'                 },
                  { label:'Saved listings', icon:Bookmark,       path:'/buyer/saved'                  },
                  { label:'Market prices',  icon:TrendingUp,     path:'/buyer/prices'                 },
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

            {/* Recommended produce */}
            <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-(--border)">
                <h3 className="font-medium text-[15px] text-(--text)">Recommended for you</h3>
                <Link to="/buyer/browse" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">See all <ArrowRight size={13} /></Link>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {recommended.map(p => <ProduceCard key={p.id} item={p} />)}
              </div>
            </div>

            {/* Pending deliveries alert */}
            <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <Truck size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-[13.5px] font-medium text-blue-800 dark:text-blue-300">3 deliveries in progress</p>
                <p className="text-[12.5px] text-blue-700/70 dark:text-blue-500 mt-0.5">1 order arriving tomorrow from Danjuma Pwajok.</p>
                <Link to="/buyer/orders" className="text-[12.5px] text-navy-600 dark:text-gold-400 font-medium hover:underline mt-1 inline-block">Track orders →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BuyerLayout>
  )
}
