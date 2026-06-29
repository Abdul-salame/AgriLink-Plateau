import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import { useAuth } from '../../lib/AuthContext'

export default function VerifyOtp() {
  const { authState } = useAuth()
  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resent, setResent] = useState(false)
  const refs = useRef([])

  function handleDigit(i, val) {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    setError('')
    if (val && i < 5) refs.current[i + 1]?.focus()
  }

  function handleKeyDown(i, e) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setDigits(pasted.split(''))
      refs.current[5]?.focus()
    }
    e.preventDefault()
  }

  function handleVerify() {
    const code = digits.join('')
    if (code.length < 6) { setError('Enter the 6-digit code'); return }
    setLoading(true)
    // Mock: any 6 digits pass
    setTimeout(() => {
      navigate('/auth/kyc-nin')
    }, 900)
  }

  function handleResend() {
    setResent(true)
    setDigits(['', '', '', '', '', ''])
    refs.current[0]?.focus()
    setTimeout(() => setResent(false), 4000)
  }

  const phone = authState.user?.phone ?? '+234 *** *** ****'

  return (
    <AuthLayout
      step={3}
      totalSteps={6}
      title="Check your phone"
      subtitle={`We sent a 6-digit code to ${phone}. Enter it below to continue.`}
      backTo="/auth/register"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-navy-600 dark:text-gold-400">
          <MessageSquare size={26} strokeWidth={1.8} />
        </div>

        <div className="flex gap-3" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className={`w-12 h-14 rounded-xl border text-center text-[22px] font-mono font-medium bg-(--bg) text-(--text) outline-none transition-all
                ${error ? 'border-red-400' : d ? 'border-navy-500 ring-2 ring-navy-200 dark:ring-navy-800' : 'border-(--border-mid) focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800'}`}
            />
          ))}
        </div>

        {error && <p className="text-[13px] text-red-500 -mt-2">{error}</p>}
        {resent && <p className="text-[13px] text-green-600 dark:text-green-400 -mt-2">Code resent successfully</p>}

        <Button variant="primary" size="lg" className="w-full" onClick={handleVerify} disabled={loading}>
          {loading ? 'Verifying…' : 'Verify code'}
        </Button>

        <button onClick={handleResend}
          className="text-[13.5px] text-(--text-muted) hover:text-navy-600 dark:hover:text-gold-400 transition-colors">
          Didn't receive a code? <span className="font-medium">Resend</span>
        </button>

        <p className="text-[12.5px] text-(--text-muted) text-center max-w-xs">
          For testing, any 6-digit code will work. Real SMS verification will be active in production.
        </p>
      </div>
    </AuthLayout>
  )
}
