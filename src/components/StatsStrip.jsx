import { stats } from '../data/marketData'

export default function StatsStrip() {
  return (
    <section className="py-16 lg:py-20 bg-(--bg) border-y border-(--border)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-display text-[32px] lg:text-[38px] text-navy-700 dark:text-gold-400 font-medium leading-none">{s.value}</p>
              <p className="mt-2.5 text-[14px] text-(--text-muted)">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
