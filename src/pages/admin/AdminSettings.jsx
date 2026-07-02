import { useState } from 'react'
import { CheckCircle2, Globe, Shield, Bell, Database } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { FormInput } from '../../components/FormInput'
import Button from '../../components/Button'
import { adminProfile } from '../../data/adminData'

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
        <Icon size={16} className="text-navy-600 dark:text-gold-400" strokeWidth={2} />
        <h2 className="text-[15px] font-medium text-[var(--text)]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange, label, sub }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[14px] font-medium text-[var(--text)]">{label}</p>
        {sub && <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-navy-600' : 'bg-[var(--border-mid)]'}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  )
}

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: adminProfile.name, email: adminProfile.email, phone: '08033344455' })
  const [platform, setPlatform] = useState({ platformName: 'AgriLink Plateau', supportEmail: 'support@agrilinkplateau.ng', kycSla: '24', maxListingPhotos: '4' })
  const [notifs, setNotifs] = useState({ kycAlert: true, disputeAlert: true, newUserAlert: false, dailyReport: true, weeklyReport: true })
  const [security, setSecurity] = useState({ twoFactor: true, sessionTimeout: true, auditLog: true })
  const [pw, setPw] = useState({ current: '', newPw: '', confirm: '' })

  function setP(k)  { return e => setProfile(p  => ({ ...p,  [k]: e.target.value })) }
  function setPl(k) { return e => setPlatform(p => ({ ...p,  [k]: e.target.value })) }

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500) }

  return (
    <AdminLayout title="Settings">
      <div className="px-6 lg:px-8 py-8 max-w-[720px] mx-auto space-y-5">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Admin settings</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Manage your profile and platform configuration.</p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-[14px]">
            <CheckCircle2 size={16} /> Settings saved successfully.
          </div>
        )}

        {/* Admin profile */}
        <Section title="Admin profile" icon={Shield}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-clay-500 flex items-center justify-center text-white font-display font-medium text-[22px]">
                {adminProfile.avatar}
              </div>
              <div>
                <p className="text-[14px] font-medium text-[var(--text)]">{adminProfile.name}</p>
                <p className="text-[13px] text-[var(--text-muted)]">{adminProfile.role}</p>
                <button className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline mt-1">Change photo</button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Full name"  id="name"  value={profile.name}  onChange={setP('name')}  />
              <FormInput label="Phone"      id="phone" value={profile.phone} onChange={setP('phone')} type="tel" />
            </div>
            <FormInput label="Admin email" id="email" value={profile.email} onChange={setP('email')} type="email" />
          </div>
        </Section>

        {/* Platform config */}
        <Section title="Platform configuration" icon={Globe}>
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="Platform name"   id="platformName"   value={platform.platformName}   onChange={setPl('platformName')}   />
              <FormInput label="Support email"   id="supportEmail"   value={platform.supportEmail}   onChange={setPl('supportEmail')}   type="email" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="KYC SLA (hours)" id="kycSla"         value={platform.kycSla}         onChange={setPl('kycSla')}         type="number" hint="Target hours to review KYC" />
              <FormInput label="Max listing photos" id="maxPhotos"   value={platform.maxListingPhotos} onChange={setPl('maxListingPhotos')} type="number" />
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Admin notifications" icon={Bell}>
          <div className="divide-y divide-[var(--border)]">
            <Toggle label="KYC submission alerts"  sub="Notify when new KYC is submitted"       checked={notifs.kycAlert}     onChange={v => setNotifs(n=>({...n,kycAlert:v}))}     />
            <Toggle label="Dispute alerts"         sub="Notify when a new dispute is raised"    checked={notifs.disputeAlert} onChange={v => setNotifs(n=>({...n,disputeAlert:v}))} />
            <Toggle label="New user alerts"        sub="Notify on each new registration"        checked={notifs.newUserAlert} onChange={v => setNotifs(n=>({...n,newUserAlert:v}))} />
            <Toggle label="Daily summary report"   sub="Receive daily platform stats by email"  checked={notifs.dailyReport}  onChange={v => setNotifs(n=>({...n,dailyReport:v}))}  />
            <Toggle label="Weekly summary report"  sub="Receive weekly platform stats by email" checked={notifs.weeklyReport} onChange={v => setNotifs(n=>({...n,weeklyReport:v}))}  />
          </div>
        </Section>

        {/* Security */}
        <Section title="Security" icon={Shield}>
          <div className="divide-y divide-[var(--border)]">
            <Toggle label="Two-factor authentication" sub="Require 2FA for admin login"               checked={security.twoFactor}      onChange={v => setSecurity(s=>({...s,twoFactor:v}))}      />
            <Toggle label="Session timeout"           sub="Auto-logout after 30 minutes of inactivity" checked={security.sessionTimeout} onChange={v => setSecurity(s=>({...s,sessionTimeout:v}))} />
            <Toggle label="Audit log"                 sub="Log all admin actions for compliance"       checked={security.auditLog}       onChange={v => setSecurity(s=>({...s,auditLog:v}))}       />
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <h3 className="text-[14px] font-medium text-[var(--text)]">Change password</h3>
            <FormInput label="Current password" id="current" type="password" value={pw.current} onChange={e=>setPw(p=>({...p,current:e.target.value}))} placeholder="••••••••" />
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput label="New password"     id="newPw"   type="password" value={pw.newPw}   onChange={e=>setPw(p=>({...p,newPw:e.target.value}))}   placeholder="Min. 8 characters" />
              <FormInput label="Confirm password" id="confirm" type="password" value={pw.confirm} onChange={e=>setPw(p=>({...p,confirm:e.target.value}))} placeholder="Repeat password" />
            </div>
            <Button variant="outline" size="md" className="self-start">Update password</Button>
          </div>
        </Section>

        {/* Data */}
        <Section title="Data & platform" icon={Database}>
          <div className="flex flex-col gap-3">
            {[
              { label:'Export all users (CSV)',     sub:'Download full user list with roles and KYC status'   },
              { label:'Export all orders (CSV)',    sub:'Download complete order history'                      },
              { label:'Export market price log',   sub:'Download historical price data'                       },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--border-mid)] transition-colors">
                <div>
                  <p className="text-[14px] font-medium text-[var(--text)]">{item.label}</p>
                  <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">{item.sub}</p>
                </div>
                <button className="shrink-0 text-[13px] font-medium text-navy-600 dark:text-gold-400 hover:underline">Export</button>
              </div>
            ))}
          </div>
        </Section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={handleSave}>Save all changes</Button>
          <Button variant="outline" size="lg">Discard</Button>
        </div>
      </div>
    </AdminLayout>
  )
}
