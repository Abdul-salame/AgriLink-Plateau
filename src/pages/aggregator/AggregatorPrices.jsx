import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Search } from 'lucide-react'
import AggregatorLayout from '../../layouts/AggregatorLayout'
import { marketPrices } from '../../data/marketData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const EXTRA = [
  { crop:'Onion', unit:'100kg bag', price:58000, change:5.0, region:'Pankshin' },
  { crop:'Fonio', unit:'100kg bag', price:64000, change:3.6, region:'Mangu'    },
  { crop:'Groundnut', unit:'100kg bag', price:72000, change:1.2, region:'Shendam' },
  { crop:'Soybean', unit:'100kg bag', price:88000, change:-1.5, region:'Wase'  },
]
const ALL = [...marketPrices, ...EXTRA]

export default function AggregatorPrices() {
  const [search, setSearch] = useState('')
  const filtered = ALL.filter(p=>p.crop.toLowerCase().includes(search.toLowerCase()))
  return (
    <AggregatorLayout title="Market Prices">
      <div className="px-6 lg:px-8 py-8 max-w-[900px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Market prices</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Use these rates to set competitive prices for your bulk listings.</p>
        </div>
        <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] mb-5 max-w-xs">
          <Search size={14} className="text-[var(--text-muted)]"/>
          <input type="text" placeholder="Search crop…" value={search} onChange={e=>setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]"/>
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
              <th className="font-medium px-6 py-3.5">Crop</th>
              <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Region</th>
              <th className="font-medium px-6 py-3.5">Price</th>
              <th className="font-medium px-6 py-3.5 text-right">24h</th>
            </tr></thead>
            <tbody>
              {filtered.map((item,i)=>{
                const up=item.change>0, flat=item.change===0
                return (
                  <tr key={item.crop} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i<filtered.length-1?'border-b border-[var(--border)]':''}`}>
                    <td className="px-6 py-4 text-[14.5px] font-medium text-[var(--text)]">{item.crop}</td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden sm:table-cell">{item.region}</td>
                    <td className="px-6 py-4 font-mono text-[14px] text-[var(--text)]">{fmt(item.price)}<span className="text-[var(--text-muted)] text-[12px]">/{item.unit}</span></td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center justify-end gap-1 font-mono text-[13px] font-medium ${flat?'text-[var(--text-muted)]':up?'text-green-600 dark:text-green-400':'text-red-500 dark:text-red-400'}`}>
                        {flat?<Minus size={13}/>:up?<TrendingUp size={13}/>:<TrendingDown size={13}/>}
                        {flat?'0.0%':`${Math.abs(item.change)}%`}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AggregatorLayout>
  )
}
