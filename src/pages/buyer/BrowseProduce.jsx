import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, CheckCircle2, Bookmark, BookmarkCheck, SlidersHorizontal, X } from 'lucide-react'
import BuyerLayout from '../../layouts/BuyerLayout'
import Button from '../../components/Button'
import { produceCatalogue } from '../../data/buyerData'

const CATEGORIES = ['All','Tubers','Vegetables','Grains','Fruits','Legumes','Spices']
const LGAS = ['All LGAs','Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu','Mikang','Pankshin','Riyom','Shendam','Wase']

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

function ProduceCard({ item, saved, onSave, onOrder }) {
  return (
    <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] flex flex-col overflow-hidden hover:border-[var(--border-mid)] hover:shadow-sm transition-all">
      <div className="h-36 bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-5xl relative">
        🌱
        <button onClick={() => onSave(item.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[var(--bg)]/90 backdrop-blur flex items-center justify-center text-[var(--text-muted)] hover:text-navy-600 dark:hover:text-gold-400 transition-colors shadow-sm">
          {saved ? <BookmarkCheck size={16} className="text-navy-600 dark:text-gold-400" /> : <Bookmark size={16} />}
        </button>
        {item.verified && (
          <span className="absolute top-3 left-3 text-[11px] font-medium bg-green-600 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 size={10} />Verified
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <p className="text-[15px] font-medium text-[var(--text)]">{item.produce}</p>
          <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">{item.farmer} · {item.lga}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-gold-400 fill-gold-400" />
            <span className="text-[12px] text-[var(--text-muted)]">{item.rating} ({item.reviews} reviews)</span>
          </div>
        </div>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{item.description}</p>
        <div className="mt-auto pt-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-mono font-medium text-[15px] text-navy-700 dark:text-gold-400">{fmt(item.price)}</span>
              <span className="text-[12px] text-[var(--text-muted)]">/{item.unit}</span>
            </div>
            <span className="text-[12px] text-[var(--text-muted)]">{item.qty} available</span>
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={() => onOrder(item)}>Place order</Button>
        </div>
      </div>
    </div>
  )
}

function OrderModal({ item, onClose }) {
  const [qty, setQty]   = useState(1)
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [done, setDone] = useState(false)

  if (done) return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="font-display text-[22px] text-navy-700 dark:text-navy-100 mb-2">Order placed!</h3>
        <p className="text-[14px] text-[var(--text-muted)] mb-6">Your order has been sent to {item.farmer}. They will confirm within 24 hours.</p>
        <Button variant="primary" size="md" onClick={onClose} className="w-full">Done</Button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[20px] text-navy-700 dark:text-navy-100">Place order</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]"><X size={18} /></button>
        </div>
        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] mb-5">
          <p className="text-[14.5px] font-medium text-[var(--text)]">{item.produce}</p>
          <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{item.farmer} · {item.lga}</p>
          <p className="font-mono text-[14px] font-medium text-navy-700 dark:text-gold-400 mt-1">{fmt(item.price)}/{item.unit}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Quantity</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg-subtle)] text-lg font-medium transition-colors">−</button>
              <span className="flex-1 text-center text-[16px] font-medium text-[var(--text)]">{qty} {item.unit}</span>
              <button onClick={() => setQty(q => q+1)} className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg-subtle)] text-lg font-medium transition-colors">+</button>
            </div>
            <p className="text-[12.5px] text-[var(--text-muted)] text-center">Total: {fmt(qty * item.price)}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Preferred delivery date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Note to farmer <span className="text-[var(--text-muted)] font-normal">(optional)</span></label>
            <textarea rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Delivery address, special instructions…"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-[15px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all" />
          </div>
          <div className="p-3.5 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200 dark:border-navy-700 text-[13.5px] text-navy-700 dark:text-navy-200">
            Order total: <span className="font-mono font-medium">{fmt(qty * item.price)}</span> + delivery (to be agreed with farmer)
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="md" className="flex-1" onClick={() => setDone(true)}>Confirm order</Button>
            <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BrowseProduce() {
  const [search, setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [lga, setLga]         = useState('All LGAs')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy]   = useState('rating')
  const [savedIds, setSavedIds] = useState(new Set(['LST-012','LST-010']))
  const [orderItem, setOrderItem] = useState(null)

  function toggleSave(id) {
    setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const filtered = produceCatalogue
    .filter(p => {
      const matchSearch   = p.produce.toLowerCase().includes(search.toLowerCase()) || p.farmer.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || p.category === category
      const matchLga      = lga === 'All LGAs' || p.lga === lga
      const matchVerified = !verifiedOnly || p.verified
      return matchSearch && matchCategory && matchLga && matchVerified
    })
    .sort((a, b) => sortBy === 'price' ? a.price - b.price : sortBy === 'price_desc' ? b.price - a.price : b.rating - a.rating)

  return (
    <BuyerLayout title="Browse Produce">
      <div className="px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Browse produce</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Order directly from verified farmers across Plateau State.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="text-[var(--text-muted)] shrink-0" />
            <input type="text" placeholder="Search produce or farmer…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none appearance-none cursor-pointer">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={lga} onChange={e => setLga(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none appearance-none cursor-pointer">
            {LGAS.map(l => <option key={l}>{l}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none appearance-none cursor-pointer">
            <option value="rating">Top rated</option>
            <option value="price">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
          </select>
          <button onClick={() => setVerifiedOnly(v => !v)}
            className={`h-10 px-4 rounded-xl border text-[13.5px] font-medium flex items-center gap-2 transition-all ${verifiedOnly ? 'bg-navy-600 border-navy-600 text-white' : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-mid)]'}`}>
            <CheckCircle2 size={14} /> Verified only
          </button>
        </div>

        <p className="text-[13px] text-[var(--text-muted)] mb-4">{filtered.length} listing{filtered.length !== 1 ? 's' : ''} found</p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[15px] text-[var(--text-muted)]">No produce found for your filters.</p>
            <button onClick={() => { setSearch(''); setCategory('All'); setLga('All LGAs'); setVerifiedOnly(false) }}
              className="mt-3 text-[14px] text-navy-600 dark:text-gold-400 hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(p => (
              <ProduceCard key={p.id} item={p} saved={savedIds.has(p.id)} onSave={toggleSave} onOrder={setOrderItem} />
            ))}
          </div>
        )}
      </div>
      {orderItem && <OrderModal item={orderItem} onClose={() => setOrderItem(null)} />}
    </BuyerLayout>
  )
}
