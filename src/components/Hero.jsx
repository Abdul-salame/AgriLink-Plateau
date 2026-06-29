import { ArrowRight, MapPin } from 'lucide-react'
import Button from './Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-800">
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-700 border border-navy-500/50 text-navy-200 text-[13px] font-medium mb-7">
              <MapPin size={14} />
              Built for Plateau State, Nigeria
            </div>

            <h1 className="font-display text-cream text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.04] tracking-tight font-medium">
              From the highlands
              <br />
              <span className="italic font-normal text-gold-300">straight to market.</span>
            </h1>

            <p className="mt-7 text-[18px] leading-relaxed text-navy-200/80 max-w-lg">
              AgriLink Plateau connects farmers directly with buyers, aggregators and logistics providers —
              with transparent pricing and verified profiles, so harvests find a fair market before they spoil.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="accent" size="lg">
                Join as a farmer <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg"
                className="border-cream/30! text-cream! hover:bg-cream/10! dark:border-cream/30! dark:text-cream!">
                Browse produce
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 text-navy-300/60 text-[13px]">
              <span>NIN-verified accounts</span>
              <span className="w-1 h-1 rounded-full bg-navy-400/50" />
              <span>17 LGAs covered</span>
              <span className="w-1 h-1 rounded-full bg-navy-400/50" />
              <span>No hidden middleman fees</span>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-4/5 rounded-2xl bg-navy-700 border border-navy-500/30 overflow-hidden relative">
              <img
                src="/farm-life-with-plants-high-angle.jpg"
                alt="Highland farm in Plateau State"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 bg-cream/96 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gold-400 flex items-center justify-center text-navy-900 font-display font-medium text-lg shrink-0">AT</div>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-navy-800 truncate">Abduljalil Tajudeen</p>
                  <p className="text-[12.5px] text-navy-500 truncate">Irish potato farmer · Bokkos LGA</p>
                </div>
                <span className="ml-auto shrink-0 text-[11px] font-medium bg-navy-50 text-navy-700 px-2.5 py-1 rounded-full border border-navy-200">
                  ✓ Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
