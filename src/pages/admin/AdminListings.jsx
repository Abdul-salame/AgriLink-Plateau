import { useState } from 'react'
import { Search, Flag, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { allListings as initial } from '../../data/adminData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_STYLE = {
  active:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  removed: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  flagged: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
}

export default function AdminListings() {
  const [listings, setListings] = useState(initial)
  const [search, setSearch]     = useState('')
  const [filter, setFilter]     = useState('all')

  function remove(id)   { setListings(l => l.map(x => x.id === id ? { ...x, status:'removed' }         : x)) }
  function unflag(id)   { setListings(l => l.map(x => x.id === id ? { ...x, flagged:false }             : x)) }
  function restore(id)  { setListings(l => l.map(x => x.id === id ? { ...x, status:'active', flagged:false } : x)) }

  const flaggedCount  = listings.filter(l => l.flagged).length
  const removedCount  = listings.filter(l => l.status === 'removed').length

  const filtered = listings.filter(l => {
    const matchSearch = l.produce.toLowerCase().includes(search.toLowerCase()) || l.farmer.toLowerCase().includes(search.toLowerCase())
    if (filter === 'flagged') return matchSearch && l.flagged
    if (filter === 'removed') return matchSearch && l.status === 'removed'
    if (filter === 'active')  return matchSearch && l.status === 'active'
    return matchSearch
  })

  return (
    <AdminLayout title="Listings">
      <div className="px-6 lg:px-8 py-8 max-w-[1100px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Listings</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{listings.length} total · {flaggedCount} flagged · {removedCount} removed</p>
        </div>

        {flaggedCount > 0 && (
          <div className="flex gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 mb-6">
            <AlertTriangle size={16} className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
            <p className="text-[13.5px] text-orange-800 dark:text-orange-300">{flaggedCount} listing{flaggedCount > 1 ? 's' : ''} flagged for review. Check the Flagged tab below.</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 max-w-xs">
            <Search size={14} className="text-[var(--text-muted)]" />
            <input type="text" placeholder="Search produce or farmer…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>
          <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1">
            {[['all','All'],['active','Active'],['flagged','Flagged'],['removed','Removed']].map(([v,l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${filter===v ? 'bg-navy-600 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>{l}</button>
            ))}
          </div>
        </div>

        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
                  <th className="font-medium px-6 py-3.5">Listing</th>
                  <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Farmer</th>
                  <th className="font-medium px-6 py-3.5 hidden md:table-cell">LGA</th>
                  <th className="font-medium px-6 py-3.5">Price</th>
                  <th className="font-medium px-6 py-3.5 hidden lg:table-cell">Qty</th>
                  <th className="font-medium px-6 py-3.5">Status</th>
                  <th className="font-medium px-6 py-3.5 hidden md:table-cell">Date</th>
                  <th className="font-medium px-6 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={l.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${l.flagged ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''} ${i < filtered.length-1 ? 'border-b border-[var(--border)]' : ''}`}>
                    <td className="px-6 py-4">
                      <p className="text-[14px] font-medium text-[var(--text)]">{l.produce}</p>
                      <p className="text-[11.5px] font-mono text-[var(--text-muted)]">{l.id}</p>
                    </td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text)] hidden sm:table-cell">{l.farmer}</td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden md:table-cell">{l.lga}</td>
                    <td className="px-6 py-4 font-mono text-[13.5px] text-[var(--text)]">{fmt(l.price)}</td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden lg:table-cell">{l.qty}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[l.status]}`}>{l.status}</span>
                        {l.flagged && <span className="text-[11px] font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full flex items-center gap-1"><Flag size={10} />Flagged</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[13px] text-[var(--text-muted)] hidden md:table-cell">{l.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        {l.status !== 'removed' && (
                          <button onClick={() => remove(l.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-[var(--text-muted)] hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Remove listing">
                            <Trash2 size={15} />
                          </button>
                        )}
                        {l.status === 'removed' && (
                          <button onClick={() => restore(l.id)} className="p-1.5 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-[var(--text-muted)] hover:text-green-600 transition-colors" title="Restore listing">
                            <CheckCircle2 size={15} />
                          </button>
                        )}
                        {l.flagged && (
                          <button onClick={() => unflag(l.id)} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-orange-500 transition-colors" title="Clear flag">
                            <Flag size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="text-center py-12 text-[var(--text-muted)]">No listings found.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
