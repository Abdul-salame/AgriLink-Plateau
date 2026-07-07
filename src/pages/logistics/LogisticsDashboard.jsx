import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, CheckCircle2, Truck, Clock, AlertTriangle, MapPin, Phone, Star, Hand } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import Button from '../../components/Button'
import { logisticsProfile, logisticsStats, deliveryRequests, activeDeliveries, completedDeliveries, earningsChart } from '../../data/logisticsData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

function StatCard({ stat }) {
  return (
    <div className={`bg-[var(--bg)] rounded-2xl border p-5 flex flex-col gap-3 ${stat.trend==='alert'?'border-clay-300 dark:border-clay-700':'border-[var(--border)]'}`}>
      {stat.trend==='alert'&&<div className="flex items-center gap-1.5 text-clay-500 text-[12px] font-medium"><AlertTriangle size={13}/>Needs action</div>}
      <p className="text-[13px] text-[var(--text-muted)]">{stat.label}</p>
      <p className={`font-display text-[28px] font-medium leading-none ${stat.trend==='alert'?'text-clay-500':'text-navy-700 dark:text-navy-100'}`}>{stat.value}</p>
      <p className={`text-[12.5px] flex items-center gap-1 ${stat.trend==='up'?'text-green-600 dark:text-green-400':stat.trend==='alert'?'text-clay-500':'text-[var(--text-muted)]'}`}>
        {stat.trend==='up'&&<TrendingUp size={13}/>}{stat.sub}
      </p>
    </div>
  )
}

const DELIVERY_STATUS = {
  in_transit: { label:'In transit', cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  picked_up:  { label:'Picked up',  cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function LogisticsDashboard() {
  const today = new Date().toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
  return (
    <LogisticsLayout title="Dashboard">
      <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-7">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100 flex items-center gap-2">Good morning, {logisticsProfile.contactName.split(' ')[0]}<Hand size={18} className="text-gold-500" /></h2>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">{today} · {logisticsProfile.name}</p>
          </div>
          <Button as={Link} to="/logistics/requests" variant="accent" size="md"><Truck size={16}/>View requests</Button>
        </div>

        {/* Vehicle info strip */}
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400"><Truck size={18} strokeWidth={2}/></div>
            <div>
              <p className="text-[14px] font-medium text-[var(--text)]">{logisticsProfile.vehicle}</p>
              <p className="text-[12.5px] text-[var(--text-muted)]">Plate: {logisticsProfile.plate}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[13.5px] text-[var(--text-muted)]"><MapPin size={14}/>{logisticsProfile.coverage}</div>
          <div className="flex items-center gap-1.5 text-[13.5px] text-[var(--text-muted)]"><TrendingUp size={14}/>₦{logisticsProfile.pricePerKm}/km base rate</div>
          <span className="ml-auto text-[12px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800">✓ Available</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {logisticsStats.map(s=><StatCard key={s.label} stat={s}/>)}
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
                    <linearGradient id="logGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#f97316" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                  <XAxis dataKey="month" tick={{fontSize:12,fill:'var(--text-muted)'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'var(--text-muted)'}} axisLine={false} tickLine={false} tickFormatter={v=>`₦${(v/1000).toFixed(0)}k`}/>
                  <Tooltip formatter={v=>[fmt(v),'Earned']} contentStyle={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,fontSize:13}}/>
                  <Area type="monotone" dataKey="earned" stroke="#f97316" strokeWidth={2} fill="url(#logGrad)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pending requests */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Pending requests</h3>
                <Link to="/logistics/requests" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">View all<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {deliveryRequests.slice(0,3).map(r=>(
                  <div key={r.id} className="px-6 py-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-navy-600 dark:text-gold-400 shrink-0"><Truck size={17} strokeWidth={2}/></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-medium text-[var(--text)]">{r.farmer}</p>
                      <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{r.produce} · {r.qty} · {r.distance}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]"><Clock size={11}/>{r.pickupDate}</span>
                        <span className="font-mono text-[12.5px] font-medium text-navy-700 dark:text-gold-400">{fmt(r.fee)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button className="px-3 py-1.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white text-[12.5px] font-medium transition-colors">Accept</button>
                      <a href={`tel:${r.phone}`} className="px-3 py-1.5 rounded-xl border border-[var(--border)] text-[var(--text-muted)] text-[12.5px] text-center hover:bg-[var(--bg-subtle)] transition-colors flex items-center justify-center gap-1"><Phone size={12}/>Call</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Active deliveries */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Active deliveries</h3>
                <Link to="/logistics/deliveries" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">All<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {activeDeliveries.map(d=>(
                  <div key={d.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="text-[14px] font-medium text-[var(--text)]">{d.produce}</p>
                        <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">{d.farmer} · {d.qty}</p>
                      </div>
                      <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full shrink-0 ${DELIVERY_STATUS[d.status]?.cls}`}>{DELIVERY_STATUS[d.status]?.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                      <MapPin size={11}/>{d.from} → {d.to}
                      <span className="ml-auto font-mono font-medium text-[12.5px] text-[var(--text)]">{fmt(d.fee)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent completed */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Recent completed</h3>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {completedDeliveries.slice(0,3).map(d=>(
                  <div key={d.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13.5px] font-medium text-[var(--text)]">{d.produce}</p>
                      <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{d.from} → {d.to} · {d.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-[13.5px] font-medium text-[var(--text)]">{fmt(d.fee)}</span>
                      <div className="flex gap-0.5">{[...Array(d.rating)].map((_,i)=><Star key={i} size={11} className="text-gold-400 fill-gold-400"/>)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LogisticsLayout>
  )
}
