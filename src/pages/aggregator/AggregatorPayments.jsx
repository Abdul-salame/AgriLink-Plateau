import AggregatorLayout from '../../layouts/AggregatorLayout'
import { aggregatorOrders } from '../../data/aggregatorData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

export default function AggregatorPayments() {
  const totalEarned    = aggregatorOrders.reduce((s,o)=>s+o.amount,0)
  const totalCommission = Math.round(totalEarned * 0.08)
  const pending         = Math.round(aggregatorOrders.filter(o=>o.status!=='delivered').reduce((s,o)=>s+o.amount,0)*0.08)

  return (
    <AggregatorLayout title="Payments">
      <div className="px-6 lg:px-8 py-8 max-w-[700px] mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Payments</h1>
          <p className="text-[14px] text-[var(--text-muted)] mt-1">Your commission earnings from bulk listings.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label:'Total commission earned', value: fmt(totalCommission), color:'text-navy-700 dark:text-navy-100' },
            { label:'Pending payout',          value: fmt(pending),         color:'text-gold-600 dark:text-gold-400' },
            { label:'Commission rate',         value: '8%',                 color:'text-navy-700 dark:text-navy-100' },
          ].map(s=>(
            <div key={s.label} className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] p-5">
              <p className="text-[13px] text-[var(--text-muted)] mb-2">{s.label}</p>
              <p className={`font-display text-[26px] font-medium ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-[var(--bg)] rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)]">
            <h2 className="font-medium text-[15px] text-[var(--text)]">Commission breakdown</h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-[var(--bg-subtle)] text-[12.5px] text-[var(--text-muted)]">
              <th className="font-medium px-6 py-3">Order</th>
              <th className="font-medium px-6 py-3">Buyer</th>
              <th className="font-medium px-6 py-3">Order value</th>
              <th className="font-medium px-6 py-3 text-right">Commission (8%)</th>
            </tr></thead>
            <tbody>
              {aggregatorOrders.map((o,i)=>(
                <tr key={o.id} className={`hover:bg-[var(--bg-subtle)] transition-colors ${i<aggregatorOrders.length-1?'border-b border-[var(--border)]':''}`}>
                  <td className="px-6 py-3.5 font-mono text-[13px] text-[var(--text-muted)]">{o.id}</td>
                  <td className="px-6 py-3.5 text-[14px] text-[var(--text)]">{o.buyer}</td>
                  <td className="px-6 py-3.5 font-mono text-[14px] text-[var(--text)]">{fmt(o.amount)}</td>
                  <td className="px-6 py-3.5 font-mono text-[14px] text-right text-navy-700 dark:text-gold-400 font-medium">{fmt(Math.round(o.amount*0.08))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AggregatorLayout>
  )
}
