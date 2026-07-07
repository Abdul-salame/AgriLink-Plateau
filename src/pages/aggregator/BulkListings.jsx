import { useState } from 'react'
import { Plus, Eye, Tag, Users, Calendar, Sprout } from 'lucide-react'
import AggregatorLayout from '../../layouts/AggregatorLayout'
import Button from '../../components/Button'
import { bulkListings } from '../../data/aggregatorData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_STYLE = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  sold:   'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300',
}

export default function BulkListings() {
  const [listings] = useState(bulkListings)
  const [filter, setFilter]     = useState('all')

  const filtered = listings.filter(l => filter === 'all' || l.status === filter)

  return (
    <AggregatorLayout title="Bulk Listings">
      <div className="px-6 lg:px-8 py-8 max-w-250 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Bulk listings</h1>
            <p className="text-[14px] text-(--text-muted) mt-1">{listings.filter(l=>l.status==='active').length} active · {listings.filter(l=>l.status==='sold').length} sold</p>
          </div>
          <Button variant="accent" size="md"><Plus size={16}/>New bulk listing</Button>
        </div>

        <div className="flex items-center gap-1 bg-(--bg) border border-(--border) rounded-xl p-1 mb-6 w-fit">
          {['all','active','sold'].map(s=>(
            <button key={s} onClick={()=>setFilter(s)}
              className={`px-4 py-1.5 rounded-lg text-[13px] font-medium capitalize transition-all ${filter===s?'bg-navy-600 text-white':'text-(--text-muted) hover:text-(--text)'}`}>{s}</button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(l=>(
            <div key={l.id} className="bg-(--bg) rounded-2xl border border-(--border) p-5 flex flex-col gap-4 hover:border-(--border-mid) transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center shrink-0">
                    <Sprout size={20} className="text-navy-600 dark:text-gold-400" />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-(--text)">{l.produce}</p>
                    <p className="text-[12px] font-mono text-(--text-muted)">{l.id}</p>
                  </div>
                </div>
                <span className={`text-[12px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[l.status]}`}>{l.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px]">
                <span className="flex items-center gap-1.5 text-(--text-muted)"><Tag size={13}/>{fmt(l.price)}/{l.unit}</span>
                <span className="flex items-center gap-1.5 text-(--text-muted)"><Eye size={13}/>{l.views} views</span>
                <span className="flex items-center gap-1.5 text-(--text-muted)"><Users size={13}/>{l.farmers} farmer{l.farmers!==1?'s':''}</span>
                <span className="flex items-center gap-1.5 text-(--text-muted)"><Calendar size={13}/>Harvest {l.harvestDate}</span>
              </div>
              {l.offers>0 && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800">
                  <span className="text-[13px] text-gold-800 dark:text-gold-300 font-medium">{l.offers} buyer offer{l.offers>1?'s':''} waiting</span>
                  <button className="text-[12.5px] text-navy-600 dark:text-gold-400 font-medium hover:underline">View</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AggregatorLayout>
  )
}
