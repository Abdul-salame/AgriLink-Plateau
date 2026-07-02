import { useState } from 'react'
import { Search, MoreHorizontal, CheckCircle2, XCircle, Ban, Eye } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { allUsers as initial } from '../../data/adminData'

const ROLE_STYLE   = { Farmer:'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-200', Buyer:'bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300', Aggregator:'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', Logistics:'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300', Extension:'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300' }
const STATUS_STYLE = { active:'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', suspended:'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400', inactive:'bg-[var(--bg-subtle)] text-[var(--text-muted)]' }
const KYC_STYLE    = { approved:'text-green-600 dark:text-green-400', pending:'text-gold-600 dark:text-gold-400', rejected:'text-red-500 dark:text-red-400' }

function Menu({ user, onSuspend, onActivate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(v => !v)} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] transition-colors"><MoreHorizontal size={16} /></button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl shadow-lg z-10 py-1 min-w-[160px]">
          <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[var(--text)] hover:bg-[var(--bg-subtle)]"><Eye size={13} /> View profile</button>
          {user.status === 'active'
            ? <button onClick={() => { onSuspend(user.id); setOpen(false) }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"><Ban size={13} /> Suspend</button>
            : <button onClick={() => { onActivate(user.id); setOpen(false) }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"><CheckCircle2 size={13} /> Activate</button>
          }
        </div>
      )}
    </div>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState(initial)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  function onSuspend(id)  { setUsers(u => u.map(x => x.id === id ? { ...x, status:'suspended' } : x)) }
  function onActivate(id) { setUsers(u => u.map(x => x.id === id ? { ...x, status:'active'    } : x)) }

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.lga.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter   === 'All' || u.role   === roleFilter
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchRole && matchStatus
  })

  const roles    = ['All','Farmer','Buyer','Aggregator','Logistics']
  const statuses = ['All','active','suspended','inactive']

  return (
    <AdminLayout title="Users">
      <div className="px-6 lg:px-8 py-8 max-w-[1200px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Users</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{users.length} registered users across all roles.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex-1 max-w-xs">
            <Search size={14} className="text-[var(--text-muted)]" />
            <input type="text" placeholder="Search name or LGA…" value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-[var(--text)] placeholder:text-[var(--text-muted)]" />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none appearance-none cursor-pointer">
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[14px] text-[var(--text)] outline-none appearance-none cursor-pointer">
            {statuses.map(s => <option key={s} className="capitalize">{s}</option>)}
          </select>
        </div>

        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
                  <th className="font-medium px-6 py-3.5">User</th>
                  <th className="font-medium px-6 py-3.5">Role</th>
                  <th className="font-medium px-6 py-3.5 hidden md:table-cell">LGA</th>
                  <th className="font-medium px-6 py-3.5">Status</th>
                  <th className="font-medium px-6 py-3.5 hidden lg:table-cell">KYC</th>
                  <th className="font-medium px-6 py-3.5 hidden lg:table-cell">Orders</th>
                  <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Joined</th>
                  <th className="font-medium px-6 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i < filtered.length-1 ? 'border-b border-[var(--border)]' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 text-[13px] font-display font-medium shrink-0">{u.name.charAt(0)}</div>
                        <div>
                          <p className="text-[14px] font-medium text-[var(--text)]">{u.name}</p>
                          <p className="text-[11.5px] text-[var(--text-muted)] font-mono">{u.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full ${ROLE_STYLE[u.role] || ROLE_STYLE.Farmer}`}>{u.role}</span></td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden md:table-cell">{u.lga}</td>
                    <td className="px-6 py-4"><span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[u.status]}`}>{u.status}</span></td>
                    <td className="px-6 py-4 hidden lg:table-cell"><span className={`text-[13px] font-medium capitalize ${KYC_STYLE[u.kyc]}`}>{u.kyc}</span></td>
                    <td className="px-6 py-4 text-[13.5px] text-[var(--text)] hidden lg:table-cell">{u.orders}</td>
                    <td className="px-6 py-4 text-[13px] text-[var(--text-muted)] hidden sm:table-cell">{u.joined}</td>
                    <td className="px-6 py-4"><Menu user={u} onSuspend={onSuspend} onActivate={onActivate} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <p className="text-center py-12 text-[var(--text-muted)]">No users match your filters.</p>}
        </div>
      </div>
    </AdminLayout>
  )
}
