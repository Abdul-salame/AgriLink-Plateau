import { useState } from 'react'
import { CheckCircle2, Circle, Truck, ChevronDown, ChevronUp } from 'lucide-react'
import AggregatorLayout from '../../layouts/AggregatorLayout'
import { aggregatorOrders } from '../../data/aggregatorData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }
const STATUS_META = {
  pending:    { label:'Pending',    cls:'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',        icon:Circle       },
  confirmed:  { label:'Confirmed',  cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',        icon:CheckCircle2 },
  in_transit: { label:'In transit', cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',icon:Truck        },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',    icon:CheckCircle2 },
}

function StatusBadge({ status }) {
  const { label, cls, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending
  return <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${cls}`}><Icon size={11} strokeWidth={2.5}/>{label}</span>
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={()=>setExpanded(v=>!v)}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-[12.5px] text-[var(--text-muted)]">{order.id}</span>
            <StatusBadge status={order.status}/>
          </div>
          <p className="text-[15px] font-medium text-[var(--text)]">{order.buyer}</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{order.produce} · {order.qty}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono font-medium text-[15px] text-[var(--text)]">{fmt(order.amount)}</span>
          <span className="text-[12px] text-[var(--text-muted)]">{order.date}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-[var(--text-muted)] shrink-0 mt-1"/> : <ChevronDown size={16} className="text-[var(--text-muted)] shrink-0 mt-1"/>}
      </div>
      {expanded && (
        <div className="border-t border-[var(--border)] px-5 py-4 bg-[var(--bg-subtle)]">
          <p className="text-[13.5px] text-[var(--text-muted)]">Commission earned: <span className="font-medium text-navy-700 dark:text-gold-400">{fmt(Math.round(order.amount*0.08))}</span> (8%)</p>
        </div>
      )}
    </div>
  )
}

export default function AggregatorOrders() {
  const [filter, setFilter] = useState('all')
  const orders = aggregatorOrders
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)
  const total = orders.reduce((s,o)=>s+o.amount,0)

  return (
    <AggregatorLayout title="Orders">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Orders</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{orders.length} orders · Total value: {fmt(total)}</p>
        </div>
        <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1 mb-5 w-fit">
          {['all','pending','confirmed','in_transit','delivered'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium capitalize transition-all ${filter===s?'bg-navy-600 text-white':'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
              {s==='in_transit'?'Transit':s}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {filtered.map(o=><OrderCard key={o.id} order={o}/>)}
          {filtered.length===0 && <p className="text-center py-16 text-[var(--text-muted)]">No orders found.</p>}
        </div>
      </div>
    </AggregatorLayout>
  )
}
