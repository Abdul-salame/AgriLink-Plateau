import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Info } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import { FormInput } from '../../components/FormInput'
import Button from '../../components/Button'
import { useAuth } from '../../lib/AuthContext'

function validateNin(nin) {
  if (!nin) return 'NIN is required'
  if (!/^\d{11}$/.test(nin)) return 'NIN must be exactly 11 digits'
  return null
}

function validateDob(dob) {
  if (!dob) return 'Date of birth is required'
  const d = new Date(dob)
  const now = new Date()
  const age = (now - d) / (1000 * 60 * 60 * 24 * 365.25)
  if (age < 18) return 'You must be at least 18 years old'
  return null
}

export default function KycNin() {
  const { submitKyc } = useAuth()
  const navigate = useNavigate()
  const [nin, setNin] = useState('')
  const [dob, setDob] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    const errs = {}
    const ninErr = validateNin(nin)
    const dobErr = validateDob(dob)
    if (ninErr) errs.nin = ninErr
    if (dobErr) errs.dob = dobErr
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    // Simulate NIN format check (real check = VSP API call)
    setTimeout(() => {
      submitKyc({ nin, dateOfBirth: dob })
      navigate('/auth/kyc-upload')
    }, 1200)
  }

  return (
    <AuthLayout
      step={4}
      totalSteps={6}
      title="Enter your NIN"
      subtitle="Your National Identification Number helps us verify your identity and build trust with buyers and farmers."
      backTo="/auth/verify-otp"
    >
      <div className="flex flex-col gap-5">
        {/* Info card */}
        <div className="flex gap-3 p-4 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200 dark:border-navy-700">
          <ShieldCheck size={18} className="text-navy-600 dark:text-gold-400 shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[13px] text-navy-700 dark:text-navy-200 leading-relaxed">
            Your NIN is encrypted and only used for verification. It is never shared with buyers, 
            sellers, or any third party without your consent.
          </p>
        </div>

        <FormInput
          label="National Identification Number (NIN)"
          id="nin"
          type="text"
          inputMode="numeric"
          placeholder="12345678901"
          maxLength={11}
          value={nin}
          onChange={e => {
            setNin(e.target.value.replace(/\D/g, ''))
            setErrors(er => ({ ...er, nin: undefined }))
          }}
          error={errors.nin}
          hint="Your 11-digit NIN from your NIMC slip or NIN card"
        />

        <div className="flex items-center justify-between text-[12px] text-(--text-muted) -mt-2 px-1">
          <span>{nin.length}/11 digits entered</span>
          {nin.length === 11 && (
            <span className="text-green-600 dark:text-green-400 font-medium">✓ Correct length</span>
          )}
        </div>

        <FormInput
          label="Date of birth"
          id="dob"
          type="date"
          value={dob}
          onChange={e => {
            setDob(e.target.value)
            setErrors(er => ({ ...er, dob: undefined }))
          }}
          error={errors.dob}
          hint="Must match what's on your NIN record"
        />

        {/* NIMC note */}
        <div className="flex gap-2 p-3 rounded-lg bg-(--bg-subtle) border border-(--border)">
          <Info size={14} className="text-(--text-muted) shrink-0 mt-0.5" />
          <p className="text-[12px] text-(--text-muted) leading-relaxed">
            Don't have a NIN? Visit your nearest{' '}
            <a href="https://nimc.gov.ng" target="_blank" rel="noreferrer"
              className="text-navy-600 dark:text-gold-400 hover:underline">
              NIMC office
            </a>{' '}
            or enrol online at nimc.gov.ng. NIN enrolment is free.
          </p>
        </div>

        <Button
          variant="primary" size="lg" className="w-full mt-1"
          onClick={handleSubmit} disabled={loading}
        >
          {loading ? 'Checking NIN…' : 'Continue to document upload'}
        </Button>
      </div>
    </AuthLayout>
  )
}
