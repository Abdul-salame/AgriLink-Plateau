import { marketPrices } from '../data/marketData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

function TickerItem({ item }) {
  const up   = item.change > 0
  const flat = item.change === 0
  return (
    <div className="flex items-center gap-3 px-6 py-3 border-r border-navy-400/30 shrink-0">
      <span className="font-mono text-[13px] text-gold-200/70 uppercase tracking-wide">{item.crop}</span>
      <span className="font-mono text-[13px] text-gold-100 font-medium">
        {fmt(item.price)}<span className="text-gold-200/45">/{item.unit}</span>
      </span>
      <span className={`font-mono text-[13px] font-medium ${flat ? 'text-gold-200/40' : up ? 'text-green-300' : 'text-red-300'}`}>
        {flat ? '—' : up ? `↑ ${item.change}%` : `↓ ${Math.abs(item.change)}%`}
      </span>
    </div>
  )
}

export default function PriceTicker() {
  const doubled = [...marketPrices, ...marketPrices]
  return (
    <div className="w-full bg-navy-800 border-y border-navy-700 overflow-hidden">
      <div className="flex items-stretch">
        <div className="shrink-0 flex items-center gap-2 px-5 bg-gold-400 text-navy-900 font-medium text-[13px] tracking-wide uppercase whitespace-nowrap">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-navy-700 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-navy-800"></span>
          </span>
          Live market prices
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-ticker w-max">
            {doubled.map((item, i) => <TickerItem item={item} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
