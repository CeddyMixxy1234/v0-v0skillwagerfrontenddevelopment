"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Eye, EyeOff } from "lucide-react"

interface ChangePasswordModalProps {
  onClose: () => void
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Must contain uppercase letter"
    if (!/[0-9]/.test(password)) return "Must contain number"
    if (!/[!@#$%^&*]/.test(password)) return "Must contain special character (!@#$%^&*)"
    return ""
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)
    // Simulate password change
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store password change in security log
    const securitySettings = JSON.parse(localStorage.getItem("securitySettings") || "{}")
    const logs = securitySettings.securityLogs || []
    logs.push({
      type: "PASSWORD_CHANGED",
      timestamp: new Date().toLocaleString(),
      details: "Password changed successfully",
    })
    securitySettings.securityLogs = logs
    localStorage.setItem("securitySettings", JSON.stringify(securitySettings))

    alert("Password changed successfully!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-4 border-border">
        <div className="flex items-center justify-between mb-3">
          {/* reduced text size from text-xl to text-lg */}
          <h2 className="text-lg font-bold">Change Password</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-3">
          {error && <div className="bg-red-500/10 text-red-600 dark:text-red-400 p-2 rounded-lg text-sm">{error}</div>}

          <div>
            <label className="text-sm font-medium">Current Password</label>
            <div className="relative mt-1">
              <Input
                type={showPasswords ? "text" : "password"}
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-input border-border pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">New Password</label>
            <Input
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 bg-input border-border"
            />
            {/* reduced margin from mt-2 to mt-1 */}
            <p className="text-xs text-muted-foreground mt-0.5">
              Must be 8+ characters with uppercase, number, and special character
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 bg-input border-border"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary text-primary-foreground" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
