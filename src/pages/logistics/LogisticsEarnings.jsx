import { useState } from 'react'
import { Star } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import { completedDeliveries, earningsChart } from '../../data/logisticsData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

export default function LogisticsEarnings() {
  const total = completedDeliveries.reduce((s,d)=>s+d.fee,0)
  const avgRating = (completedDeliveries.reduce((s,d)=>s+d.rating,0)/completedDeliveries.length).toFixed(1)

  return (
    <LogisticsLayout title="Earnings">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Earnings</h1>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-7">
          {[
            { label:'Total earned',    value:fmt(total),      color:'text-navy-700 dark:text-navy-100' },
            { label:'This month',      value:fmt(180000),     color:'text-navy-700 dark:text-navy-100' },
            { label:'Average rating',  value:`${avgRating} ★`, color:'text-gold-600 dark:text-gold-400' },
          ].map(s=>(
            <div key={s.label} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5">
              <p className="text-[13px] text-[var(--text-muted)] mb-2">{s.label}</p>
              <p className={`font-display text-[26px] font-medium ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 mb-6">
          <h3 className="font-medium text-[15px] text-[var(--text)] mb-6">Monthly earnings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={earningsChart} margin={{top:4,right:4,left:0,bottom:0}}>
              <defs>
                <linearGradient id="logEarnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
              <XAxis dataKey="month" tick={{fontSize:12,fill:'var(--text-muted)'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'var(--text-muted)'}} axisLine={false} tickLine={false} tickFormatter={v=>`₦${(v/1000).toFixed(0)}k`}/>
              <Tooltip formatter={v=>[fmt(v),'Earned']} contentStyle={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,fontSize:13}}/>
              <Area type="monotone" dataKey="earned" stroke="#f97316" strokeWidth={2} fill="url(#logEarnGrad)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)]"><h3 className="font-medium text-[15px] text-[var(--text)]">Delivery history</h3></div>
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
              <th className="font-medium px-6 py-3">Delivery</th>
              <th className="font-medium px-6 py-3 hidden sm:table-cell">Route</th>
              <th className="font-medium px-6 py-3">Date</th>
              <th className="font-medium px-6 py-3">Rating</th>
              <th className="font-medium px-6 py-3 text-right">Earned</th>
            </tr></thead>
            <tbody>
              {completedDeliveries.map((d,i)=>(
                <tr key={d.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i<completedDeliveries.length-1?'border-b border-[var(--border)]':''}`}>
                  <td className="px-6 py-3.5 text-[14px] font-medium text-[var(--text)]">{d.produce}</td>
                  <td className="px-6 py-3.5 text-[13.5px] text-[var(--text-muted)] hidden sm:table-cell">{d.from} → {d.to}</td>
                  <td className="px-6 py-3.5 text-[13px] text-[var(--text-muted)]">{d.date}</td>
                  <td className="px-6 py-3.5"><div className="flex gap-0.5">{[...Array(d.rating)].map((_,i)=><Star key={i} size={12} className="text-gold-400 fill-gold-400"/>)}</div></td>
                  <td className="px-6 py-3.5 font-mono text-[14px] text-right font-medium text-[var(--text)]">{fmt(d.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </LogisticsLayout>
  )
}
