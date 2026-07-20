import { createContext, useContext, useState } from 'react'
import api from './api'

const AuthContext = createContext(null)

const initialState = {
  role: null,
  user: null,
  kycStatus: null,
  isLoggedIn: false,
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const storedUser = localStorage.getItem('agrilink_user')
    const storedToken = localStorage.getItem('agrilink_token')
    const parsedUser = storedUser ? JSON.parse(storedUser) : null
    return storedUser && storedToken
      ? {
          ...initialState,
          user: parsedUser,
          role: parsedUser?.role ?? null,
          kycStatus: parsedUser?.kyc?.status ?? null,
          isLoggedIn: true,
        }
      : initialState
  })

  const setRole = (role) => setAuthState((s) => ({ ...s, role }))

  const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData)
    const { token, refreshToken, user } = data.data
    localStorage.setItem('agrilink_token', token)
    localStorage.setItem('agrilink_refresh_token', refreshToken)
    localStorage.setItem('agrilink_user', JSON.stringify(user))
    setAuthState((s) => ({ ...s, user, role: user.role, kycStatus: user.kyc?.status ?? null, isLoggedIn: true }))
    return data
  }

  const submitKyc = (kycData) =>
    setAuthState((s) => ({
      ...s,
      user: { ...s.user, ...kycData },
      kycStatus: 'pending',
    }))

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials)
    const { token, refreshToken, user } = data.data
    localStorage.setItem('agrilink_token', token)
    localStorage.setItem('agrilink_refresh_token', refreshToken)
    localStorage.setItem('agrilink_user', JSON.stringify(user))
    setAuthState((s) => ({ ...s, user, role: user.role, kycStatus: user.kyc?.status ?? null, isLoggedIn: true }))
    return data
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('agrilink_token')
      localStorage.removeItem('agrilink_refresh_token')
      localStorage.removeItem('agrilink_user')
      setAuthState(initialState)
    }
  }

  return (
    <AuthContext.Provider value={{ authState, setRole, register, submitKyc, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
