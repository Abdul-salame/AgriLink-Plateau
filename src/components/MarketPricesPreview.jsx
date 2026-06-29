import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { marketPrices } from '../data/marketData'
import Button from './Button'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

export default function MarketPricesPreview() {
  return (
    <section id="prices" className="py-24 lg:py-32 bg-(--bg)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[13px] font-medium tracking-wide uppercase text-gold-600 dark:text-gold-400">Transparent pricing</span>
            <h2 className="font-display text-[34px] lg:text-[42px] mt-3 leading-tight text-navy-700 dark:text-navy-100">
              Today's market rates, by crop
            </h2>
          </div>
          <Button variant="outline" size="md">View full price board</Button>
        </div>

        <div className="rounded-2xl border border-(--border) overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-(--bg-subtle) text-[13px] text-(--text-muted)">
                <th className="font-medium px-6 py-4">Crop</th>
                <th className="font-medium px-6 py-4 hidden sm:table-cell">Region</th>
                <th className="font-medium px-6 py-4">Price</th>
                <th className="font-medium px-6 py-4 text-right">24h change</th>
              </tr>
            </thead>
            <tbody>
              {marketPrices.map((item, i) => {
                const up   = item.change > 0
                const flat = item.change === 0
                return (
                  <tr key={item.crop} className={i !== marketPrices.length - 1 ? 'border-b border-(--border)' : ''}>
                    <td className="px-6 py-4 text-[15px] font-medium text-(--text)">{item.crop}</td>
                    <td className="px-6 py-4 text-[14px] text-(--text-muted) hidden sm:table-cell">{item.region}</td>
                    <td className="px-6 py-4 font-mono text-[14.5px] text-(--text)">
                      {fmt(item.price)}<span className="text-(--text-muted) opacity-50"> /{item.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center justify-end gap-1.5 font-mono text-[13.5px] font-medium ${flat ? 'text-(--text-muted)' : up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {flat ? <Minus size={14} /> : up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {flat ? '0.0%' : `${Math.abs(item.change)}%`}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] text-(--text-muted) opacity-70">
          Prices reflect aggregated reports from registered aggregators and local markets across Plateau State. Updated daily.
        </p>
      </div>
    </section>
  )
}
