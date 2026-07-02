import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'

// Landing
import LandingPage      from './pages/landing/LandingPage'

// Auth
import ChooseRole       from './pages/auth/ChooseRole'
import Register         from './pages/auth/Register'
import VerifyOtp        from './pages/auth/VerifyOtp'
import KycNin           from './pages/auth/KycNin'
import KycUpload        from './pages/auth/KycUpload'
import KycPending       from './pages/auth/KycPending'
import Login            from './pages/auth/Login'

// Farmer
import FarmerDashboard  from './pages/farmer/FarmerDashboard'
import NewListing       from './pages/farmer/NewListing'
import MyListings       from './pages/farmer/MyListings'
import Orders           from './pages/farmer/Orders'
import MarketPrices     from './pages/farmer/MarketPrices'
import Logistics        from './pages/farmer/Logistics'
import Reviews          from './pages/farmer/Reviews'
import Settings         from './pages/farmer/Settings'

// Buyer
import BuyerDashboard   from './pages/buyer/BuyerDashboard'
import BrowseProduce    from './pages/buyer/BrowseProduce'
import BuyerOrders      from './pages/buyer/BuyerOrders'
import SavedListings    from './pages/buyer/SavedListings'
import BuyerPrices      from './pages/buyer/BuyerPrices'
import BuyerMessages    from './pages/buyer/BuyerMessages'
import BuyerSettings    from './pages/buyer/BuyerSettings'

// Admin
import AdminDashboard   from './pages/admin/AdminDashboard'
import KycApprovals     from './pages/admin/KycApprovals'
import AdminUsers       from './pages/admin/AdminUsers'
import AdminListings    from './pages/admin/AdminListings'
import AdminOrders      from './pages/admin/AdminOrders'
import AdminPrices      from './pages/admin/AdminPrices'
import AdminDisputes    from './pages/admin/AdminDisputes'
import AdminSettings    from './pages/admin/AdminSettings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"                     element={<LandingPage />}     />

          {/* Auth */}
          <Route path="/auth/role"            element={<ChooseRole />}      />
          <Route path="/auth/register"        element={<Register />}        />
          <Route path="/auth/verify-otp"      element={<VerifyOtp />}       />
          <Route path="/auth/kyc-nin"         element={<KycNin />}          />
          <Route path="/auth/kyc-upload"      element={<KycUpload />}       />
          <Route path="/auth/kyc-pending"     element={<KycPending />}      />
          <Route path="/auth/login"           element={<Login />}           />

          {/* Farmer */}
          <Route path="/farmer/dashboard"     element={<FarmerDashboard />} />
          <Route path="/farmer/listings/new"  element={<NewListing />}      />
          <Route path="/farmer/listings"      element={<MyListings />}      />
          <Route path="/farmer/orders"        element={<Orders />}          />
          <Route path="/farmer/prices"        element={<MarketPrices />}    />
          <Route path="/farmer/logistics"     element={<Logistics />}       />
          <Route path="/farmer/reviews"       element={<Reviews />}         />
          <Route path="/farmer/settings"      element={<Settings />}        />

          {/* Buyer */}
          <Route path="/buyer/dashboard"      element={<BuyerDashboard />}  />
          <Route path="/buyer/browse"         element={<BrowseProduce />}   />
          <Route path="/buyer/orders"         element={<BuyerOrders />}     />
          <Route path="/buyer/saved"          element={<SavedListings />}   />
          <Route path="/buyer/prices"         element={<BuyerPrices />}     />
          <Route path="/buyer/messages"       element={<BuyerMessages />}   />
          <Route path="/buyer/settings"       element={<BuyerSettings />}   />

          {/* Admin */}
          <Route path="/admin/dashboard"      element={<AdminDashboard />}  />
          <Route path="/admin/kyc"            element={<KycApprovals />}    />
          <Route path="/admin/users"          element={<AdminUsers />}      />
          <Route path="/admin/listings"       element={<AdminListings />}   />
          <Route path="/admin/orders"         element={<AdminOrders />}     />
          <Route path="/admin/prices"         element={<AdminPrices />}     />
          <Route path="/admin/disputes"       element={<AdminDisputes />}   />
          <Route path="/admin/settings"       element={<AdminSettings />}   />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
