import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  username: string
  role: string
  token: string
}

interface AuthContextType {
  user: User | null
  login: (u: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : null
  })

  function login(u: User) {
    localStorage.setItem("user", JSON.stringify(u))
    localStorage.setItem("token", u.token)
    setUser(u)
  }

  function logout() {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth deve essere nel AuthProvider")
  return ctx
}
