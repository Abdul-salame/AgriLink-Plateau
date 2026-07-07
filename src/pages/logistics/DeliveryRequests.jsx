import { useState } from 'react'
import { Phone, Clock, MapPin, CheckCircle2, X } from 'lucide-react'
import LogisticsLayout from '../../layouts/LogisticsLayout'
import { deliveryRequests as initial } from '../../data/logisticsData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

export default function DeliveryRequests() {
  const [requests, setRequests] = useState(initial)

  function accept(id) { setRequests(r=>r.filter(x=>x.id!==id)) }
  function decline(id){ setRequests(r=>r.filter(x=>x.id!==id)) }

  return (
    <LogisticsLayout title="Delivery Requests">
      <div className="px-6 lg:px-8 py-8 max-w-[800px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Delivery requests</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">{requests.length} pending requests from farmers near you</p>
        </div>
        <div className="flex flex-col gap-4">
          {requests.length===0
            ? <div className="text-center py-20 text-[var(--text-muted)]">No pending requests right now.</div>
            : requests.map(r=>(
              <div key={r.id} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15.5px] font-medium text-[var(--text)]">{r.farmer}</p>
                    <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{r.produce} · {r.qty}</p>
                  </div>
                  <span className="font-mono font-medium text-[16px] text-navy-700 dark:text-gold-400 shrink-0">{fmt(r.fee)}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-[13.5px]">
                  <div className="flex items-center gap-2 text-[var(--text-muted)]"><MapPin size={14}/>{r.farmerLga} · {r.distance}</div>
                  <div className="flex items-center gap-2 text-[var(--text-muted)]"><Clock size={14}/>Pickup {r.pickupDate}</div>
                  <a href={`tel:${r.phone}`} className="flex items-center gap-2 text-navy-600 dark:text-gold-400 hover:underline"><Phone size={14}/>{r.phone}</a>
                </div>
                <div className="flex gap-3 pt-1">
                  <button onClick={()=>accept(r.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-600 hover:bg-navy-700 text-white text-[14px] font-medium transition-colors">
                    <CheckCircle2 size={16}/> Accept delivery
                  </button>
                  <button onClick={()=>decline(r.id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] text-[14px] transition-colors">
                    <X size={16}/> Decline
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </LogisticsLayout>
  )
}
