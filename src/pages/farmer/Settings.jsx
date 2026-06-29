import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import { farmerProfile } from '../../data/farmerData'

const LGAS = ['Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu','Mikang','Pankshin',"Qua'an Pan",'Riyom','Shendam','Wase']

function Section({ title, children }) {
  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) overflow-hidden">
      <div className="px-6 py-4 border-b border-(--border) bg-(--bg-subtle)">
        <h2 className="text-[15px] font-medium text-(--text)">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[14px] font-medium text-(--text)">{label}</p>
        {sub && <p className="text-[13px] text-(--text-muted) mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-navy-600' : 'bg-(--border-mid)'}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`}/>
      </button>
    </div>
  )
}

export default function Settings() {
  const [saved, setSaved]   = useState(false)
  const [profile, setProfile] = useState({ firstName: farmerProfile.name.split(' ')[0], lastName: farmerProfile.name.split(' ')[1] || '', phone: '08012345678', email: 'danjuma@example.com', lga: 'Bokkos', farmName: farmerProfile.farmName, farmSize: '2 hectares', description: 'Highland potato and vegetable farm in Bokkos LGA.' })
  const [notifs, setNotifs]   = useState({ orderUpdates: true, newOffers: true, priceAlerts: false, smsAlerts: true, emailAlerts: true })
  const [pw, setPw]           = useState({ current: '', newPw: '', confirm: '' })

  function setP(k) { return e => setProfile(p=>({...p,[k]:e.target.value})) }
  function setN(k) { return v => setNotifs(n=>({...n,[k]:v})) }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <FarmerLayout title="Settings">
      <div className="px-6 lg:px-8 py-8 max-w-180 mx-auto space-y-5">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Settings</h1>
          <p className="text-[14px] text-(--text-muted) mt-1">Manage your profile, farm details and preferences.</p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[14px]">
            <CheckCircle2 size={16}/> Changes saved successfully.
          </div>
        )}

        {/* Profile */}
        <Section title="Personal information">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[22px]">
                {farmerProfile.avatar}
              </div>
              <div>
                <p className="text-[14px] font-medium text-(--text)">{farmerProfile.name}</p>
                <p className="text-[13px] text-(--text-muted)">Member since {farmerProfile.memberSince}</p>
                <button className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline mt-1">Change photo</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="First name" id="firstName" value={profile.firstName} onChange={setP('firstName')}/>
              <FormInput label="Last name"  id="lastName"  value={profile.lastName}  onChange={setP('lastName')}/>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Email"        id="email" type="email" value={profile.email} onChange={setP('email')}/>
              <FormInput label="Phone number" id="phone" type="tel"   value={profile.phone} onChange={setP('phone')}/>
            </div>
            <FormSelect label="LGA" id="lga" value={profile.lga} onChange={setP('lga')}>
              {LGAS.map(l => <option key={l} value={l}>{l}</option>)}
            </FormSelect>
          </div>
        </Section>

        {/* Farm details */}
        <Section title="Farm details">
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Farm name"     id="farmName" value={profile.farmName} onChange={setP('farmName')}/>
              <FormInput label="Farm size"     id="farmSize" value={profile.farmSize} onChange={setP('farmSize')} hint="e.g. 2 hectares"/>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13.5px] font-medium text-(--text)">Farm description</label>
              <textarea rows={3} value={profile.description} onChange={setP('description')}
                className="w-full px-4 py-3 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) placeholder:text-(--text-muted) text-[15px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <div className="divide-y divide-(--border)">
            <Toggle label="Order updates"   sub="Get notified when an order status changes"  checked={notifs.orderUpdates} onChange={setN('orderUpdates')}/>
            <Toggle label="New offers"      sub="Alert when a buyer makes an offer on your listing" checked={notifs.newOffers} onChange={setN('newOffers')}/>
            <Toggle label="Price alerts"    sub="Notify when market prices change significantly" checked={notifs.priceAlerts} onChange={setN('priceAlerts')}/>
            <Toggle label="SMS alerts"      sub="Receive alerts via SMS"                    checked={notifs.smsAlerts}    onChange={setN('smsAlerts')}/>
            <Toggle label="Email alerts"    sub="Receive alerts via email"                  checked={notifs.emailAlerts}  onChange={setN('emailAlerts')}/>
          </div>
        </Section>

        {/* Security */}
        <Section title="Change password">
          <div className="flex flex-col gap-4">
            <FormInput label="Current password" id="current" type="password" value={pw.current} onChange={e=>setPw(p=>({...p,current:e.target.value}))} placeholder="••••••••"/>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="New password"     id="newPw"   type="password" value={pw.newPw}   onChange={e=>setPw(p=>({...p,newPw:e.target.value}))}   placeholder="Min. 8 characters"/>
              <FormInput label="Confirm password" id="confirm" type="password" value={pw.confirm} onChange={e=>setPw(p=>({...p,confirm:e.target.value}))} placeholder="Repeat new password"/>
            </div>
            <Button variant="outline" size="md" className="self-start">Update password</Button>
          </div>
        </Section>

        {/* KYC status */}
        <Section title="Identity verification (KYC)">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} className="text-green-600 dark:text-green-400"/>
            </div>
            <div>
              <p className="text-[14.5px] font-medium text-(--text)">Identity verified</p>
              <p className="text-[13px] text-(--text-muted)">Your NIN and documents were approved. Buyers see a verified badge on your listings.</p>
            </div>
          </div>
        </Section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={handleSave}>Save all changes</Button>
          <Button variant="outline" size="lg">Discard</Button>
        </div>
      </div>
    </FarmerLayout>
  )
}
