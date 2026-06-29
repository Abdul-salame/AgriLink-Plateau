import { useState } from 'react'
import { Truck, Star, Phone, CheckCircle2, MapPin, Package, X } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import Button from '../../components/Button'
import { logisticsProviders, allOrders } from '../../data/farmerData'

function ProviderCard({ provider, onRequest }) {
  return (
    <div className={`bg-(--bg) rounded-2xl border p-5 flex flex-col gap-4 transition-colors ${provider.available ? 'border-(--border) hover:border-(--border-mid)' : 'border-(--border) opacity-60'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-navy-600 flex items-center justify-center text-gold-300 shrink-0">
            <Truck size={20} strokeWidth={2}/>
          </div>
          <div>
            <p className="text-[15px] font-medium text-(--text)">{provider.name}</p>
            <p className="text-[13px] text-(--text-muted)">{provider.vehicle}</p>
          </div>
        </div>
        <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full shrink-0 ${provider.available ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-(--bg-subtle) text-(--text-muted)'}`}>
          {provider.available ? 'Available' : 'Busy'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[13px]">
        <div className="flex items-center gap-1.5 text-(--text-muted)"><Star size={13} className="text-gold-500"/>{provider.rating} ({provider.trips} trips)</div>
        <div className="flex items-center gap-1.5 text-(--text-muted)"><Package size={13}/>₦{provider.pricePerKm}/km</div>
        <div className="flex items-center gap-1.5 text-(--text-muted) col-span-2"><MapPin size={13}/>{provider.coverage}</div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button variant="primary" size="sm" onClick={() => onRequest(provider)} disabled={!provider.available} className="flex-1">
          Request pickup
        </Button>
        <a href={`tel:${provider.phone}`}
          className="flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-full border border-(--border) text-[13px] text-(--text-muted) hover:border-(--border-mid) hover:text-(--text) transition-all">
          <Phone size={14}/> Call
        </a>
      </div>
    </div>
  )
}

function RequestModal({ provider, onClose }) {
  const [selectedOrder, setSelectedOrder] = useState('')
  const [date, setDate]                   = useState('')
  const [note, setNote]                   = useState('')
  const [submitted, setSubmitted]         = useState(false)

  const pendingOrders = allOrders.filter(o => o.status === 'confirmed' || o.status === 'pending')

  function handleSubmit() {
    if (!selectedOrder || !date) return
    setTimeout(() => setSubmitted(true), 800)
  }

  if (submitted) return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-(--bg) rounded-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} className="text-green-600 dark:text-green-400"/>
        </div>
        <h3 className="font-display text-[22px] text-navy-700 dark:text-navy-100 mb-2">Request sent!</h3>
        <p className="text-[14px] text-(--text-muted) mb-6">{provider.name} will contact you at your registered number to confirm pickup.</p>
        <Button variant="primary" size="md" onClick={onClose} className="w-full">Done</Button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-(--bg) rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-[20px] text-navy-700 dark:text-navy-100">Request pickup</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-(--bg-subtle) text-(--text-muted)"><X size={18}/></button>
        </div>
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-(--bg-subtle) border border-(--border) mb-5">
          <Truck size={18} className="text-navy-600 dark:text-gold-400"/>
          <div>
            <p className="text-[14px] font-medium text-(--text)">{provider.name}</p>
            <p className="text-[12.5px] text-(--text-muted)">{provider.vehicle} · ₦{provider.pricePerKm}/km</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-(--text)">Select order for pickup</label>
            <select value={selectedOrder} onChange={e=>setSelectedOrder(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) text-[15px] outline-none appearance-none">
              <option value="">Choose an order…</option>
              {pendingOrders.map(o => <option key={o.id} value={o.id}>{o.id} — {o.produce} for {o.buyer}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-(--text)">Preferred pickup date</label>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) text-[15px] outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13.5px] font-medium text-(--text)">Notes for driver <span className="text-(--text-muted) font-normal">(optional)</span></label>
            <textarea rows={2} value={note} onChange={e=>setNote(e.target.value)} placeholder="Location details, load info, special instructions…"
              className="w-full px-4 py-3 rounded-xl border border-(--border-mid) bg-(--bg) text-(--text) placeholder:text-(--text-muted) text-[15px] outline-none resize-none focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-800 transition-all"/>
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="primary" size="md" onClick={handleSubmit} disabled={!selectedOrder || !date} className="flex-1">Send request</Button>
            <Button variant="outline" size="md" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Logistics() {
  const [requestingProvider, setRequestingProvider] = useState(null)

  return (
    <FarmerLayout title="Logistics">
      <div className="px-6 lg:px-8 py-8 max-w-225 mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Logistics providers</h1>
          <p className="text-[14px] text-(--text-muted) mt-1">Request verified transport providers to move your produce to market.</p>
        </div>

        <div className="p-4 rounded-xl bg-navy-50 dark:bg-navy-800/60 border border-navy-200 dark:border-navy-700 mb-7 text-[13.5px] text-navy-700 dark:text-navy-200">
          All providers on AgriLink are verified with valid transport documentation. Prices are negotiable — the rate per km is a starting estimate.
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {logisticsProviders.map(p => (
            <ProviderCard key={p.id} provider={p} onRequest={setRequestingProvider}/>
          ))}
        </div>
      </div>

      {requestingProvider && (
        <RequestModal provider={requestingProvider} onClose={() => setRequestingProvider(null)}/>
      )}
    </FarmerLayout>
  )
}
