"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, clearUserSession, type User } from "@/lib/auth-utils"

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated_, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsAuthenticated(currentUser !== null)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    clearUserSession()
    setUser(null)
    setIsAuthenticated(false)
    router.push("/auth/login")
  }, [router])

  const requireAuth = useCallback(() => {
    if (!isAuthenticated_ && !isLoading) {
      router.push("/auth/login")
    }
  }, [isAuthenticated_, isLoading, router])

  return {
    user,
    isLoading,
    isAuthenticated: isAuthenticated_,
    logout,
    requireAuth,
  }
}
