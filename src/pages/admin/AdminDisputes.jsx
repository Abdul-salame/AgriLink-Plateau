import { useState } from 'react'
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { disputes as initial } from '../../data/adminData'

const PRIORITY_STYLE = {
  high:   'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  low:    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
}

function DisputeCard({ dispute, onResolve }) {
  const [expanded, setExpanded] = useState(false)
  const [note, setNote]         = useState('')

  return (
    <div className={`bg-(--bg) rounded-2xl border overflow-hidden ${dispute.status === 'open' && dispute.priority === 'high' ? 'border-red-200 dark:border-red-800' : 'border-(--border)'}`}>
      <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => setExpanded(v => !v)}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${dispute.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
          {dispute.status === 'resolved' ? <CheckCircle2 size={18} strokeWidth={2} /> : <AlertTriangle size={18} strokeWidth={2} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-mono text-[12.5px] text-(--text-muted)">{dispute.id}</span>
            <span className="font-mono text-[12px] text-(--text-muted)">→ {dispute.order}</span>
            <span className={`text-[11.5px] font-medium px-2 py-0.5 rounded-full capitalize ${PRIORITY_STYLE[dispute.priority]}`}>{dispute.priority} priority</span>
          </div>
          <p className="text-[14.5px] font-medium text-(--text)">{dispute.buyer} vs {dispute.farmer}</p>
          <p className="text-[13px] text-(--text-muted) mt-0.5 line-clamp-1">{dispute.issue}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${dispute.status === 'resolved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>{dispute.status}</span>
          <span className="text-[12px] text-(--text-muted)">{dispute.date}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-(--text-muted) shrink-0 mt-1" /> : <ChevronDown size={16} className="text-(--text-muted) shrink-0 mt-1" />}
      </div>

      {expanded && (
        <div className="border-t border-(--border) p-5 flex flex-col gap-4 bg-(--bg-subtle)">
          <div>
            <p className="text-[13px] font-medium text-(--text-muted) mb-1.5">Issue reported</p>
            <p className="text-[14px] text-(--text) leading-relaxed">{dispute.issue}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-[13.5px]">
            <div className="p-3.5 rounded-xl bg-(--bg) border border-(--border)">
              <p className="text-(--text-muted) text-[12.5px] mb-1">Buyer</p>
              <p className="font-medium text-(--text)">{dispute.buyer}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-(--bg) border border-(--border)">
              <p className="text-(--text-muted) text-[12.5px] mb-1">Farmer</p>
              <p className="font-medium text-(--text)">{dispute.farmer}</p>
            </div>
          </div>

          {dispute.status === 'open' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13.5px] font-medium text-(--text)">Resolution note</label>
                <textarea rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="Describe how this dispute was resolved (sent to both parties)…"
                  className="w-full px-4 py-3 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) placeholder:text-(--text-muted) text-[14px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all" />
              </div>
              <button onClick={() => onResolve(dispute.id)}
                className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[13.5px] font-medium transition-colors">
                <CheckCircle2 size={15} /> Mark as resolved
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState(initial)
  const [filter, setFilter]     = useState('all')

  function onResolve(id) { setDisputes(d => d.map(x => x.id === id ? { ...x, status:'resolved' } : x)) }

  const openCount     = disputes.filter(d => d.status === 'open').length
  const resolvedCount = disputes.filter(d => d.status === 'resolved').length

  const filtered = disputes.filter(d => filter === 'all' || d.status === filter)

  return (
    <AdminLayout title="Disputes">
      <div className="px-6 lg:px-8 py-8 max-w-225 mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Disputes</h1>
          <p className="text-[14px] text-(--text-muted) mt-1">{openCount} open · {resolvedCount} resolved</p>
        </div>

        {openCount > 0 && (
          <div className="flex gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
            <AlertTriangle size={16} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <p className="text-[13.5px] text-red-800 dark:text-red-300">{openCount} open dispute{openCount > 1 ? 's' : ''} need your attention. High-priority disputes should be resolved within 48 hours.</p>
          </div>
        )}

        <div className="flex items-center gap-1 bg-(--bg) border border-(--border) rounded-xl p-1 mb-5 self-start w-fit">
          {[['all','All'],['open','Open'],['resolved','Resolved']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${filter===v ? 'bg-navy-600 text-white' : 'text-(--text-muted) hover:text-(--text)'}`}>{l}</button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0
            ? <div className="text-center py-16 text-(--text-muted)">No disputes found.</div>
            : filtered.map(d => <DisputeCard key={d.id} dispute={d} onResolve={onResolve} />)}
        </div>
      </div>
    </AdminLayout>
  )
}
