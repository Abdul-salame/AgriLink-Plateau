import { useState } from 'react'
import { Plus, X, CheckCircle2, AlertTriangle } from 'lucide-react'
import ExtensionLayout from '../../layouts/ExtensionLayout'
import { FormInput, FormSelect } from '../../components/FormInput'
import Button from '../../components/Button'
import { advisories as initial } from '../../data/extensionData'

const CATEGORIES = ['Pest & Disease','Planting Guide','Weather Alert','Policy','Soil Health','Market Info']
const CATEGORY_COLOR = {
  'Pest & Disease':'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Planting Guide':'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Weather Alert':'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Policy':'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Soil Health':'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Market Info':'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-200',
}

function NewAdvisoryModal({ onClose, onPost }) {
  const [fields, setFields] = useState({ title:'', category:'Pest & Disease', body:'', urgent:false })
  const [done, setDone] = useState(false)

  if (done) return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={28} className="text-green-600 dark:text-green-400"/></div>
        <h3 className="font-display text-[22px] text-navy-700 dark:text-navy-100 mb-2">Advisory posted!</h3>
        <p className="text-[14px] text-[var(--text-muted)] mb-6">Your advisory has been sent to all farmers in your network.</p>
        <Button variant="primary" size="md" onClick={onClose} className="w-full">Done</Button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[20px] text-navy-700 dark:text-navy-100">Post advisory</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]"><X size={18}/></button>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput label="Title" id="title" placeholder="e.g. Early blight alert — tomato farmers in Barkin Ladi" value={fields.title} onChange={e=>setFields(f=>({...f,title:e.target.value}))}/>
          <FormSelect label="Category" id="category" value={fields.category} onChange={e=>setFields(f=>({...f,category:e.target.value}))}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </FormSelect>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Advisory content</label>
            <textarea rows={5} value={fields.body} onChange={e=>setFields(f=>({...f,body:e.target.value}))} placeholder="Write your advisory message here. Be clear and actionable…"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-[15px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>setFields(f=>({...f,urgent:!f.urgent}))}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${fields.urgent?'bg-red-500':'bg-[var(--border-mid)]'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${fields.urgent?'left-6':'left-1'}`}/>
            </button>
            <div>
              <p className="text-[14px] font-medium text-[var(--text)]">Mark as urgent</p>
              <p className="text-[12.5px] text-[var(--text-muted)]">Urgent advisories are pinned and highlighted for farmers</p>
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="primary" size="md" className="flex-1" onClick={()=>{if(fields.title&&fields.body)setDone(true)}}>Post advisory</Button>
            <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Advisories() {
  const [advisories] = useState(initial)
  const [showModal, setShowModal] = useState(false)

  return (
    <ExtensionLayout title="Advisories">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Advisories</h1>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">{advisories.length} advisories posted</p>
          </div>
          <Button variant="accent" size="md" onClick={()=>setShowModal(true)}><Plus size={16}/>Post advisory</Button>
        </div>

        <div className="flex flex-col gap-4">
          {advisories.map(a=>(
            <div key={a.id} className={`bg-[var(--bg)] rounded-2xl border p-5 flex flex-col gap-3 ${a.urgent?'border-red-200 dark:border-red-800':'border-[var(--border)]'}`}>
              {a.urgent && <div className="flex items-center gap-1.5 text-[12px] font-medium text-red-600 dark:text-red-400"><AlertTriangle size={12}/>Urgent</div>}
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[15px] font-medium text-[var(--text)] leading-snug">{a.title}</h3>
                <span className="text-[12px] text-[var(--text-muted)] shrink-0">{a.date}</span>
              </div>
              <p className="text-[13.5px] text-[var(--text-muted)] leading-relaxed">{a.body}</p>
              <div className="flex items-center gap-3">
                <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLOR[a.category]||'bg-[var(--bg-subtle)] text-[var(--text-muted)]'}`}>{a.category}</span>
                <span className="text-[12.5px] text-[var(--text-muted)]">{a.reach} farmers reached</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <NewAdvisoryModal onClose={()=>setShowModal(false)} onPost={()=>{}} />}
    </ExtensionLayout>
  )
}
