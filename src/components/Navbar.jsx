import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sprout } from 'lucide-react'
import Button from './Button'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'For farmers',  href: '#farmers' },
  { label: 'For buyers',   href: '#buyers' },
  { label: 'Market prices',href: '#prices' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-(--bg)/90 backdrop-blur-sm border-b border-(--border)">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-600 text-gold-300">
            <Sprout size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-[21px] font-medium text-navy-700 dark:text-navy-100">
            AgriLink <span className="text-gold-600 dark:text-gold-400">Plateau</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-[15px] text-(--text-muted) hover:text-navy-600 dark:hover:text-gold-300 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button as={Link} to="/auth/login" variant="ghost" size="sm">Log in</Button>
          <Button as={Link} to="/auth/role" variant="primary" size="sm">Get started</Button>
        </div>

        <button className="lg:hidden p-2 -mr-2 text-navy-700 dark:text-navy-200"
          onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-(--border) bg-(--bg) px-6 py-5 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="text-[15px] text-(--text)">{l.label}</a>
          ))}
          <div className="flex flex-col gap-3 pt-3 border-t border-(--border)">
            <Button variant="outline" size="sm">Log in</Button>
            <Button variant="primary" size="sm">Get started</Button>
          </div>
        </div>
      )}
    </header>
  )
}
