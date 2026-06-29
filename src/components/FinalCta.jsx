import { ArrowRight } from 'lucide-react'
import Button from './Button'

export default function FinalCta() {
  return (
    <section className="py-24 lg:py-28 bg-navy-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
        aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gold-400/30" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-cream text-[34px] lg:text-[44px] leading-tight">
          Your harvest deserves a
          <span className="italic text-gold-300"> fair price.</span>
        </h2>
        <p className="mt-5 text-[17px] text-navy-200/75 max-w-lg mx-auto leading-relaxed">
          Join farmers, buyers and logistics providers across Plateau State who are already trading
          directly — no guesswork, no exploitation.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button variant="accent" size="lg">
            Create your account <ArrowRight size={18} />
          </Button>
          <Button variant="outline" size="lg"
            className="!border-cream/25 !text-cream hover:!bg-cream/10">
            Talk to our team
          </Button>
        </div>
      </div>
    </section>
  )
}
