import { Wheat, ShoppingBasket, Users, Truck, GraduationCap, ArrowUpRight } from 'lucide-react'
import Button from './Button'

const roles = [
  { icon: Wheat,          title: 'Farmers',           body: 'List produce, track real-time prices, and reach buyers directly — without losing margin to unclear middlemen pricing.',              cta: 'Join as a farmer',     id: 'farmers' },
  { icon: ShoppingBasket, title: 'Buyers',             body: 'Source verified produce by crop, location and quantity. Order directly from farmers or trusted aggregators.',                         cta: 'Start buying',         id: 'buyers'  },
  { icon: Users,          title: 'Aggregators',        body: 'Bundle produce from smaller farms into bulk listings, with transparent commission shown to every farmer you work with.',             cta: 'Register as aggregator' },
  { icon: Truck,          title: 'Logistics providers',body: 'Get matched to delivery requests near you. Set your rates, your capacity, your coverage area.',                                      cta: 'Offer transport'       },
  { icon: GraduationCap,  title: 'Extension workers',  body: 'Verify farm visits, award "Verified Farm" badges, and share advisory content that reaches farmers where they already are.',         cta: 'Join as an advisor'    },
]

export default function RoleSection() {
  return (
    <section className="py-24 lg:py-32 bg-(--bg-subtle)">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-xl mb-16">
          <span className="text-[13px] font-medium tracking-wide uppercase text-gold-600 dark:text-gold-400">Built for everyone in the chain</span>
          <h2 className="font-display text-[34px] lg:text-[42px] mt-3 leading-tight text-navy-700 dark:text-navy-100">
            One platform, five roles, no exploitation
          </h2>
          <p className="mt-4 text-[16px] text-(--text-muted) leading-relaxed">
            Middlemen aren't the enemy — hidden margins are. AgriLink keeps every role in the supply chain,
            but makes pricing and commission visible to everyone involved.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map(role => (
            <div key={role.title} id={role.id}
              className="group bg-(--bg) rounded-2xl p-7 border border-(--border) hover:border-(--border-mid) hover:shadow-sm transition-all flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-navy-600 flex items-center justify-center text-gold-300 mb-6">
                <role.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-[17px] font-medium text-navy-700 dark:text-navy-100 mb-2">{role.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-(--text-muted) mb-6 flex-1">{role.body}</p>
              <button className="inline-flex items-center gap-1.5 text-[14px] font-medium text-navy-600 dark:text-gold-400 group-hover:text-gold-600 dark:group-hover:text-gold-300 transition-colors">
                {role.cta} <ArrowUpRight size={15} />
              </button>
            </div>
          ))}

          <div className="rounded-2xl p-7 bg-navy-700 flex flex-col justify-center">
            <p className="font-display text-cream text-[20px] leading-snug mb-5">
              Not sure where you fit in the chain?
            </p>
            <Button variant="accent" size="md" className="self-start">Find your role</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
