import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import ExtensionLayout from '../../layouts/ExtensionLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import { extensionProfile } from '../../data/extensionData'

const LGAS = ['Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu','Mikang','Pankshin',"Qua'an Pan",'Riyom','Shendam','Wase']

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

export default function ExtensionSettings() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: extensionProfile.name, email:'rejoice@plateau.gov.ng', phone:'08033344455', lga:'Riyom', affiliation: extensionProfile.affiliation })
  const [notifs, setNotifs] = useState({ verifications:true, farmerMessages:true, sms:true })
  function setP(k) { return e => setProfile(p=>({...p,[k]:e.target.value})) }

  return (
    <ExtensionLayout title="Settings">
      <div className="px-6 lg:px-8 py-8 max-w-[720px] mx-auto space-y-5">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Settings</h1>
        </div>
        {saved&&<div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[14px]"><CheckCircle2 size={16}/>Changes saved.</div>}
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6 flex flex-col gap-4">
          <h2 className="text-[15px] font-medium text-[var(--text)] pb-2 border-b border-[var(--border)]">Profile</h2>
          <FormInput label="Full name"    id="name"        value={profile.name}        onChange={setP('name')}/>
          <FormInput label="Affiliation"  id="affiliation" value={profile.affiliation} onChange={setP('affiliation')} hint="e.g. Plateau State Ministry of Agriculture"/>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Email" id="email" type="email" value={profile.email} onChange={setP('email')}/>
            <FormInput label="Phone" id="phone" type="tel"   value={profile.phone} onChange={setP('phone')}/>
          </div>
          <FormSelect label="Primary LGA" id="lga" value={profile.lga} onChange={setP('lga')}>
            {LGAS.map(l=><option key={l}>{l}</option>)}
          </FormSelect>
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
          <h2 className="text-[15px] font-medium text-[var(--text)] pb-2 border-b border-[var(--border)] mb-2">Notifications</h2>
          <div className="divide-y divide-[var(--border)]">
            <Toggle label="Verification requests" sub="When a farmer requests farm verification" checked={notifs.verifications}   onChange={v=>setNotifs(n=>({...n,verifications:v}))}/>
            <Toggle label="Farmer messages"       sub="When a farmer sends you a message"        checked={notifs.farmerMessages} onChange={v=>setNotifs(n=>({...n,farmerMessages:v}))}/>
            <Toggle label="SMS alerts"            sub="Receive all alerts via SMS"               checked={notifs.sms}            onChange={v=>setNotifs(n=>({...n,sms:v}))}/>
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2500)}}>Save changes</Button>
      </div>
    </ExtensionLayout>
  )
}
