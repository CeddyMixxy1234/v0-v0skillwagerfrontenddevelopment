/**
 * Safe localStorage wrapper with error handling and type safety
 */

type StorageKey = "user" | "linkedAccounts" | "securitySettings" | "pendingWager" | "leaderboard_cache"

interface StorageData {
  user: any
  linkedAccounts: any[]
  securitySettings: any
  pendingWager: any
  leaderboard_cache: any[]
}

class StorageManager {
  private isAvailable(): boolean {
    try {
      const test = "__storage_test__"
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  set<K extends StorageKey>(key: K, value: StorageData[K]): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`[Storage] Failed to set ${key}:`, error)
      return false
    }
  }

  get<K extends StorageKey>(key: K): StorageData[K] | null {
    if (!this.isAvailable()) return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`[Storage] Failed to get ${key}:`, error)
      return null
    }
  }

  remove(key: StorageKey): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`[Storage] Failed to remove ${key}:`, error)
      return false
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) return false
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error(`[Storage] Failed to clear storage:`, error)
      return false
    }
  }
}

export const storage = new StorageManager()
