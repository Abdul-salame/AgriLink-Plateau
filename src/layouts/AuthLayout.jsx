import { Link } from 'react-router-dom'
import { Sprout, ArrowLeft } from 'lucide-react'

export default function AuthLayout({ children, step, totalSteps, title, subtitle, backTo }) {
  return (
    <div className="min-h-screen bg-(--bg) flex flex-col">
      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-(--border) shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy-600 text-gold-300">
            <Sprout size={15} strokeWidth={2.25} />
          </span>
          <span className="font-display text-[18px] font-medium text-navy-700 dark:text-navy-100">
            AgriLink <span className="text-gold-600 dark:text-gold-400">Plateau</span>
          </span>
        </Link>
        {step && totalSteps && (
          <span className="text-[13px] text-(--text-muted)">
            Step {step} of {totalSteps}
          </span>
        )}
      </header>

      {/* Progress bar */}
      {step && totalSteps && (
        <div className="h-1 bg-(--border) w-full">
          <div
            className="h-1 bg-navy-600 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {backTo && (
            <Link
              to={backTo}
              className="inline-flex items-center gap-1.5 text-[13.5px] text-(--text-muted) hover:text-navy-600 dark:hover:text-gold-400 transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Back
            </Link>
          )}

          {(title || subtitle) && (
            <div className="mb-8">
              {title && (
                <h1 className="font-display text-[28px] lg:text-[32px] font-medium text-navy-700 dark:text-navy-100 leading-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="mt-2 text-[15px] text-(--text-muted) leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  )
}
