/**
 * Comprehensive input validation and sanitization utilities
 */

export const validators = {
  // Sanitize HTML and XSS attempts
  sanitizeInput: (input: string): string => {
    if (!input) return ""
    return input
      .trim()
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .slice(0, 500) // Limit length
  },

  // Username validation
  validateUsername: (username: string): { valid: boolean; error?: string } => {
    if (!username || username.length < 3) {
      return { valid: false, error: "Username must be at least 3 characters" }
    }
    if (username.length > 20) {
      return { valid: false, error: "Username must not exceed 20 characters" }
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return { valid: false, error: "Username can only contain letters, numbers, underscores, and hyphens" }
    }
    return { valid: true }
  },

  // Email validation
  validateEmail: (email: string): { valid: boolean; error?: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return { valid: false, error: "Please enter a valid email address" }
    }
    return { valid: true }
  },

  // Password validation
  validatePassword: (password: string): { valid: boolean; error?: string } => {
    if (!password || password.length < 8) {
      return { valid: false, error: "Password must be at least 8 characters" }
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, error: "Password must contain at least one uppercase letter" }
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, error: "Password must contain at least one lowercase letter" }
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, error: "Password must contain at least one number" }
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return { valid: false, error: "Password must contain at least one special character (!@#$%^&*)" }
    }
    return { valid: true }
  },

  // Amount validation
  validateAmount: (
    amount: string,
    min = 0,
    max: number = Number.POSITIVE_INFINITY,
  ): { valid: boolean; error?: string } => {
    const num = Number.parseFloat(amount)
    if (Number.isNaN(num) || num <= 0) {
      return { valid: false, error: "Please enter a valid amount" }
    }
    if (num < min) {
      return { valid: false, error: `Minimum amount is $${min}` }
    }
    if (num > max) {
      return { valid: false, error: `Maximum amount is $${max}` }
    }
    return { valid: true }
  },

  // Generic required field validation
  validateRequired: (value: string, fieldName: string): { valid: boolean; error?: string } => {
    if (!value || value.trim().length === 0) {
      return { valid: false, error: `${fieldName} is required` }
    }
    return { valid: true }
  },
}
