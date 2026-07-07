import { useState } from 'react'
import { Plus, Phone, CheckCircle2, Search, Star, X } from 'lucide-react'
import AggregatorLayout from '../../layouts/AggregatorLayout'
import Button from '../../components/Button'
import { farmerNetwork as initial } from '../../data/aggregatorData'

function InviteModal({ onClose }) {
  const [phone, setPhone] = useState('')
  const [done, setDone]   = useState(false)
  if (done) return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={28} className="text-green-600 dark:text-green-400"/></div>
        <h3 className="font-display text-[22px] text-navy-700 dark:text-navy-100 mb-2">Invite sent!</h3>
        <p className="text-[14px] text-[var(--text-muted)] mb-6">The farmer will receive an SMS invitation to join your network on AgriLink Plateau.</p>
        <Button variant="primary" size="md" onClick={onClose} className="w-full">Done</Button>
      </div>
    </div>
  )
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[20px] text-navy-700 dark:text-navy-100">Invite a farmer</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]"><X size={18}/></button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Farmer's phone number</label>
            <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+234 801 234 5678"
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Your commission rate (%)</label>
            <input type="number" defaultValue="8" min="0" max="30"
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
            <p className="text-[12px] text-[var(--text-muted)]">This commission is shown transparently to the farmer</p>
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="primary" size="md" className="flex-1" onClick={()=>setDone(true)}>Send invite</Button>
            <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FarmerNetwork() {
  const [farmers] = useState(initial)
  const [search, setSearch] = useState('')
  const [showInvite, setShowInvite] = useState(false)

  const filtered = farmers.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.lga.toLowerCase().includes(search.toLowerCase()) ||
    f.produce.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AggregatorLayout title="Farmer Network">
      <div className="px-6 lg:px-8 py-8 max-w-[900px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Farmer network</h1>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">{farmers.length} farmers in your network</p>
          </div>
          <Button variant="accent" size="md" onClick={()=>setShowInvite(true)}><Plus size={16}/>Invite farmer</Button>
        </div>

        <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] mb-6 max-w-xs">
          <Search size={14} className="text-[var(--text-muted)]"/>
          <input type="text" placeholder="Search farmers…" value={search} onChange={e=>setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"/>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map(f => (
            <div key={f.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4 hover:border-[var(--border-mid)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[16px] shrink-0">{f.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[15px] font-medium text-[var(--text)]">{f.name}</p>
                  {f.verified && <span className="text-[11px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">✓ Verified</span>}
                </div>
                <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{f.produce} · {f.lga}</p>
                <div className="flex gap-4 mt-1.5 text-[12.5px] text-[var(--text-muted)]">
                  <span>{f.listings} active listing{f.listings!==1?'s':''}</span>
                  <span>Commission: {f.commission}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href="tel:+2348033344455" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-colors">
                  <Phone size={14}/> Call
                </a>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center py-16 text-[var(--text-muted)]">No farmers found.</p>}
        </div>
      </div>
      {showInvite && <InviteModal onClose={()=>setShowInvite(false)}/>}
    </AggregatorLayout>
  )
}
