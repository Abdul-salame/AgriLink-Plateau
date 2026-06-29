import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Sprout, Star } from 'lucide-react'
import { FormInput } from '../../components/FormInput'
import Button from '../../components/Button'
import { useAuth } from '../../lib/AuthContext'

const QUOTES = [
  {
    text: "Before AgriLink, I sold my tomatoes at whatever price the middleman offered. Now I know the real market rate before I even pick up the phone.",
    author: "Muqbal Bello",
    role: "Tomato farmer, Barkin Ladi LGA",
    initials: "MB",
  },
  {
    text: "I connected with a buyer in Jos within two hours of listing my potato harvest. No transport stress, no price negotiation in the dark.",
    author: "Abduljalil Tajudeen",
    role: "Irish potato farmer, Bokkos LGA",
    initials: "AT",
  },
  {
    text: "As a buyer, I finally know exactly who grew what I'm purchasing and where it came from. That trust is worth everything.",
    author: "Abdulslam Abdulwasiu",
    role: "Produce buyer, Jos North",
    initials: "AA",
  },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Pick a random quote on mount
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])

  function handleSubmit() {
    const errs = {}
    if (!email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email'
    if (!password) errs.password = 'Password is required'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setTimeout(() => {
      login({ user: { email }, role: 'farmer', kycStatus: 'approved', isLoggedIn: true })
      navigate('/farmer/dashboard')
    }, 900)
  }

  return (
    <div className="min-h-screen flex bg-(--bg)">

      {/* Left */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col overflow-hidden">
        {/* Background image */}
        <img
          src="/african-man-harvesting-vegetables.jpg"
          alt="Farmers at a Plateau State highland market"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient  */}
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-900/60 to-navy-800/30" />

        {/* Logo top-left */}
        <div className="relative z-10 p-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-gold-400 text-navy-900">
              <Sprout size={18} strokeWidth={2.25} />
            </span>
            <span className="font-display text-[20px] font-medium text-white">
              AgriLink <span className="text-gold-300">Plateau</span>
            </span>
          </Link>
        </div>

        {/* Quote card bottom */}
        <div className="relative z-10 mt-auto p-8 pb-10">
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
            ))}
          </div>

          <blockquote className="font-display text-[22px] text-white leading-[1.35] font-medium mb-6">
            "{quote.text}"
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-display font-medium text-[15px] shrink-0">
              {quote.initials}
            </div>
            <div>
              <p className="text-[14px] font-medium text-white">{quote.author}</p>
              <p className="text-[13px] text-white/55">{quote.role}</p>
            </div>
          </div>

          {/*  platform stat  */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-4">
            {[
              { value: '2,400+', label: 'Farmers' },
              { value: '17', label: 'LGAs covered' },
              { value: '₦180M+', label: 'Monthly trade' },
            ].map(s => (
              <div key={s.label}>
                <p className="font-display text-[22px] text-gold-300 font-medium">{s.value}</p>
                <p className="text-[12px] text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* form  */}
      <div className="flex-1 flex flex-col">
        {/* Mobile logo (hidden on desktop since left panel has it) */}
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

        {/* Form centred vertically */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-100">

            <div className="mb-8">
              <h1 className="font-display text-[30px] font-medium text-navy-700 dark:text-navy-100 leading-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-[15px] text-(--text-muted)">
                Log in to your AgriLink Plateau account.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <FormInput
                label="Email address" id="email" type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })) }}
                error={errors.email}
              />

              <div className="relative">
                <FormInput
                  label="Password" id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: undefined })) }}
                  error={errors.password}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-8.25 text-(--text-muted) hover:text-(--text) transition-colors p-1">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex justify-end -mt-2">
                <a href="#" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button variant="primary" size="lg" className="w-full"
                onClick={handleSubmit} disabled={loading}>
                {loading ? 'Logging in…' : 'Log in'}
              </Button>

              <div className="relative flex items-center gap-3">
                <div className="flex-1 h-px bg-(--border)" />
                <span className="text-[12.5px] text-(--text-muted)">or</span>
                <div className="flex-1 h-px bg-(--border)" />
              </div>

              <Button as={Link} to="/auth/role" variant="outline" size="lg" className="w-full">
                Create a new account
              </Button>

              <p className="text-center text-[12.5px] text-(--text-muted)">
                Having trouble?{' '}
                <a href="#" className="text-navy-600 dark:text-gold-400 hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[12px] text-(--text-muted) pb-6 px-6">
          © {new Date().getFullYear()} AgriLink Plateau · Built for Plateau State farmers
        </p>
      </div>
    </div>
  )
}
