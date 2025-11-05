export function sanitizeInput(input: string): string {
  if (!input) return ""

  return input
    .replace(/[<>]/g, "") // Remove angle brackets
    .trim()
    .slice(0, 255) // Limit length
}

export function sanitizeEmail(email: string): string {
  if (!email) return ""

  return email.toLowerCase().trim().slice(0, 254) // RFC 5321
}

export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(username)
}

export function validateWagerAmount(amount: number): boolean {
  return !isNaN(amount) && amount > 0 && amount <= 10000
}

export function isAuthenticatedUser(): boolean {
  if (typeof window === "undefined") return false
  const user = localStorage.getItem("user")
  return user !== null && user !== undefined
}

export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}
