import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    role: null,
    user: null,
    kycStatus: null, // null | 'pending' | 'approved' | 'rejected'
    isLoggedIn: false,
  })

  const setRole = (role) => setAuthState(s => ({ ...s, role }))

  const register = (userData) =>
    setAuthState(s => ({ ...s, user: { ...s.user, ...userData } }))

  const submitKyc = (kycData) =>
    setAuthState(s => ({
      ...s,
      user: { ...s.user, ...kycData },
      kycStatus: 'pending',
    }))

  const login = (userData) =>
    setAuthState(s => ({ ...s, ...userData, isLoggedIn: true }))

  return (
    <AuthContext.Provider value={{ authState, setRole, register, submitKyc, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
