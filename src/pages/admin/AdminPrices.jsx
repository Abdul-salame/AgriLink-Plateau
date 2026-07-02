import { useState } from 'react'
import { Edit2, CheckCircle2, X, Plus } from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { adminMarketPrices as initial } from '../../data/adminData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const LGAS = ['Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu','Mikang','Pankshin','Riyom','Shendam','Wase','Wase','Vom']
const UNITS = ['50kg bag','100kg bag','basket','net','crate','tonne','kg','tuber']

function EditModal({ price, onSave, onClose }) {
  const [fields, setFields] = useState({ price: price.price, region: price.region, unit: price.unit })
  function set(k) { return e => setFields(f => ({ ...f, [k]: e.target.value })) }
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--bg)] rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[20px] text-navy-700 dark:text-navy-100">Edit price</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)]"><X size={18} /></button>
        </div>
        <p className="text-[15px] font-medium text-[var(--text)] mb-5">{price.crop}</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Price (₦)</label>
            <input type="number" value={fields.price} onChange={set('price')}
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Unit</label>
            <select value={fields.unit} onChange={set('unit')}
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] text-[15px] outline-none appearance-none">
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-[var(--text)]">Source region</label>
            <select value={fields.region} onChange={set('region')}
              className="w-full h-11 px-4 rounded-xl border border-[var(--border-mid)] bg-[var(--bg)] text-[var(--text)] text-[15px] outline-none appearance-none">
              {LGAS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={() => onSave({ ...price, ...fields, price: Number(fields.price), lastUpdated: 'Today' })}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white text-[13.5px] font-medium transition-colors">
              <CheckCircle2 size={15} /> Save price
            </button>
            <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text)] text-[13.5px] hover:bg-[var(--bg-subtle)] transition-colors">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminPrices() {
  const [prices, setPrices]   = useState(initial)
  const [editing, setEditing] = useState(null)

  function onSave(updated) {
    setPrices(p => p.map(x => x.id === updated.id ? updated : x))
    setEditing(null)
  }

  return (
    <AdminLayout title="Market Prices">
      <div className="px-6 lg:px-8 py-8 max-w-[1000px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Market prices</h1>
            <p className="text-[14px] text-[var(--text-muted)] mt-1">These prices are shown to all farmers and buyers on the platform. Keep them updated daily.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white text-[13.5px] font-medium transition-colors">
            <Plus size={15} /> Add crop
          </button>
        </div>

        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
                <th className="font-medium px-6 py-3.5">Crop</th>
                <th className="font-medium px-6 py-3.5 hidden sm:table-cell">Region</th>
                <th className="font-medium px-6 py-3.5 hidden md:table-cell">Unit</th>
                <th className="font-medium px-6 py-3.5">Price</th>
                <th className="font-medium px-6 py-3.5 hidden lg:table-cell">Last updated</th>
                <th className="font-medium px-6 py-3.5">Edit</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((p, i) => (
                <tr key={p.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i < prices.length-1 ? 'border-b border-[var(--border)]' : ''}`}>
                  <td className="px-6 py-4 text-[14.5px] font-medium text-[var(--text)]">{p.crop}</td>
                  <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden sm:table-cell">{p.region}</td>
                  <td className="px-6 py-4 text-[13.5px] text-[var(--text-muted)] hidden md:table-cell">{p.unit}</td>
                  <td className="px-6 py-4 font-mono text-[14px] font-medium text-navy-700 dark:text-gold-400">{fmt(p.price)}</td>
                  <td className="px-6 py-4 text-[13px] text-[var(--text-muted)] hidden lg:table-cell">{p.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => setEditing(p)} className="p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-navy-600 dark:hover:text-gold-400 transition-colors">
                      <Edit2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12.5px] text-[var(--text-muted)]">Changes take effect immediately across all farmer and buyer dashboards.</p>
      </div>

      {editing && <EditModal price={editing} onSave={onSave} onClose={() => setEditing(null)} />}
    </AdminLayout>
  )
}
