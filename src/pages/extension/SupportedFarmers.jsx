import { useState } from 'react'
import { Search, Phone, CheckCircle2 } from 'lucide-react'
import ExtensionLayout from '../../layouts/ExtensionLayout'
import { supportedFarmers } from '../../data/extensionData'

export default function SupportedFarmers() {
  const [search, setSearch] = useState('')
  const filtered = supportedFarmers.filter(f=>f.name.toLowerCase().includes(search.toLowerCase())||f.lga.toLowerCase().includes(search.toLowerCase()))

  return (
    <ExtensionLayout title="Farmers I Support">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Farmers I support</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{supportedFarmers.length} farmers across 6 LGAs</p>
        </div>
        <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] mb-6 max-w-xs">
          <Search size={14} className="text-[var(--text-muted)]"/>
          <input type="text" placeholder="Search farmers…" value={search} onChange={e=>setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"/>
        </div>
        <div className="flex flex-col gap-3">
          {filtered.map(f=>(
            <div key={f.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex items-center gap-4 hover:border-[var(--border-mid)] transition-colors">
              <div className="w-11 h-11 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[16px] shrink-0">{f.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[15px] font-medium text-[var(--text)]">{f.name}</p>
                  {f.verified&&<span className="text-[11px] font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800">✓ Verified</span>}
                </div>
                <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{f.produce} · {f.lga}</p>
                <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">Last contact: {f.lastContact}</p>
              </div>
              <a href="tel:+2348033344455" className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] transition-colors shrink-0">
                <Phone size={14}/> Call
              </a>
            </div>
          ))}
        </div>
      </div>
    </ExtensionLayout>
  )
}
