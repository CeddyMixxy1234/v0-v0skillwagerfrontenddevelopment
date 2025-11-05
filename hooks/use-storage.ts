"use client"

import { useState, useEffect } from "react"
import { storage } from "@/lib/storage"

type StorageKey = "user" | "linkedAccounts" | "securitySettings" | "pendingWager" | "leaderboard_cache"

/**
 * Custom hook for managing localStorage state with type safety and error handling
 */
export function useStorage<T>(key: StorageKey, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = storage.get(key)
      if (item !== null) {
        setStoredValue(item)
      }
      setIsLoaded(true)
    } catch (error) {
      console.error(`[useStorage] Failed to load ${key}:`, error)
      setIsLoaded(true)
    }
  }, [key])

  // Setter function
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      storage.set(key, valueToStore)
    } catch (error) {
      console.error(`[useStorage] Failed to set ${key}:`, error)
    }
  }

  return [storedValue, setValue]
}
