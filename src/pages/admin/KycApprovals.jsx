import { useState } from 'react'
import { CheckCircle2, XCircle, AlertTriangle, FileText, Camera, ChevronDown, ChevronUp, Search } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { kycQueue as initial } from '../../data/adminData'

const STATUS_STYLE = {
  pending:  'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const ROLE_STYLE = {
  Farmer: 'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-200',
  Buyer: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Aggregator: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Logistics: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Extension: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
}

function KycCard({ item, onApprove, onReject }) {
  const [expanded, setExpanded]   = useState(false)
  const [rejectNote, setRejectNote] = useState('')
  const [showReject, setShowReject] = useState(false)

  return (
    <div className={`bg-[var(--bg)] rounded-2xl border overflow-hidden ${item.flagged ? 'border-clay-300 dark:border-clay-700' : 'border-[var(--border)]'}`}>
      <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => setExpanded(v => !v)}>
        <div className="w-11 h-11 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[15px] shrink-0">
          {item.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-[15px] font-medium text-[var(--text)]">{item.name}</p>
            {item.flagged && <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-clay-600 dark:text-clay-400 bg-clay-100 dark:bg-clay-900/30 px-2 py-0.5 rounded-full"><AlertTriangle size={10} />Flagged</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`text-[11.5px] font-medium px-2.5 py-0.5 rounded-full ${ROLE_STYLE[item.role] || ROLE_STYLE.Farmer}`}>{item.role}</span>
            <span className="text-[12px] text-[var(--text-muted)]">{item.lga}</span>
            <span className="text-[12px] text-[var(--text-muted)]">NIN: {item.nin}</span>
            <span className="text-[12px] text-[var(--text-muted)]">Submitted {item.submitted}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[item.status]}`}>{item.status}</span>
          {expanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[var(--border)] p-5 flex flex-col gap-4 bg-[var(--bg-subtle)]">
          {/* Mock documents */}
          <div>
            <p className="text-[13px] font-medium text-[var(--text-muted)] mb-3">Submitted documents</p>
            <div className="flex flex-wrap gap-3">
              {item.docs.map(doc => (
                <div key={doc} className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] cursor-pointer hover:border-[var(--border-mid)] transition-colors">
                  {doc.includes('Selfie') ? <Camera size={16} className="text-navy-600 dark:text-gold-400" /> : <FileText size={16} className="text-navy-600 dark:text-gold-400" />}
                  <span className="text-[13.5px] text-[var(--text)]">{doc}</span>
                  <span className="text-[11px] text-navy-600 dark:text-gold-400 font-medium">View</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[var(--text-muted)] mt-2 italic">Document preview not available in mock mode — real documents will display here after backend integration.</p>
          </div>

          {item.flagged && (
            <div className="flex gap-2.5 p-3.5 rounded-xl bg-clay-50 dark:bg-clay-900/20 border border-clay-200 dark:border-clay-800 text-[13.5px] text-clay-700 dark:text-clay-300">
              <AlertTriangle size={15} className="shrink-0 mt-0.5" />
              This submission was automatically flagged — possible NIN format mismatch. Review carefully before approving.
            </div>
          )}

          {item.status === 'pending' && (
            <>
              {showReject && (
                <div className="flex flex-col gap-2">
                  <label className="text-[13.5px] font-medium text-[var(--text)]">Rejection reason</label>
                  <textarea rows={2} value={rejectNote} onChange={e => setRejectNote(e.target.value)}
                    placeholder="Explain why this KYC is being rejected (sent to user)…"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] placeholder:text-[var(--text-muted)] text-[14px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all" />
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button onClick={() => onApprove(item.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-[13.5px] font-medium transition-colors">
                  <CheckCircle2 size={15} /> Approve
                </button>
                {!showReject
                  ? <button onClick={() => setShowReject(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-[13.5px] font-medium transition-colors"><XCircle size={15} /> Reject</button>
                  : <button onClick={() => onReject(item.id, rejectNote)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[13.5px] font-medium transition-colors"><XCircle size={15} /> Confirm rejection</button>
                }
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default function KycApprovals() {
  const [items, setItems] = useState(initial)
  const [filter, setFilter] = useState('pending')
  const [search, setSearch] = useState('')

  function onApprove(id) { setItems(i => i.map(x => x.id === id ? { ...x, status:'approved' } : x)) }
  function onReject(id)  { setItems(i => i.map(x => x.id === id ? { ...x, status:'rejected' } : x)) }

  const counts = { all: items.length, pending: items.filter(i=>i.status==='pending').length, approved: items.filter(i=>i.status==='approved').length, rejected: items.filter(i=>i.status==='rejected').length }

  const filtered = items.filter(i => {
    const matchFilter = filter === 'all' || i.status === filter
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.lga.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <AdminLayout title="KYC Approvals">
      <div className="px-6 lg:px-8 py-8 max-w-[900px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">KYC Approvals</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Review identity verification submissions from all user roles.</p>
        </div>

        {/* Count strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {[['all','All',counts.all],['pending','Pending',counts.pending],['approved','Approved',counts.approved],['rejected','Rejected',counts.rejected]].map(([v,l,c]) => (
            <div key={v} onClick={() => setFilter(v)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${filter===v ? 'border-navy-500 bg-navy-50 dark:bg-navy-800/60' : 'border-[var(--border)] bg-[var(--bg)] hover:border-[var(--border-mid)]'}`}>
              <p className="font-display text-[24px] font-medium text-navy-700 dark:text-navy-100">{c}</p>
              <p className="text-[12.5px] text-[var(--text-muted)] mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 max-w-xs">
            <Search size={14} className="text-[var(--text-muted)]" />
            <input type="text" placeholder="Search name or LGA…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filtered.length === 0
            ? <div className="text-center py-16 text-[var(--text-muted)]">No submissions match your filter.</div>
            : filtered.map(i => <KycCard key={i.id} item={i} onApprove={onApprove} onReject={onReject} />)}
        </div>
      </div>
    </AdminLayout>
  )
}
