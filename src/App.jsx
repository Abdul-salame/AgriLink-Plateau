import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'

// Landing
import LandingPage     from './pages/landing/LandingPage'

// Auth
import ChooseRole      from './pages/auth/ChooseRole'
import Register        from './pages/auth/Register'
import VerifyOtp       from './pages/auth/VerifyOtp'
import KycNin          from './pages/auth/KycNin'
import KycUpload       from './pages/auth/KycUpload'
import KycPending      from './pages/auth/KycPending'
import Login           from './pages/auth/Login'

// Farmer
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import NewListing      from './pages/farmer/NewListing'
import MyListings      from './pages/farmer/MyListings'
import Orders          from './pages/farmer/Orders'
import MarketPrices    from './pages/farmer/MarketPrices'
import Logistics       from './pages/farmer/Logistics'
import Reviews         from './pages/farmer/Reviews'
import Settings        from './pages/farmer/Settings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"                    element={<LandingPage />} />

          {/* Auth */}
          <Route path="/auth/role"           element={<ChooseRole />} />
          <Route path="/auth/register"       element={<Register />} />
          <Route path="/auth/verify-otp"     element={<VerifyOtp />} />
          <Route path="/auth/kyc-nin"        element={<KycNin />} />
          <Route path="/auth/kyc-upload"     element={<KycUpload />} />
          <Route path="/auth/kyc-pending"    element={<KycPending />} />
          <Route path="/auth/login"          element={<Login />} />

          {/* Farmer */}
          <Route path="/farmer/dashboard"    element={<FarmerDashboard />} />
          <Route path="/farmer/listings/new" element={<NewListing />} />
          <Route path="/farmer/listings"     element={<MyListings />} />
          <Route path="/farmer/orders"       element={<Orders />} />
          <Route path="/farmer/prices"       element={<MarketPrices />} />
          <Route path="/farmer/logistics"    element={<Logistics />} />
          <Route path="/farmer/reviews"      element={<Reviews />} />
          <Route path="/farmer/settings"     element={<Settings />} />

          {/* Buyer — next phase */}
          <Route path="/buyer/*" element={
            <div className="min-h-screen flex items-center justify-center font-display text-2xl text-navy-700 dark:text-navy-200">
              Buyer Dashboard — coming next
            </div>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
