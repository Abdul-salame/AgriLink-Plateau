import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import { useAuth } from '../../lib/AuthContext'

const PLATEAU_LGAS = [
  'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South',
  'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang',
  'Pankshin', 'Qua\'an Pan', 'Riyom', 'Shendam', 'Wase',
]

function validate(fields) {
  const errors = {}
  if (!fields.firstName.trim()) errors.firstName = 'First name is required'
  if (!fields.lastName.trim()) errors.lastName = 'Last name is required'
  if (!fields.email.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'Enter a valid email'
  if (!fields.phone.trim()) errors.phone = 'Phone number is required'
  else if (!/^(\+234|0)[789][01]\d{8}$/.test(fields.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid Nigerian phone number'
  if (!fields.lga) errors.lga = 'Select your LGA'
  if (!fields.password) errors.password = 'Password is required'
  else if (fields.password.length < 8) errors.password = 'At least 8 characters'
  if (fields.password !== fields.confirm) errors.confirm = 'Passwords do not match'
  return errors
}

export default function Register() {
  const { authState, register } = useAuth()
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', phone: '', lga: '', password: '', confirm: '',
  })
  const [errors, setErrors] = useState({})

  function set(key) {
    return (e) => setFields(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit() {
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setErrors({})

    try {
      await register({
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phone: fields.phone,
        password: fields.password,
        role: authState.role,
        lga: fields.lga,
      })
      navigate('/auth/verify-otp')
    } catch (err) {
      setErrors({ form: err.response?.data?.message || 'Unable to create account. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const roleLabels = {
    farmer: 'Farmer', buyer: 'Buyer', aggregator: 'Aggregator',
    logistics: 'Logistics provider', extension: 'Extension worker',
  }

  return (
    <AuthLayout
      step={2}
      totalSteps={6}
      title="Create your account"
      subtitle={`Registering as a ${roleLabels[authState.role] ?? 'user'}`}
      backTo="/auth/role"
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="First name" id="firstName" placeholder="Danjuma"
            value={fields.firstName} onChange={set('firstName')} error={errors.firstName} />
          <FormInput label="Last name" id="lastName" placeholder="Pwajok"
            value={fields.lastName} onChange={set('lastName')} error={errors.lastName} />
        </div>

        <FormInput label="Email address" id="email" type="email" placeholder="you@example.com"
          value={fields.email} onChange={set('email')} error={errors.email} />

        <FormInput label="Phone number" id="phone" type="tel" placeholder="+234 801 234 5678"
          value={fields.phone} onChange={set('phone')} error={errors.phone}
          hint="We'll send a verification code to this number" />

        <FormSelect label="LGA (Plateau State)" id="lga"
          value={fields.lga} onChange={set('lga')} error={errors.lga}>
          <option value="">Select your LGA</option>
          {PLATEAU_LGAS.map(l => <option key={l} value={l}>{l}</option>)}
        </FormSelect>

        <div className="relative">
          <FormInput label="Password" id="password" type={showPw ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={fields.password} onChange={set('password')} error={errors.password} />
          <button type="button" onClick={() => setShowPw(v => !v)}
            className="absolute right-3 top-8.25 text-(--text-muted) hover:text-(--text) transition-colors p-1">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="relative">
          <FormInput label="Confirm password" id="confirm" type={showConfirm ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={fields.confirm} onChange={set('confirm')} error={errors.confirm} />
          <button type="button" onClick={() => setShowConfirm(v => !v)}
            className="absolute right-3 top-8.25 text-(--text-muted) hover:text-(--text) transition-colors p-1">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <p className="text-[12.5px] text-(--text-muted) leading-relaxed">
          By creating an account you agree to our{' '}
          <a href="#" className="text-navy-600 dark:text-gold-400 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="text-navy-600 dark:text-gold-400 hover:underline">Privacy Policy</a>.
        </p>

        {errors.form && (
          <p className="text-[13px] text-red-500">{errors.form}</p>
        )}

        <Button variant="primary" size="lg" className="w-full mt-1" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating account…' : 'Continue'}
        </Button>
      </div>

      <p className="mt-6 text-center text-[13.5px] text-(--text-muted)">
        Already have an account?{' '}
        <a href="/auth/login" className="text-navy-600 dark:text-gold-400 font-medium hover:underline">Log in</a>
      </p>
    </AuthLayout>
  )
}
