"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Copy, Check } from "lucide-react"

interface TwoFactorSetupProps {
  onClose: () => void
  onEnable: () => void
}

export function TwoFactorSetup({ onClose, onEnable }: TwoFactorSetupProps) {
  const [step, setStep] = useState<"instructions" | "verify">("instructions")
  const [verifyCode, setVerifyCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const secretKey = "JBSWY3DPEBLW64TMMQ======"
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/SkillWager:user@example.com?secret=${secretKey}`

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleVerify = async () => {
    if (verifyCode.length !== 6) {
      alert("Please enter a 6-digit code")
      return
    }

    setLoading(true)
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store 2FA status
    const settings = JSON.parse(localStorage.getItem("securitySettings") || "{}")
    settings.twoFactorEnabled = true
    settings.secretKey = secretKey
    localStorage.setItem("securitySettings", JSON.stringify(settings))

    alert("Two-factor authentication enabled successfully!")
    onEnable()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Setup Two-Factor Authentication</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "instructions" ? (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm mb-3">
                <strong>Step 1:</strong> Download an authenticator app (Google Authenticator, Authy, Microsoft
                Authenticator)
              </p>
              <p className="text-sm">
                <strong>Step 2:</strong> Scan the QR code below or enter the key manually
              </p>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center gap-4 p-6 bg-secondary/20 rounded-lg border border-border">
              <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code" className="w-40 h-40" />
              <p className="text-xs text-muted-foreground text-center">Scan with your authenticator app</p>
            </div>

            {/* Manual Entry */}
            <div>
              <p className="text-sm font-medium mb-2">Can't scan? Enter this key manually:</p>
              <div className="flex gap-2">
                <Input value={secretKey} readOnly className="bg-input border-border font-mono text-xs" />
                <Button size="sm" variant="outline" className="bg-transparent gap-2" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground" onClick={() => setStep("verify")}>
              Next: Verify Code
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm">Enter the 6-digit code from your authenticator app to verify</p>
            </div>

            <div>
              <label className="text-sm font-medium">Verification Code</label>
              <Input
                type="text"
                maxLength={6}
                placeholder="000000"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ""))}
                className="mt-2 bg-input border-border text-center tracking-widest"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep("instructions")}>
                Back
              </Button>
              <Button className="flex-1 bg-primary text-primary-foreground" onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Enable 2FA"}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
