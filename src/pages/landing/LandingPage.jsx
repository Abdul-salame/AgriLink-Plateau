import Navbar from '../../components/Navbar'
import PriceTicker from '../../components/PriceTicker'
import Hero from '../../components/Hero'
import StatsStrip from '../../components/StatsStrip'
import HowItWorks from '../../components/HowItWorks'
import RoleSection from '../../components/RoleSection'
import MarketPricesPreview from '../../components/MarketPricesPreview'
import FinalCta from '../../components/FinalCta'
import Footer from '../../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <PriceTicker />
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <RoleSection />
      <MarketPricesPreview />
      <FinalCta />
      <Footer />
    </div>
  )
}
