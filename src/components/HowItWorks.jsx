import { UserCheck, ListChecks, Handshake, Truck } from 'lucide-react'

const steps = [
  { icon: UserCheck, title: 'Verify your identity',    body: 'Register and complete NIN-based KYC. Verified badges build trust with buyers before a single message is sent.' },
  { icon: ListChecks, title: 'List or browse produce', body: 'Farmers post crops with quantity, price and harvest date. Buyers search by location, crop and verified status.' },
  { icon: Handshake,  title: 'Agree a fair price',     body: 'Live market price data keeps negotiations honest — no one is guessing what a fair rate looks like.' },
  { icon: Truck,      title: 'Move it to market',      body: 'Request a verified logistics provider, or let an aggregator handle pickup and delivery for you.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-(--bg)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-xl mb-16">
          <span className="text-[13px] font-medium tracking-wide uppercase text-gold-600 dark:text-gold-400">How it works</span>
          <h2 className="font-display text-[34px] lg:text-[42px] mt-3 leading-tight text-navy-700 dark:text-navy-100">
            Four steps from harvest to handshake
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-(--border-mid) rounded-2xl overflow-hidden border border-(--border)">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-(--bg) p-7 lg:p-8">
              <span className="font-mono text-[13px] text-navy-400 dark:text-navy-500">{String(i + 1).padStart(2, '0')}</span>
              <div className="w-10 h-10 rounded-lg bg-navy-50 dark:bg-navy-800 flex items-center justify-center text-navy-600 dark:text-gold-400 mt-5 mb-5">
                <step.icon size={19} strokeWidth={2} />
              </div>
              <h3 className="text-[16.5px] font-medium text-navy-700 dark:text-navy-100 mb-2">{step.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-(--text-muted)">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
