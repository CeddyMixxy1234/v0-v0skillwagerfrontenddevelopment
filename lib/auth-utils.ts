export interface User {
  id: string
  email: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const STORAGE_KEY = "user"

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem(STORAGE_KEY)
    if (!userStr) return null

    const user = JSON.parse(userStr) as User
    return user
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

export function setUserSession(user: User): void {
  if (typeof window === "undefined") return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearUserSession(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem("linkedAccounts")
  localStorage.removeItem("securitySettings")
}

export function createUser(email: string): User {
  return {
    id: `user_${Date.now()}`,
    email,
    createdAt: new Date().toISOString(),
  }
}
