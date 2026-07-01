
import { useState } from 'react'
import { BookmarkX, Calendar, Package, Tag, ShoppingBasket, Sprout } from 'lucide-react'
import BuyerLayout from '../../layouts/BuyerLayout'
import Button from '../../components/Button'
import { savedListings as initial } from '../../data/buyerData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

export default function SavedListings() {
  const [saved, setSaved] = useState(initial)

  function remove(id) { setSaved(s => s.filter(x => x.id !== id)) }

  return (
    <BuyerLayout title="Saved Listings">
      <div className="px-6 lg:px-8 py-8 max-w-225 mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">Saved listings</h1>
          <p className="text-[14px] text-(--text-muted) mt-1">{saved.length} saved listing{saved.length !== 1 ? 's' : ''}</p>
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-(--bg-subtle) flex items-center justify-center mx-auto mb-4 text-(--text-muted)">
              <ShoppingBasket size={26} strokeWidth={1.5} />
            </div>
            <p className="text-[15px] text-(--text-muted)">No saved listings yet.</p>
            <p className="text-[13.5px] text-(--text-muted) mt-1">Bookmark produce while browsing to save them here.</p>
            <Button as="a" href="/buyer/browse" variant="primary" size="md" className="mt-5">Browse produce</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {saved.map(l => (
              <div key={l.id} className="bg-(--bg) rounded-2xl border border-(--border) p-5 flex flex-col gap-4 hover:border-(--border-mid) transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Replaced 🌱 emoji with Lucide Sprout icon */}
                    <div className="w-11 h-11 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center shrink-0">
                      <Sprout size={20} className="text-navy-600 dark:text-gold-400 opacity-80" />
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-(--text)">{l.produce}</p>
                      <p className="text-[12.5px] text-(--text-muted)">{l.farmer} · {l.lga}</p>
                    </div>
                  </div>
                  <button onClick={() => remove(l.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-(--text-muted) hover:text-red-500 transition-colors shrink-0">
                    <BookmarkX size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px]">
                  <span className="flex items-center gap-1.5 text-(--text-muted)"><Package size={13} />{l.qty}</span>
                  <span className="flex items-center gap-1.5 text-(--text-muted)"><Tag size={13} />{fmt(l.price)}/{l.unit}</span>
                  <span className="flex items-center gap-1.5 text-(--text-muted) col-span-2"><Calendar size={13} />Harvest {l.harvestDate}</span>
                </div>
                {l.verified && (
                  <span className="self-start text-[11.5px] font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800">✓ Verified farm</span>
                )}
                <Button variant="primary" size="sm" className="w-full">Place order</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BuyerLayout>
  )
}