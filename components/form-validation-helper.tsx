"use client"

import { useToast } from "@/components/toast-provider"
import { sanitizeInput, sanitizeEmail } from "@/lib/security"

export function useFormValidation() {
  const { addToast } = useToast()

  const validateWagerAmount = (amount: string | number, minAmount = 1, maxAmount = 250) => {
    const num = Number.parseFloat(String(amount))

    if (!amount || Number.isNaN(num) || num <= 0) {
      addToast("Please enter a valid amount", "error")
      return false
    }

    if (num < minAmount) {
      addToast(`Minimum wager amount is $${minAmount}`, "error")
      return false
    }

    if (num > maxAmount) {
      addToast(`Maximum wager amount is $${maxAmount}`, "error")
      return false
    }

    return true
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const sanitized = sanitizeEmail(email)

    if (!email || !emailRegex.test(sanitized)) {
      addToast("Please enter a valid email address", "error")
      return false
    }
    return true
  }

  const validatePassword = (password: string) => {
    if (!password || password.length < 6) {
      addToast("Password must be at least 6 characters", "error")
      return false
    }

    if (password.length < 8) {
      addToast("Password should be at least 8 characters for security", "warning")
    }

    return true
  }

  const validateRequired = (value: string | null | undefined, fieldName: string) => {
    if (!value) {
      addToast(`${fieldName} is required`, "error")
      return false
    }
    return true
  }

  const validateUsername = (username: string) => {
    const sanitized = sanitizeInput(username)
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/

    if (!sanitized || !usernameRegex.test(sanitized)) {
      addToast("Username must be 3-20 characters, containing only letters, numbers, hyphens, and underscores", "error")
      return false
    }
    return true
  }

  const validatePasswordMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error")
      return false
    }
    return true
  }

  const sanitizeAndValidate = (input: string, fieldName: string, minLength = 1) => {
    const sanitized = sanitizeInput(input)

    if (!sanitized || sanitized.length < minLength) {
      addToast(`${fieldName} must be at least ${minLength} characters`, "error")
      return null
    }

    return sanitized
  }

  return {
    validateWagerAmount,
    validateEmail,
    validatePassword,
    validateRequired,
    validateUsername,
    validatePasswordMatch,
    sanitizeAndValidate,
    addToast,
  }
}
