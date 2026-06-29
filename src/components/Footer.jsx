import { Sprout } from 'lucide-react'

const columns = [
  { title: 'Platform', links: ['How it works', 'Market prices', 'Verified farms', 'Logistics network'] },
  { title: 'Roles',    links: ['Farmers', 'Buyers', 'Aggregators', 'Extension workers'] },
  { title: 'Company',  links: ['About', 'Trust & safety', 'Contact', 'Careers'] },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-400 text-navy-900">
                <Sprout size={16} strokeWidth={2.25} />
              </span>
              <span className="font-display text-[18px] text-cream">AgriLink Plateau</span>
            </div>
            <p className="text-[14px] leading-relaxed max-w-xs">
              Connecting Plateau State farmers directly with buyers, aggregators and logistics — built for the highlands.
            </p>
          </div>

          {columns.map(col => (
            <div key={col.title}>
              <h4 className="text-[13px] font-medium text-navy-100/80 uppercase tracking-wide mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-[14px] hover:text-gold-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-navy-700 flex flex-wrap items-center justify-between gap-4 text-[13px] text-navy-500">
          <p>© {new Date().getFullYear()} AgriLink Plateau. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-navy-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-navy-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
