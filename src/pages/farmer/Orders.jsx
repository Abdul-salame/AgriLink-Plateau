import { useEffect, useState } from 'react'
import { Search, Truck, CheckCircle2, Circle, Package, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import api from '../../lib/api'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_META = {
  pending:    { label: 'Pending',     cls: 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',        icon: Circle       },
  confirmed:  { label: 'Confirmed',   cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',        icon: CheckCircle2 },
  in_transit: { label: 'In transit',  cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',icon: Truck        },
  delivered:  { label: 'Delivered',   cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',    icon: CheckCircle2 },
}

function StatusBadge({ status }) {
  const { label, cls, icon: Icon } = STATUS_META[status] ?? STATUS_META.pending
  return (
    <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded-full ${cls}`}>
      <Icon size={11} strokeWidth={2.5}/>{label}
    </span>
  )
}

const STATUS_FLOW = ['pending','confirmed','in_transit','delivered']

function OrderCard({ order, onStatusChange }) {
  const [expanded, setExpanded] = useState(false)
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1]

  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
      <div className="flex items-start justify-between gap-4 p-5 cursor-pointer" onClick={() => setExpanded(v=>!v)}>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-[12.5px] text-(--text-muted)">{order._id}</span>
            <StatusBadge status={order.status}/>
          </div>
          <p className="text-[15px] font-medium text-(--text)">{order.buyer?.firstName ? `${order.buyer.firstName} ${order.buyer.lastName}` : 'Buyer'}</p>
          <p className="text-[13px] text-(--text-muted) mt-0.5">{order.produce} · {order.quantity} · {order.deliveryLga || order.buyer?.lga}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className="font-mono font-medium text-[15px] text-(--text)">{fmt(order.total)}</span>
          <span className="text-[12px] text-(--text-muted)">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="text-(--text-muted) shrink-0 mt-1">
          {expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-(--border) p-5 flex flex-col gap-4 bg-(--bg-subtle)">
          <div className="grid sm:grid-cols-2 gap-4 text-[13.5px]">
            <div className="flex flex-col gap-1">
              <span className="text-(--text-muted)">Delivery date</span>
              <span className="font-medium text-(--text)">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'To be agreed'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-(--text-muted)">Buyer contact</span>
              <a href={`tel:${order.phone}`} className="font-medium text-navy-600 dark:text-gold-400 flex items-center gap-1.5 hover:underline">
                <Phone size={13}/>{order.buyer?.phone || '—'}
              </a>
            </div>
          </div>

          {order.note && (
            <div className="p-3 rounded-xl bg-(--bg) border border-(--border) text-[13.5px]">
              <span className="text-(--text-muted)">Note: </span>
              <span className="text-(--text)">{order.note}</span>
            </div>
          )}

          {/* Progress bar */}
          <div>
            <p className="text-[12.5px] text-(--text-muted) mb-3">Order progress</p>
            <div className="flex items-center gap-1">
              {STATUS_FLOW.map((s, i) => {
                const current = STATUS_FLOW.indexOf(order.status)
                const done    = i <= current
                return (
                  <div key={s} className="flex items-center gap-1 flex-1">
                    <div className={`h-1.5 rounded-full flex-1 ${done ? 'bg-navy-600' : 'bg-(--border-mid)'}`}/>
                    {i < STATUS_FLOW.length - 1 && <div className={`w-2 h-2 rounded-full shrink-0 ${done ? 'bg-navy-600' : 'bg-(--border-mid)'}`}/>}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-1.5">
              {STATUS_FLOW.map(s => (
                <span key={s} className="text-[10.5px] capitalize text-(--text-muted)">{STATUS_META[s].label}</span>
              ))}
            </div>
          </div>

          {nextStatus && order.status !== 'delivered' && (
            <button onClick={() => onStatusChange(order._id, nextStatus)}
              className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-600 text-white text-[13.5px] font-medium hover:bg-navy-700 transition-colors">
              <Package size={14}/>
              Mark as {STATUS_META[nextStatus].label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    async function loadOrders() {
      setLoading(true)
      setError('')
      try {
        const { data } = await api.get('/orders')
        if (mounted) setOrders(data.data || [])
      } catch (err) {
        if (mounted) setError(err.response?.data?.message || 'Unable to load orders.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    loadOrders()
    return () => { mounted = false }
  }, [])

  async function handleStatusChange(id, newStatus) {
    try {
      await api.patch(`/orders/${id}/status`, { status: newStatus })
      setOrders(os => os.map(o => o._id === id ? { ...o, status: newStatus } : o))
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update order status.')
    }
  }

  const counts = { all: orders.length, pending: 0, confirmed: 0, in_transit: 0, delivered: 0 }
  orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1 })

  const filtered = orders.filter(o => {
    const buyerName = `${o.buyer?.firstName || ''} ${o.buyer?.lastName || ''}`.trim()
    const matchFilter = filter === 'all' || o.status === filter
    const matchSearch = buyerName.toLowerCase().includes(search.toLowerCase()) || o.produce.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalValue = orders.reduce((s, o) => s + (Number(o.total) || 0), 0)

  return (
    <FarmerLayout title="Orders">
      <div className="px-6 lg:px-8 py-8 max-w-225 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Orders</h1>
            <p className="text-[14px] text-(--text-muted) mt-0.5">Total value: {fmt(totalValue)} across {orders.length} orders</p>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {['pending','confirmed','in_transit','delivered'].map(s => (
            <div key={s} onClick={() => setFilter(s)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${filter===s ? 'border-navy-500 bg-navy-50 dark:bg-navy-800/60' : 'border-(--border) bg-(--bg) hover:border-(--border-mid)'}`}>
              <p className="font-display text-[24px] font-medium text-navy-700 dark:text-navy-100">{counts[s]||0}</p>
              <p className="text-[12.5px] text-(--text-muted) capitalize mt-0.5">{STATUS_META[s].label}</p>
            </div>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-(--border) bg-(--bg) flex-1 max-w-xs">
            <Search size={14} className="text-(--text-muted)"/>
            <input type="text" placeholder="Search buyer or produce…" value={search} onChange={e=>setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-(--text) placeholder:text-(--text-muted)"/>
          </div>
          <div className="flex items-center gap-2 bg-(--bg) border border-(--border) rounded-xl p-1">
            {['all','pending','confirmed','in_transit','delivered'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium capitalize transition-all ${filter===s ? 'bg-navy-600 text-white' : 'text-(--text-muted) hover:text-(--text)'}`}>
                {s==='in_transit' ? 'In transit' : s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-[13px] text-red-500 mb-4">{error}</p>}

        <div className="flex flex-col gap-3">
          {loading ? <div className="text-center py-16 text-(--text-muted)">Loading orders…</div> : filtered.length === 0
            ? <div className="text-center py-16 text-(--text-muted)">No orders found.</div>
            : filtered.map(o => <OrderCard key={o._id} order={o} onStatusChange={handleStatusChange}/>)
          }
        </div>
      </div>
    </FarmerLayout>
  )
}
