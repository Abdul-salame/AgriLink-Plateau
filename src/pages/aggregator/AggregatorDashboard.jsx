import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, Plus, CheckCircle2, Users, Eye, Tag, Truck, Circle, Hand } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import AggregatorLayout from '../../layouts/AggregatorLayout'
import Button from '../../components/Button'
import { aggregatorProfile, aggregatorStats, farmerNetwork, bulkListings, aggregatorOrders, earningsChart } from '../../data/aggregatorData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_META = {
  pending:    { label:'Pending',    cls:'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',        icon: Circle      },
  confirmed:  { label:'Confirmed',  cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',        icon: CheckCircle2 },
  in_transit: { label:'In transit', cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: Truck        },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',    icon: CheckCircle2 },
}

function StatusBadge({ status }) {
  const { label, cls, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending
  return <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${cls}`}><Icon size={11} strokeWidth={2.5}/>{label}</span>
}

function StatCard({ stat }) {
  return (
    <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-3">
      <p className="text-[13px] text-[var(--text-muted)]">{stat.label}</p>
      <p className="font-display text-[28px] font-medium text-navy-700 dark:text-navy-100 leading-none">{stat.value}</p>
      <p className={`text-[12.5px] flex items-center gap-1 ${stat.trend==='up'?'text-green-600 dark:text-green-400':'text-[var(--text-muted)]'}`}>
        {stat.trend==='up'&&<TrendingUp size={13}/>}{stat.sub}
      </p>
    </div>
  )
}

export default function AggregatorDashboard() {
  const today = new Date().toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
  return (
    <AggregatorLayout title="Dashboard">
      <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-7">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100 flex items-center gap-2">Good morning, {aggregatorProfile.firstName}<Hand size={18} className="text-gold-500" /></h2>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">{today} · {aggregatorProfile.businessName}</p>
          </div>
          <Button as={Link} to="/aggregator/listings" variant="accent" size="md"><Plus size={16}/>New bulk listing</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {aggregatorStats.map(s=><StatCard key={s.label} stat={s}/>)}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">

            {/* Earnings chart */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Monthly earnings</h3>
                <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={earningsChart} margin={{top:4,right:4,left:0,bottom:0}}>
                  <defs>
                    <linearGradient id="aggGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1B3A7A" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#1B3A7A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                  <XAxis dataKey="month" tick={{fontSize:12,fill:'var(--text-muted)'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'var(--text-muted)'}} axisLine={false} tickLine={false} tickFormatter={v=>`₦${(v/1000).toFixed(0)}k`}/>
                  <Tooltip formatter={v=>[fmt(v),'Earnings']} contentStyle={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,fontSize:13}}/>
                  <Area type="monotone" dataKey="earnings" stroke="#1B3A7A" strokeWidth={2} fill="url(#aggGrad)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Recent orders */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Recent orders</h3>
                <Link to="/aggregator/orders" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">View all<ArrowRight size={13}/></Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
                    <th className="font-medium px-6 py-3">Order</th>
                    <th className="font-medium px-6 py-3">Buyer</th>
                    <th className="font-medium px-6 py-3 hidden sm:table-cell">Produce</th>
                    <th className="font-medium px-6 py-3">Amount</th>
                    <th className="font-medium px-6 py-3">Status</th>
                  </tr></thead>
                  <tbody>
                    {aggregatorOrders.map((o,i)=>(
                      <tr key={o.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i<aggregatorOrders.length-1?'border-b border-[var(--border)]':''}`}>
                        <td className="px-6 py-3.5 font-mono text-[13px] text-[var(--text-muted)]">{o.id}</td>
                        <td className="px-6 py-3.5 text-[14px] font-medium text-[var(--text)]">{o.buyer}</td>
                        <td className="px-6 py-3.5 text-[14px] text-[var(--text-muted)] hidden sm:table-cell">{o.produce}</td>
                        <td className="px-6 py-3.5 font-mono text-[14px] text-[var(--text)]">{fmt(o.amount)}</td>
                        <td className="px-6 py-3.5"><StatusBadge status={o.status}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="space-y-6">

            {/* Quick actions */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium text-[15px] text-[var(--text)] mb-4">Quick actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:'New listing',    icon:Plus,       path:'/aggregator/listings', accent:true},
                  {label:'My orders',      icon:Truck,      path:'/aggregator/orders'},
                  {label:'Farmer network', icon:Users,      path:'/aggregator/farmers'},
                  {label:'Market prices',  icon:TrendingUp, path:'/aggregator/prices'},
                ].map(a=>(
                  <Link key={a.label} to={a.path} className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all text-center ${a.accent?'bg-navy-600 border-navy-600 text-white hover:bg-navy-700':'border-[var(--border)] text-[var(--text)] hover:border-[var(--border-mid)] hover:bg-[var(--bg-subtle)]'}`}>
                    <a.icon size={18} strokeWidth={2}/>
                    <span className="text-[13px] font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Farmer network preview */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Farmer network</h3>
                <Link to="/aggregator/farmers" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">All {farmerNetwork.length}<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {farmerNetwork.slice(0,4).map(f=>(
                  <div key={f.id} className="flex items-center gap-3 px-5 py-3.5">
                    <div className="w-9 h-9 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[13px] shrink-0">{f.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[var(--text)] truncate">{f.name}</p>
                      <p className="text-[12px] text-[var(--text-muted)] truncate">{f.produce} · {f.lga}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {f.verified&&<span className="text-[10px] font-medium text-green-600 dark:text-green-400">✓ Verified</span>}
                      <span className="text-[11px] text-[var(--text-muted)]">{f.commission}% comm.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active bulk listings */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Bulk listings</h3>
                <Link to="/aggregator/listings" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">Manage<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {bulkListings.filter(l=>l.status==='active').map(l=>(
                  <div key={l.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-[var(--text)]">{l.produce}</p>
                      <div className="flex gap-3 mt-0.5">
                        <span className="text-[12px] text-[var(--text-muted)] flex items-center gap-1"><Eye size={11}/>{l.views}</span>
                        <span className="text-[12px] text-[var(--text-muted)] flex items-center gap-1"><Tag size={11}/>{fmt(l.price)}/{l.unit}</span>
                      </div>
                    </div>
                    {l.offers>0&&<span className="text-[11.5px] font-medium bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-2 py-0.5 rounded-full">{l.offers} offers</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AggregatorLayout>
  )
}
