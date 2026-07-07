import { useState } from 'react'
import { CheckCircle2, Clock, ShieldCheck, X } from 'lucide-react'
import ExtensionLayout from '../../layouts/ExtensionLayout'
import { verificationQueue as initial } from '../../data/extensionData'

const STATUS_STYLE = {
  pending:  'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
}

export default function FarmVerifications() {
  const [queue, setQueue] = useState(initial)
  const [filter, setFilter] = useState('all')

  function approve(id) { setQueue(q=>q.map(x=>x.id===id?{...x,status:'approved',visited:true}:x)) }
  function markVisited(id) { setQueue(q=>q.map(x=>x.id===id?{...x,visited:true}:x)) }

  const filtered = queue.filter(v=>filter==='all'||v.status===filter)
  const pendingCount = queue.filter(v=>v.status==='pending').length

  return (
    <ExtensionLayout title="Farm Verifications">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Farm verifications</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{pendingCount} pending · {queue.filter(v=>v.status==='approved').length} approved</p>
        </div>

        <div className="flex items-center gap-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl p-1 mb-6 w-fit">
          {[['all','All'],['pending','Pending'],['approved','Approved']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)} className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${filter===v?'bg-navy-600 text-white':'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>{l}</button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.map(v=>(
            <div key={v.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${v.visited?'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400':'bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400'}`}>
                    {v.visited?<CheckCircle2 size={18} strokeWidth={2}/>:<Clock size={18} strokeWidth={2}/>}
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[var(--text)]">{v.farmer}</p>
                    <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{v.produce} · {v.lga} · Req. {v.requestDate}</p>
                  </div>
                </div>
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${STATUS_STYLE[v.status]}`}>{v.status}</span>
              </div>
              {v.status==='pending' && (
                <div className="flex flex-wrap gap-3">
                  {!v.visited && (
                    <button onClick={()=>markVisited(v.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] text-[13.5px] text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors">
                      <Clock size={14}/> Mark farm visited
                    </button>
                  )}
                  {v.visited && (
                    <button onClick={()=>approve(v.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[13.5px] font-medium transition-colors">
                      <ShieldCheck size={14}/> Award verified badge
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ExtensionLayout>
  )
}
