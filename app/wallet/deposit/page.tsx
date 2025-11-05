"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { CreditCard, Smartphone, Send, Building, ArrowLeft, Check, AlertCircle, Loader } from "lucide-react"

export default function DepositPage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const paymentMethods = [
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      processingTime: "Instant",
    },
    {
      id: "mobile",
      name: "Mobile Money",
      icon: Smartphone,
      description: "MTN, Vodafone, AirtelTigo (Ghana, Nigeria)",
      processingTime: "1-2 minutes",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Send,
      description: "Transfer from your PayPal account",
      processingTime: "Instant",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Building,
      description: "Direct transfer from your bank account",
      processingTime: "1-3 business days",
    },
  ]

  const validateAmount = () => {
    const amountNum = Number.parseFloat(amount)
    if (!amount || amountNum <= 0) {
      setError("Please enter a valid amount")
      return false
    }
    if (amountNum < 5) {
      setError("Minimum deposit is $5")
      return false
    }
    if (amountNum > 10000) {
      setError("Maximum deposit is $10,000")
      return false
    }
    if (!selectedMethod) {
      setError("Please select a payment method")
      return false
    }
    return true
  }

  const handleDeposit = async () => {
    setError("")

    if (!validateAmount()) {
      return
    }

    setProcessing(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)
      setAmount("")
      setSelectedMethod(null)

      setTimeout(() => {
        alert(
          `Successfully deposited $${Number.parseFloat(amount).toFixed(2)} via ${selectedMethod}! Your funds are now available in your wallet.`,
        )
        router.push("/wallet")
      }, 1500)
    } catch (err) {
      setError("Deposit failed. Please try again.")
      setProcessing(false)
    }
  }

  const selectedMethodData = paymentMethods.find((m) => m.id === selectedMethod)

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="gap-2 mb-4" onClick={() => router.push("/wallet")}>
            <ArrowLeft className="w-4 h-4" />
            Back to Wallet
          </Button>
          <h1 className="text-3xl font-bold">Add Funds to Your Account</h1>
          <p className="text-muted-foreground mt-2">Choose a payment method and deposit amount below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Amount Input */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border sticky top-24">
              <h2 className="font-semibold mb-4">Deposit Amount</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount (USD)</label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value)
                        setError("")
                      }}
                      className="pl-8"
                      min="5"
                      step="0.01"
                      disabled={processing}
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {[25, 50, 100, 250].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => {
                        setAmount(quickAmount.toString())
                        setError("")
                      }}
                      className="p-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary/50 transition-colors"
                      disabled={processing}
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">Minimum: $5 • Maximum: $10,000</p>
                </div>

                {/* Summary */}
                {amount && selectedMethod && (
                  <div className="bg-secondary/30 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-semibold">${Number.parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Processing Time:</span>
                      <span className="font-semibold text-xs">{selectedMethodData?.processingTime}</span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">Select Payment Method</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const isSelected = selectedMethod === method.id

                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/30"
                    }`}
                    disabled={processing}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      {isSelected && <Check className="w-5 h-5 text-primary" />}
                    </div>
                    <h3 className="font-semibold mb-1">{method.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                    <p className="text-xs text-accent font-medium">⏱ {method.processingTime}</p>
                  </button>
                )
              })}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-600 dark:text-green-400">Processing your deposit...</p>
              </div>
            )}

            {/* Info Cards */}
            {selectedMethod && (
              <Card className="p-4 bg-secondary/30 border-border">
                <h3 className="font-semibold mb-2 text-sm">Payment Details</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {selectedMethod === "card" && (
                    <>
                      <p>✓ Your card information is encrypted and secure</p>
                      <p>✓ No hidden fees - what you see is what you pay</p>
                      <p>✓ Funds appear instantly in your wallet</p>
                    </>
                  )}
                  {selectedMethod === "mobile" && (
                    <>
                      <p>✓ USSD or app-based transfer available</p>
                      <p>✓ Works with all major mobile networks</p>
                      <p>✓ 1-2 minute processing time</p>
                    </>
                  )}
                  {selectedMethod === "paypal" && (
                    <>
                      <p>✓ Fast and secure PayPal payment</p>
                      <p>✓ Instant fund availability</p>
                      <p>✓ Your PayPal balance protected</p>
                    </>
                  )}
                  {selectedMethod === "bank" && (
                    <>
                      <p>✓ Direct bank-to-account transfer</p>
                      <p>✓ No processing fees on transfers</p>
                      <p>✓ Funds credited within 1-3 business days</p>
                    </>
                  )}
                </div>
              </Card>
            )}

            {/* Deposit Button */}
            <Button
              className="w-full bg-primary text-primary-foreground gap-2 h-12 text-base"
              onClick={handleDeposit}
              disabled={processing || !amount || !selectedMethod}
            >
              {processing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Deposit ${amount || "0.00"}
                </>
              )}
            </Button>

            {/* Security Info */}
            <div className="bg-secondary/30 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">🔒</span>
                All transactions are encrypted and secured with industry-standard security protocols. Your financial
                information is never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
