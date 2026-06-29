import { Link, useNavigate } from 'react-router-dom'
import { Wheat, ShoppingBasket, Users, Truck, GraduationCap, ChevronRight, Sprout, Star } from 'lucide-react'
import { useAuth } from '../../lib/AuthContext'

const roles = [
  {
    id: 'farmer',
    icon: Wheat,
    title: 'Farmer',
    desc: 'List produce, set prices, connect with buyers and logistics.',
  },
  {
    id: 'buyer',
    icon: ShoppingBasket,
    title: 'Buyer',
    desc: 'Browse verified produce and place orders directly from farmers.',
  },
  {
    id: 'aggregator',
    icon: Users,
    title: 'Aggregator / Middleman',
    desc: 'Bundle produce from multiple farms into bulk listings.',
  },
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics provider',
    desc: 'Get matched to delivery and transport requests near you.',
  },
  {
    id: 'extension',
    icon: GraduationCap,
    title: 'Extension worker',
    desc: 'Verify farms, share advisory content and support farmers.',
  },
]

const stats = [
  { value: '2,400+', label: 'Farmers' },
  { value: '17', label: 'LGAs covered' },
  { value: '₦180M+', label: 'Monthly trade' },
]

export default function ChooseRole() {
  const { setRole } = useAuth()
  const navigate = useNavigate()

  function handleSelect(roleId) {
    setRole(roleId)
    navigate('/auth/register')
  }

  return (
    <div className="min-h-screen flex bg-(--bg)">
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden p-6 border-b border-(--border)">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-navy-600 text-gold-300">
              <Sprout size={15} strokeWidth={2.25} />
            </span>
            <span className="font-display text-[18px] font-medium text-navy-700 dark:text-navy-100">
              AgriLink <span className="text-gold-600 dark:text-gold-400">Plateau</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-100">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-100 dark:bg-navy-800/70 border border-navy-200 dark:border-navy-700 text-[12.5px] font-medium text-navy-700 dark:text-navy-200 mb-5">
                Step 1 of 6
              </div>
              <h1 className="font-display text-[30px] font-medium text-navy-700 dark:text-navy-100 leading-tight">
                What brings you to AgriLink?
              </h1>
              <p className="mt-2 text-[15px] text-(--text-muted)">
                Choose your role — you can always add more later.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleSelect(role.id)}
                  className="group w-full flex items-center gap-4 p-4 rounded-2xl border border-(--border) bg-(--bg) hover:border-navy-400 hover:bg-navy-50 dark:hover:bg-navy-800/50 transition-all text-left cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-navy-600 flex items-center justify-center text-gold-300 shrink-0 group-hover:bg-navy-700 transition-colors">
                    <role.icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-(--text)">{role.title}</p>
                    <p className="text-[13px] text-(--text-muted) leading-snug mt-0.5">{role.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-(--text-muted) shrink-0 group-hover:text-navy-600 dark:group-hover:text-gold-400 transition-colors" />
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-[13.5px] text-(--text-muted)">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-navy-600 dark:text-gold-400 font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-(--text-muted) pb-6 px-6">
          © {new Date().getFullYear()} AgriLink Plateau · Built for Plateau State farmers
        </p>
      </div>

      <div className="hidden lg:flex lg:w-[48%] relative flex-col overflow-hidden">
        <img
          src="/farmer-interacting-with-farmers-apple-orchard.jpg"
          alt="Farmers at a Plateau State highland market"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-l from-navy-950/95 via-navy-900/60 to-navy-800/30" />

        <div className="relative z-10 p-8 flex flex-col h-full">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold-400 text-navy-900">
              <Sprout size={18} strokeWidth={2.25} />
            </span>
            <span className="font-display text-[20px] font-medium text-white">
              AgriLink <span className="text-gold-300">Plateau</span>
            </span>
          </Link>

          <div className="mt-auto p-0 pb-2">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
              ))}
            </div>

            <blockquote className="font-display text-[22px] text-white leading-[1.35] font-medium mb-6">
              Choose the role that fits your part in the market and open the next step with confidence.
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-display font-medium text-[15px] shrink-0">
                AL
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">AgriLink Plateau</p>
                <p className="text-[13px] text-white/55">Verified network for farmers and buyers</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-[22px] text-gold-300 font-medium">{s.value}</p>
                  <p className="text-[12px] text-white/50 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
