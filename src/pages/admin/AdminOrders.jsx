import { useState } from 'react'
import { Search, Truck, CheckCircle2, Circle } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { allOrders } from '../../data/adminData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_META = {
  pending:    { label:'Pending',    cls:'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400'        },
  confirmed:  { label:'Confirmed',  cls:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'        },
  in_transit: { label:'In transit', cls:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  delivered:  { label:'Delivered',  cls:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'    },
}

export default function AdminOrders() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const orders = allOrders

  const counts = { all: orders.length }
  orders.forEach(o => { counts[o.status] = (counts[o.status] || 0) + 1 })

  const totalValue = orders.reduce((s, o) => s + o.amount, 0)

  const filtered = orders.filter(o => {
    const matchSearch = o.farmer.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase()) || o.produce.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || o.status === filter
    return matchSearch && matchFilter
  })

  return (
    <AdminLayout title="Orders">
      <div className="px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Orders</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{orders.length} total orders · Platform value: {fmt(totalValue)}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {['pending','confirmed','in_transit','delivered'].map(s => (
            <div key={s} onClick={() => setFilter(s)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${filter===s ? 'border-navy-500 bg-navy-50 dark:bg-navy-800/60' : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-mid)]'}`}>
              <p className="font-display text-[24px] font-medium text-navy-700 dark:text-navy-100">{counts[s]||0}</p>
              <p className="text-[12.5px] text-[var(--text-muted)] capitalize mt-0.5">{STATUS_META[s].label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 max-w-xs">
            <Search size={14} className="text-[var(--text-muted)]" />
            <input type="text" placeholder="Search farmer, buyer or produce…" value={search} onChange={e => setSearch(e.target.value)}
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

        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
                  <th className="font-medium px-6 py-3.5">Order ID</th>
                  <th className="font-medium px-6 py-3.5">Farmer</th>
                  <th className="font-medium px-6 py-3.5">Buyer</th>
                  <th className="font-medium px-6 py-3.5 hidden md:table-cell">Produce</th>
                  <th className="font-medium px-6 py-3.5">Amount</th>
                  <th className="font-medium px-6 py-3.5">Status</th>
                  <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => (
                  <tr key={o.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i < filtered.length-1 ? 'border-b border-[var(--border)]' : ''}`}>
                    <td className="px-6 py-4 font-mono text-[13px] text-[var(--text-muted)]">{o.id}</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-[var(--text)]">{o.farmer}</td>
                    <td className="px-6 py-4 text-[14px] text-[var(--text)]">{o.buyer}</td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden md:table-cell">{o.produce}</td>
                    <td className="px-6 py-4 font-mono text-[14px] text-[var(--text)]">{fmt(o.amount)}</td>
                    <td className="px-6 py-4"><span className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${STATUS_META[o.status]?.cls}`}>{STATUS_META[o.status]?.label}</span></td>
                    <td className="px-6 py-4 text-[13px] text-[var(--text-muted)] hidden sm:table-cell">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="text-center py-12 text-[var(--text-muted)]">No orders found.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
