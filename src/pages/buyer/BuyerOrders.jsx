import { useState } from 'react'
import { Search, Truck, CheckCircle2, Circle, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import BuyerLayout from '../../layouts/BuyerLayout'
import { buyerOrders } from '../../data/buyerData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_META = {
  pending:    { label:'Pending',    cls:'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',        icon:Circle       },
  confirmed:  { label:'Confirmed',  cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',        icon:CheckCircle2 },
  in_transit: { label:'In transit', cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',icon:Truck        },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',    icon:CheckCircle2 },
}

const STATUS_FLOW = ['pending','confirmed','in_transit','delivered']

function StatusBadge({ status }) {
  const { label, cls, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending
  return <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${cls}`}><Icon size={11} strokeWidth={2.5} />{label}</span>
}

function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false)
  const currentStep = STATUS_FLOW.indexOf(order.status)

  return (
    <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={() => setExpanded(v => !v)}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-[12.5px] text-[var(--text-muted)]">{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-[15px] font-medium text-[var(--text)]">{order.produce}</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{order.farmer} · {order.farmerLga} · {order.qty}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono font-medium text-[15px] text-[var(--text)]">{fmt(order.amount)}</span>
          <span className="text-[12px] text-[var(--text-muted)]">{order.date}</span>
        </div>
        <div className="text-[var(--text-muted)] shrink-0 mt-1">{expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
      </div>

      {expanded && (
        <div className="border-t border-[var(--border)] p-5 flex flex-col gap-4 bg-[var(--bg-subtle)]">
          <div className="grid sm:grid-cols-2 gap-4 text-[13.5px]">
            <div><p className="text-[var(--text-muted)]">Expected delivery</p><p className="font-medium text-[var(--text)] mt-0.5">{order.deliveryDate}</p></div>
            <div><p className="text-[var(--text-muted)]">Farmer contact</p>
              <a href={`tel:${order.phone}`} className="font-medium text-navy-600 dark:text-gold-400 flex items-center gap-1.5 hover:underline mt-0.5">
                <Phone size={13} />{order.phone}
              </a>
            </div>
          </div>
          {order.note && (
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[13.5px]">
              <span className="text-[var(--text-muted)]">Your note: </span><span className="text-[var(--text)]">{order.note}</span>
            </div>
          )}
          {/* Progress */}
          <div>
            <p className="text-[12.5px] text-[var(--text-muted)] mb-3">Order progress</p>
            <div className="flex items-center">
              {STATUS_FLOW.map((s, i) => {
                const done = i <= currentStep
                return (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-navy-600' : 'bg-[var(--border-mid)]'}`}>
                      {done ? <CheckCircle2 size={13} className="text-white" /> : <span className="w-2 h-2 rounded-full bg-white/50" />}
                    </div>
                    {i < STATUS_FLOW.length - 1 && <div className={`flex-1 h-1 ${i < currentStep ? 'bg-navy-600' : 'bg-[var(--border-mid)]'}`} />}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-2">
              {STATUS_FLOW.map(s => <span key={s} className="text-[10.5px] capitalize text-[var(--text-muted)]">{STATUS_META[s].label}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function BuyerOrders() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const orders = buyerOrders

  const counts = { all: orders.length }
  orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1 })

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter
    const matchSearch = o.farmer.toLowerCase().includes(search.toLowerCase()) || o.produce.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalSpent = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + o.amount, 0)

  return (
    <BuyerLayout title="My Orders">
      <div className="px-6 lg:px-8 py-8 max-w-[900px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">My orders</h1>
            <p className="text-[14px] text-[var(--text-muted)] mt-0.5">Total spent on delivered orders: {fmt(totalSpent)}</p>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {['pending','confirmed','in_transit','delivered'].map(s => (
            <div key={s} onClick={() => setFilter(s)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${filter===s ? 'border-navy-500 bg-navy-50 dark:bg-navy-800/60' : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-mid)]'}`}>
              <p className="font-display text-[24px] font-medium text-navy-700 dark:text-navy-100">{counts[s]||0}</p>
              <p className="text-[12.5px] text-[var(--text-muted)] capitalize mt-0.5">{STATUS_META[s].label}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 max-w-xs">
            <Search size={14} className="text-[var(--text-muted)]" />
            <input type="text" placeholder="Search farmer or produce…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>
          <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1">
            {['all','pending','confirmed','in_transit','delivered'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium capitalize transition-all ${filter===s ? 'bg-navy-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
                {s === 'in_transit' ? 'Transit' : s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0
            ? <div className="text-center py-16 text-[var(--text-muted)]">No orders found.</div>
            : filtered.map(o => <OrderCard key={o.id} order={o} />)}
        </div>
      </div>
    </BuyerLayout>
  )
}
