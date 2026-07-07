import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, ShieldCheck, Plus, AlertTriangle, Users, Newspaper, CheckCircle2, Clock, Hand } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ExtensionLayout from '../../layouts/ExtensionLayout'
import Button from '../../components/Button'
import { extensionProfile, extensionStats, verificationQueue, supportedFarmers, advisories, verificationChart } from '../../data/extensionData'

function StatCard({ stat }) {
  return (
    <div className={`bg-[var(--bg)] rounded-2xl border p-5 flex flex-col gap-3 ${stat.trend==='alert'?'border-clay-300 dark:border-clay-700':'border-[var(--border)]'}`}>
      {stat.trend==='alert'&&<div className="flex items-center gap-1.5 text-clay-500 text-[12px] font-medium"><AlertTriangle size={13}/>Needs action</div>}
      <p className="text-[13px] text-[var(--text-muted)]">{stat.label}</p>
      <p className={`font-display text-[28px] font-medium leading-none ${stat.trend==='alert'?'text-clay-500':'text-navy-700 dark:text-navy-100'}`}>{stat.value}</p>
      <p className={`text-[12.5px] flex items-center gap-1 ${stat.trend==='up'?'text-green-600 dark:text-green-400':stat.trend==='alert'?'text-clay-500':'text-[var(--text-muted)]'}`}>
        {stat.trend==='up'&&<TrendingUp size={13}/>}{stat.sub}
      </p>
    </div>
  )
}

const CATEGORY_COLOR = {
  'Pest & Disease':'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Planting Guide':'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Weather Alert':'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Policy':'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
}

export default function ExtensionDashboard() {
  const today = new Date().toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric'})
  const pending = verificationQueue.filter(v=>v.status==='pending')

  return (
    <ExtensionLayout title="Dashboard">
      <div className="p-6 lg:p-8 max-w-[1280px] mx-auto space-y-7">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100 flex items-center gap-2">Good morning, {extensionProfile.firstName}<Hand size={18} className="text-gold-500" /></h2>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">{today} · {extensionProfile.affiliation}</p>
          </div>
          <Button as={Link} to="/extension/advisories" variant="accent" size="md"><Plus size={16}/>Post advisory</Button>
        </div>

        {/* Alert banner */}
        {pending.length > 0 && (
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gold-400/10 border border-gold-400/30">
            <div className="w-10 h-10 rounded-xl bg-gold-400 flex items-center justify-center text-navy-900 shrink-0"><ShieldCheck size={18} strokeWidth={2}/></div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-gold-800 dark:text-gold-300">{pending.length} farm verifications pending — 2 farm visits overdue</p>
              <p className="text-[13px] text-gold-700/70 dark:text-gold-400/70 mt-0.5">Schedule your visits to keep farmers on track with verification.</p>
            </div>
            <Link to="/extension/verifications" className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-400 text-navy-900 text-[13.5px] font-medium hover:bg-gold-500 transition-colors">
              View queue<ArrowRight size={14}/>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {extensionStats.map(s=><StatCard key={s.label} stat={s}/>)}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">

            {/* Verifications chart */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Farm verifications per month</h3>
                <span className="text-[13px] text-[var(--text-muted)]">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={verificationChart} margin={{top:4,right:4,left:0,bottom:0}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                  <XAxis dataKey="month" tick={{fontSize:12,fill:'var(--text-muted)'}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:'var(--text-muted)'}} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,fontSize:13}}/>
                  <Bar dataKey="verified" name="Verified" fill="#14b8a6" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Verification queue preview */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Verification queue</h3>
                <Link to="/extension/verifications" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">View all<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {verificationQueue.filter(v=>v.status==='pending').slice(0,4).map(v=>(
                  <div key={v.id} className="px-6 py-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${v.visited?'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400':'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400'}`}>
                      {v.visited?<CheckCircle2 size={17} strokeWidth={2}/>:<Clock size={17} strokeWidth={2}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[var(--text)]">{v.farmer}</p>
                      <p className="text-[12.5px] text-[var(--text-muted)]">{v.produce} · {v.lga} · Req. {v.requestDate}</p>
                    </div>
                    <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full shrink-0 ${v.visited?'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400'}`}>
                      {v.visited?'Visited':'Not visited'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Quick actions */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-medium text-[15px] text-[var(--text)] mb-4">Quick actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {label:'Post advisory',    icon:Plus,         path:'/extension/advisories', accent:true},
                  {label:'Verifications',    icon:ShieldCheck,  path:'/extension/verifications'},
                  {label:'My farmers',       icon:Users,        path:'/extension/farmers'},
                  {label:'All advisories',   icon:Newspaper,    path:'/extension/advisories'},
                ].map(a=>(
                  <Link key={a.label} to={a.path} className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition-all text-center ${a.accent?'bg-navy-600 border-navy-600 text-white hover:bg-navy-700':'border-[var(--border)] text-[var(--text)] hover:border-[var(--border-mid)] hover:bg-[var(--bg-subtle)]'}`}>
                    <a.icon size={18} strokeWidth={2}/>
                    <span className="text-[13px] font-medium">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent advisories */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Recent advisories</h3>
                <Link to="/extension/advisories" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">All<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {advisories.slice(0,3).map(a=>(
                  <div key={a.id} className="px-5 py-4">
                    {a.urgent&&<div className="flex items-center gap-1 text-[11.5px] text-red-600 dark:text-red-400 font-medium mb-1.5"><AlertTriangle size={11}/>Urgent</div>}
                    <p className="text-[14px] font-medium text-[var(--text)] leading-snug">{a.title}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOR[a.category]||'bg-[var(--bg-subtle)] text-[var(--text-muted)]'}`}>{a.category}</span>
                      <span className="text-[12px] text-[var(--text-muted)]">{a.reach} farmers reached</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmers supported */}
            <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
                <h3 className="font-medium text-[15px] text-[var(--text)]">Farmers I support</h3>
                <Link to="/extension/farmers" className="text-[13px] text-navy-600 dark:text-gold-400 hover:underline flex items-center gap-1">All {supportedFarmers.length}<ArrowRight size={13}/></Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {supportedFarmers.slice(0,4).map(f=>(
                  <div key={f.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[13px] shrink-0">{f.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-medium text-[var(--text)] truncate">{f.name}</p>
                      <p className="text-[12px] text-[var(--text-muted)] truncate">{f.produce} · {f.lga}</p>
                    </div>
                    {f.verified&&<span className="text-[10.5px] font-medium text-green-600 dark:text-green-400 shrink-0">✓ Verified</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExtensionLayout>
  )
}
