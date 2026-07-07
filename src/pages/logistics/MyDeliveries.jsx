import { useState } from 'react'
import { MapPin, CheckCircle2, Truck, Package } from 'lucide-react'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import { activeDeliveries, completedDeliveries } from '../../data/logisticsData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }
const STATUS_STYLE = {
  in_transit:{ label:'In transit', cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  picked_up: { label:'Picked up',  cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered: { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function MyDeliveries() {
  const [tab, setTab] = useState('active')
  return (
    <LogisticsLayout title="My Deliveries">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">My deliveries</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{activeDeliveries.length} active · {completedDeliveries.length} completed</p>
        </div>
        <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1 mb-6 w-fit">
          {[['active','Active'],['completed','Completed']].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)} className={`px-5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${tab===v?'bg-navy-600 text-white':'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>{l}</button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {tab==='active' ? activeDeliveries.map(d=>(
            <div key={d.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[15px] font-medium text-[var(--text)]">{d.produce}</p>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{d.farmer} · {d.qty}</p>
                </div>
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLE[d.status]?.cls}`}>{STATUS_STYLE[d.status]?.label}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)]">
                <MapPin size={13}/>{d.from} → {d.to}
                <span className="ml-auto font-mono font-medium text-[var(--text)]">{fmt(d.fee)}</span>
              </div>
              <button className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium transition-colors">
                <CheckCircle2 size={14}/> Mark as delivered
              </button>
            </div>
          )) : completedDeliveries.map(d=>(
            <div key={d.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0"><CheckCircle2 size={18} strokeWidth={2}/></div>
              <div className="flex-1 min-w-0">
                <p className="text-[14.5px] font-medium text-[var(--text)]">{d.produce}</p>
                <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">{d.from} → {d.to} · {d.date}</p>
              </div>
              <span className="font-mono font-medium text-[14px] text-[var(--text)] shrink-0">{fmt(d.fee)}</span>
            </div>
          ))}
        </div>
      </div>
    </LogisticsLayout>
  )
}
