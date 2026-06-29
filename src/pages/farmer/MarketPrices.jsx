import { useState } from 'react'
import { TrendingUp, TrendingDown, Minus, Search, RefreshCw } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import { marketPrices } from '../../data/marketData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const ALL_PRICES = [
  ...marketPrices,
  { crop: 'Onion',        unit: '100kg bag', price: 58000, change: 5.0,  region: 'Pankshin'   },
  { crop: 'Fonio',        unit: '100kg bag', price: 64000, change: 3.6,  region: 'Mangu'      },
  { crop: 'Groundnut',    unit: '100kg bag', price: 72000, change: 1.2,  region: 'Shendam'    },
  { crop: 'Soybean',      unit: '100kg bag', price: 88000, change: -1.5, region: 'Wase'       },
  { crop: 'Sweet potato', unit: '50kg bag',  price: 18000, change: 0.0,  region: 'Riyom'      },
  { crop: 'Yam',          unit: 'tuber',     price: 1800,  change: 2.8,  region: 'Langtang'   },
  { crop: 'Maize',        unit: '100kg bag', price: 31000, change: 1.5,  region: 'Bokkos'     },
  { crop: 'Pepper (dry)', unit: 'kg',        price: 4200,  change: -3.1, region: 'Barkin Ladi'},
]

const REGIONS = ['All regions', ...new Set(ALL_PRICES.map(p => p.region))]

export default function MarketPrices() {
  const [search, setSearch]     = useState('')
  const [region, setRegion]     = useState('All regions')
  const [sortBy, setSortBy]     = useState('name') // name | price | change
  const [lastUpdated]           = useState('Today, 8:00 AM')

  const filtered = ALL_PRICES
    .filter(p => {
      const matchSearch = p.crop.toLowerCase().includes(search.toLowerCase())
      const matchRegion = region === 'All regions' || p.region === region
      return matchSearch && matchRegion
    })
    .sort((a, b) => {
      if (sortBy === 'price')  return b.price - a.price
      if (sortBy === 'change') return b.change - a.change
      return a.crop.localeCompare(b.crop)
    })

  return (
    <FarmerLayout title="Market Prices">
      <div className="px-6 lg:px-8 py-8 max-w-250 mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Market prices</h1>
            <p className="text-[13.5px] text-(--text-muted) mt-1 flex items-center gap-1.5">
              <RefreshCw size={13}/> Updated: {lastUpdated} · Plateau State local markets
            </p>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-7">
          {[
            { label: 'Crops tracked', value: ALL_PRICES.length },
            { label: 'Rising prices',  value: ALL_PRICES.filter(p=>p.change>0).length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Falling prices', value: ALL_PRICES.filter(p=>p.change<0).length, color: 'text-red-500 dark:text-red-400'   },
          ].map(c => (
            <div key={c.label} className="bg-(--bg) rounded-2xl border border-(--border) p-4">
              <p className={`font-display text-[28px] font-medium leading-none ${c.color || 'text-navy-700 dark:text-navy-100'}`}>{c.value}</p>
              <p className="text-[12.5px] text-(--text-muted) mt-2">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-(--border) bg-(--bg) flex-1 max-w-xs">
            <Search size={14} className="text-(--text-muted)"/>
            <input type="text" placeholder="Search crop…" value={search} onChange={e=>setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-(--text) placeholder:text-(--text-muted)"/>
          </div>
          <select value={region} onChange={e=>setRegion(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-(--border) bg-(--bg) text-[14px] text-(--text) outline-none appearance-none cursor-pointer">
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div className="flex items-center gap-2 bg-(--bg) border border-(--border) rounded-xl p-1">
            {[['name','Name'],['price','Price'],['change','Change']].map(([v,l]) => (
              <button key={v} onClick={()=>setSortBy(v)}
                className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-all ${sortBy===v ? 'bg-navy-600 text-white' : 'text-(--text-muted) hover:text-(--text)'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Price table */}
        <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-(--bg-subtle) text-[12.5px] text-(--text-muted)">
                <th className="font-medium px-6 py-3.5">Crop</th>
                <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Region</th>
                <th className="font-medium px-6 py-3.5 hidden md:table-cell">Unit</th>
                <th className="font-medium px-6 py-3.5">Price</th>
                <th className="font-medium px-6 py-3.5 text-right">24h</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const up   = item.change > 0
                const flat = item.change === 0
                return (
                  <tr key={item.crop} className={`hover:bg-(--bg-subtle) transition-colors ${i < filtered.length-1 ? 'border-b border-(--border)' : ''}`}>
                    <td className="px-6 py-4 text-[14.5px] font-medium text-(--text)">{item.crop}</td>
                    <td className="px-6 py-4 text-[13.5px] text-(--text-muted) hidden sm:table-cell">{item.region}</td>
                    <td className="px-6 py-4 text-[13.5px] text-(--text-muted) hidden md:table-cell">{item.unit}</td>
                    <td className="px-6 py-4 font-mono text-[14px] text-(--text)">{fmt(item.price)}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center justify-end gap-1 font-mono text-[13px] font-medium ${flat?'text-(--text-muted)':up?'text-green-600 dark:text-green-400':'text-red-500 dark:text-red-400'}`}>
                        {flat?<Minus size={13}/>:up?<TrendingUp size={13}/>:<TrendingDown size={13}/>}
                        {flat ? '0.0%' : `${Math.abs(item.change)}%`}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center py-12 text-(--text-muted)">No crops match your search.</p>
          )}
        </div>
        <p className="mt-4 text-[12px] text-(--text-muted)">
          Prices are aggregated from registered aggregators and local market reports across Plateau State. For reference only.
        </p>
      </div>
    </FarmerLayout>
  )
}
