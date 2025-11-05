"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Gamepad2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFormValidation } from "@/components/form-validation-helper"
import { setUserSession, createUser } from "@/lib/auth-utils"

export default function LoginPage() {
  const router = useRouter()
  const { validateEmail, validatePassword, validateRequired } = useFormValidation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!validateRequired(email, "Email")) {
      setLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setLoading(false)
      return
    }

    if (!validatePassword(password)) {
      setLoading(false)
      return
    }

    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = createUser(email)
      setUserSession(user)

      router.push("/dashboard")
    } catch (err) {
      setError("Login failed. Please try again.")
      setLoading(false)
    }
  }

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) {
      setError("Please enter your email address")
      return
    }
    setResetSent(true)
    alert(`Password reset link sent to ${resetEmail}. Check your email (or use demo: password)`)
    setTimeout(() => {
      setShowForgotPassword(false)
      setResetEmail("")
      setResetSent(false)
    }, 2000)
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">SkillWager</span>
            </Link>
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground mt-2">Enter your email to receive a reset link</p>
          </div>

          <Card className="p-6 border border-border">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {resetSent && (
                <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm">
                  Reset link sent! Check your email.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="bg-input border-border"
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground">
                Send Reset Link
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                className="w-full text-primary"
                onClick={() => {
                  setShowForgotPassword(false)
                  setResetEmail("")
                }}
              >
                Back to Login
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">SkillWager</span>
          </Link>
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Card className="p-6 border border-border">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">{error}</div>}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
