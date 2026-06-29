import { Star, TrendingUp } from 'lucide-react'
import FarmerLayout from '../../layouts/FarmerLayout'
import { myReviews, farmerProfile } from '../../data/farmerData'

function StarRow({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-gold-400 fill-gold-400' : 'text-(--border-mid) fill-(--border-mid)'}/>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="bg-(--bg) rounded-2xl border border-(--border) p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center justify-center text-gold-300 font-display font-medium text-[14px] shrink-0">
            {review.buyer.charAt(0)}
          </div>
          <div>
            <p className="text-[14.5px] font-medium text-(--text)">{review.buyer}</p>
            <p className="text-[12.5px] text-(--text-muted)">{review.produce} · {review.date}</p>
          </div>
        </div>
        <StarRow rating={review.rating}/>
      </div>
      <p className="text-[14px] text-(--text-muted) leading-relaxed">"{review.comment}"</p>
    </div>
  )
}

export default function Reviews() {
  const avg    = (myReviews.reduce((s,r)=>s+r.rating,0)/myReviews.length).toFixed(1)
  const counts = [5,4,3,2,1].map(n => ({ star: n, count: myReviews.filter(r=>r.rating===n).length }))

  return (
    <FarmerLayout title="Reviews">
      <div className="px-6 lg:px-8 py-8 max-w-200 mx-auto">
        <div className="mb-7">
          <h1 className="font-display text-[26px] font-medium text-navy-700 dark:text-navy-100">My reviews</h1>
          <p className="text-[14px] text-(--text-muted) mt-1">What buyers are saying about your produce and service.</p>
        </div>

        {/* Rating summary */}
        <div className="bg-(--bg) rounded-2xl border border-(--border) p-6 flex flex-col sm:flex-row items-center gap-8 mb-7">
          <div className="text-center shrink-0">
            <p className="font-display text-[56px] font-medium text-navy-700 dark:text-navy-100 leading-none">{avg}</p>
            <StarRow rating={Math.round(Number(avg))}/>
            <p className="text-[13px] text-(--text-muted) mt-1.5">{myReviews.length} reviews</p>
          </div>
          <div className="flex-1 w-full flex flex-col gap-2">
            {counts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-[13px] text-(--text-muted) w-4 shrink-0">{star}</span>
                <Star size={13} className="text-gold-400 fill-gold-400 shrink-0"/>
                <div className="flex-1 h-2 rounded-full bg-(--border) overflow-hidden">
                  <div className="h-full rounded-full bg-gold-400 transition-all" style={{ width: `${(count/myReviews.length)*100}%` }}/>
                </div>
                <span className="text-[13px] text-(--text-muted) w-4 shrink-0">{count}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 text-center">
            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
              <TrendingUp size={16}/>
              <span className="text-[14px] font-medium">Top farmer</span>
            </div>
            <p className="text-[12.5px] text-(--text-muted)">Top 10% in Bokkos LGA</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {myReviews.map(r => <ReviewCard key={r.id} review={r}/>)}
        </div>
      </div>
    </FarmerLayout>
  )
}
