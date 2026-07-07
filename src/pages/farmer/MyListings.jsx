import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Tag, Calendar, Package, Edit2, Trash2, MoreHorizontal, Search, Filter, Sprout } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import Button from '../../components/Button'
import { allListings } from '../../data/farmerData'

function fmt(n) { return `₦${n.toLocaleString('en-NG')}` }

const STATUS_STYLE = {
  active:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  sold:    'bg-navy-100 text-navy-700 dark:bg-navy-800 dark:text-navy-300',
  expired: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

function ListingCard({ listing, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) p-5 flex flex-col gap-4 hover:border-(--border-mid) transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-navy-50 dark:bg-navy-800 flex items-center justify-center shrink-0">
            <Sprout size={20} className="text-navy-600 dark:text-gold-400" />
          </div>
          <div>
            <p className="text-[15px] font-medium text-(--text)">{listing.produce}</p>
            <p className="text-[12.5px] text-(--text-muted)">{listing.category} · {listing.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[11.5px] font-medium px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[listing.status]}`}>
            {listing.status}
          </span>
          <div className="relative">
            <button onClick={() => setMenuOpen(v=>!v)}
              className="p-1.5 rounded-lg hover:bg-(--bg-subtle) text-(--text-muted) transition-colors">
              <MoreHorizontal size={16}/>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-1 bg-(--bg) border border-(--border) rounded-xl shadow-lg z-10 py-1 min-w-35">
                <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-(--text) hover:bg-(--bg-subtle) transition-colors">
                  <Edit2 size={13}/> Edit listing
                </button>
                <button onClick={() => { onDelete(listing.id); setMenuOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <Trash2 size={13}/> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[13px]">
        <span className="flex items-center gap-1.5 text-(--text-muted)"><Package size={13}/>{listing.qty}</span>
        <span className="flex items-center gap-1.5 text-(--text-muted)"><Tag size={13}/>{fmt(listing.price)}/{listing.unit}</span>
        <span className="flex items-center gap-1.5 text-(--text-muted)"><Calendar size={13}/>{listing.harvestDate}</span>
        <span className="flex items-center gap-1.5 text-(--text-muted)"><Eye size={13}/>{listing.views} views</span>
      </div>

      {listing.offers > 0 && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800">
          <span className="text-[13px] text-gold-800 dark:text-gold-300 font-medium">{listing.offers} buyer offer{listing.offers > 1 ? 's' : ''} waiting</span>
          <button className="text-[12.5px] text-navy-600 dark:text-gold-400 font-medium hover:underline">View offers</button>
        </div>
      )}
    </div>
  )
}

export default function MyListings() {
  const [listings, setListings] = useState(allListings)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  function handleDelete(id) {
    if (confirm('Delete this listing?')) setListings(l => l.filter(x => x.id !== id))
  }

  const filtered = listings.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter
    const matchSearch = l.produce.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const counts = { all: listings.length, active: listings.filter(l=>l.status==='active').length, sold: listings.filter(l=>l.status==='sold').length, expired: listings.filter(l=>l.status==='expired').length }

  return (
    <FarmerLayout title="My Listings">
      <div className="px-6 lg:px-8 py-8 max-w-275 mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">My listings</h1>
            <p className="text-[14px] text-(--text-muted) mt-0.5">{counts.active} active · {counts.sold} sold · {counts.expired} expired</p>
          </div>
          <Button as={Link} to="/farmer/listings/new" variant="accent" size="md">
            <Plus size={16}/> New listing
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 h-10 px-3.5 rounded-xl border border-(--border) bg-(--bg) text-(--text-muted) flex-1 max-w-xs">
            <Search size={14}/>
            <input type="text" placeholder="Search produce…" value={search} onChange={e=>setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] text-(--text) placeholder:text-(--text-muted)"/>
          </div>
          <div className="flex items-center gap-2 bg-(--bg) border border-(--border) rounded-xl p-1">
            {['all','active','sold','expired'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium capitalize transition-all ${filter===s ? 'bg-navy-600 text-white' : 'text-(--text-muted) hover:text-(--text)'}`}>
                {s} <span className="ml-1 text-[11px] opacity-70">({counts[s]})</span>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[15px] text-(--text-muted)">No listings found.</p>
            <Button as={Link} to="/farmer/listings/new" variant="primary" size="md" className="mt-4">Add your first listing</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(l => <ListingCard key={l.id} listing={l} onDelete={handleDelete}/>)}
          </div>
        )}
      </div>
    </FarmerLayout>
  )
}
