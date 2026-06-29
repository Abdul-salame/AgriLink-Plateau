import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, Bell, ArrowRight } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import { useAuth } from '../../lib/AuthContext'

const roleDestinations = {
  farmer:    { label: 'Go to Farmer Dashboard', path: '/farmer/dashboard' },
  buyer:     { label: 'Browse produce',          path: '/buyer/browse' },
  aggregator:{ label: 'Go to Dashboard',         path: '/farmer/dashboard' },
  logistics: { label: 'Go to Dashboard',         path: '/farmer/dashboard' },
  extension: { label: 'Go to Dashboard',         path: '/farmer/dashboard' },
}

export default function KycPending() {
  const { authState } = useAuth()
  const dest = roleDestinations[authState.role] ?? { label: 'Continue', path: '/' }
  const name = authState.user?.firstName ?? 'there'

  return (
    <AuthLayout step={6} totalSteps={6}>
      <div className="flex flex-col items-center text-center gap-6 pt-4">
        {/* Status icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gold-100 dark:bg-navy-800 flex items-center justify-center">
            <Clock size={36} className="text-gold-600 dark:text-gold-400" strokeWidth={1.8} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center border-2 border-(--bg)">
            <CheckCircle2 size={14} className="text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div>
          <h1 className="font-display text-[28px] font-medium text-navy-700 dark:text-navy-100">
            You're almost there, {name}!
          </h1>
          <p className="mt-3 text-[15px] text-(--text-muted) leading-relaxed max-w-sm">
            Your documents have been submitted. Our team will verify your identity and NIN within{' '}
            <strong className="text-(--text)">24 hours</strong>.
          </p>
        </div>

        {/* Steps */}
        <div className="w-full flex flex-col gap-3 text-left">
          {[
            { icon: CheckCircle2, label: 'Account created', done: true },
            { icon: CheckCircle2, label: 'Phone number verified', done: true },
            { icon: CheckCircle2, label: 'NIN submitted', done: true },
            { icon: Clock,        label: 'Identity verification — in progress', done: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border ${item.done ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' : 'border-(--border) bg-(--bg-subtle)'}`}>
              <item.icon size={16} className={item.done ? 'text-green-600 dark:text-green-400' : 'text-gold-500'} />
              <span className={`text-[14px] ${item.done ? 'text-green-800 dark:text-green-300' : 'text-(--text-muted)'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Notification note */}
        <div className="flex gap-3 p-4 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200 dark:border-navy-700 w-full text-left">
          <Bell size={16} className="text-navy-600 dark:text-gold-400 shrink-0 mt-0.5" />
          <p className="text-[13px] text-navy-700 dark:text-navy-200 leading-relaxed">
            We'll notify you by SMS and email once your account is verified.
            You can already explore the platform while you wait.
          </p>
        </div>

        <Button as={Link} to={dest.path} variant="primary" size="lg" className="w-full">
          {dest.label} <ArrowRight size={17} />
        </Button>

        <Link to="/" className="text-[13.5px] text-(--text-muted) hover:text-navy-600 dark:hover:text-gold-400 transition-colors">
          Return to home
        </Link>
      </div>
    </AuthLayout>
  )
}
