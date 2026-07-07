import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import { FormInput } from '../../components/FormInput'
import Button from '../../components/Button'
import { logisticsProfile } from '../../data/logisticsData'

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[14px] font-medium text-[var(--text)]">{label}</p>
        {sub&&<p className="text-[13px] text-[var(--text-muted)] mt-0.5">{sub}</p>}
      </div>
      <button onClick={()=>onChange(!checked)} className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked?'bg-navy-600':'bg-[var(--border-mid)]'}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked?'left-6':'left-1'}`}/>
      </button>
    </div>
  )
}

export default function LogisticsSettings() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ contactName: logisticsProfile.contactName, email:'emmanuel@example.com', phone:'08044455566' })
  const [notifs, setNotifs] = useState({ requests:true, updates:true, sms:true })
  function setP(k) { return e => setProfile(p=>({...p,[k]:e.target.value})) }

  return (
    <LogisticsLayout title="Settings">
      <div className="px-6 lg:px-8 py-8 max-w-[600px] mx-auto space-y-5">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Settings</h1>
        </div>
        {saved&&<div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[14px]"><CheckCircle2 size={16}/>Changes saved.</div>}
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 flex flex-col gap-4">
          <h2 className="text-[15px] font-medium text-[var(--text)] pb-2 border-b border-[var(--border)]">Contact details</h2>
          <FormInput label="Contact name" id="contactName" value={profile.contactName} onChange={setP('contactName')}/>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Email" id="email" type="email" value={profile.email} onChange={setP('email')}/>
            <FormInput label="Phone" id="phone" type="tel"   value={profile.phone} onChange={setP('phone')}/>
          </div>
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
          <h2 className="text-[15px] font-medium text-[var(--text)] pb-2 border-b border-[var(--border)] mb-2">Notifications</h2>
          <div className="divide-y divide-[var(--border)]">
            <Toggle label="New delivery requests" sub="When a farmer requests a pickup"    checked={notifs.requests} onChange={v=>setNotifs(n=>({...n,requests:v}))}/>
            <Toggle label="Delivery updates"      sub="Status changes on your deliveries"  checked={notifs.updates}  onChange={v=>setNotifs(n=>({...n,updates:v}))}/>
            <Toggle label="SMS alerts"            sub="Receive all alerts via SMS"         checked={notifs.sms}      onChange={v=>setNotifs(n=>({...n,sms:v}))}/>
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}>Save changes</Button>
      </div>
    </LogisticsLayout>
  )
}
