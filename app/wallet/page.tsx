"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { Wallet, Plus, Minus, TrendingUp, ArrowUpRight, ArrowDownLeft, Copy, Check } from "lucide-react"
import { useStorage } from "@/hooks/use-storage"
import { validators } from "@/lib/validators"

export default function WalletPage() {
  const [tab, setTab] = useState<"overview" | "deposit" | "withdraw">("overview")
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [user] = useStorage("user", null)
  const [depositProcessing, setDepositProcessing] = useState(false)
  const [withdrawProcessing, setWithdrawProcessing] = useState(false)
  const [depositSuccess, setDepositSuccess] = useState(false)
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)
  const router = useRouter()

  const transactions = [
    { id: 1, type: "won", amount: 50, game: "PUBG vs ProPlayer_123", date: "2 hours ago" },
    { id: 2, type: "wager", amount: -25, game: "Valorant vs GamingKing", date: "1 day ago" },
    { id: 3, type: "deposit", amount: 100, method: "Stripe", date: "2 days ago" },
    { id: 4, type: "won", amount: 75, game: "Chess vs ChessMaster", date: "3 days ago" },
    { id: 5, type: "withdraw", amount: -100, method: "Bank Transfer", date: "5 days ago" },
    { id: 6, type: "lost", amount: -50, game: "Fortnite vs ProStreamer", date: "1 week ago" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeposit = async () => {
    const validation = validators.validateAmount(depositAmount, 5, 10000)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    setDepositProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDepositSuccess(true)
      setTimeout(() => {
        alert(`Successfully deposited $${Number.parseFloat(depositAmount).toFixed(2)} to your wallet!`)
        setDepositAmount("")
        setTab("overview")
        setDepositSuccess(false)
        setDepositProcessing(false)
      }, 1000)
    } catch (error) {
      alert("Deposit failed. Please try again.")
      setDepositProcessing(false)
    }
  }

  const handleWithdraw = async () => {
    const validation = validators.validateAmount(withdrawAmount, 10, 250.5)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    setWithdrawProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setWithdrawSuccess(true)
      setTimeout(() => {
        alert(
          `Withdrawal request for $${Number.parseFloat(withdrawAmount).toFixed(2)} submitted! You will receive funds in 2-3 business days.`,
        )
        setWithdrawAmount("")
        setTab("overview")
        setWithdrawSuccess(false)
        setWithdrawProcessing(false)
      }, 1000)
    } catch (error) {
      alert("Withdrawal failed. Please try again.")
      setWithdrawProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wallet Management</h1>

        {/* Balance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-muted-foreground">Available Balance</h3>
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <p className="text-4xl font-bold">$250.50</p>
            <p className="text-sm text-muted-foreground mt-2">Ready to wager</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-muted-foreground">In Escrow</h3>
              <Wallet className="w-5 h-5 text-accent" />
            </div>
            <p className="text-4xl font-bold">$25.00</p>
            <p className="text-sm text-muted-foreground mt-2">Active wagers locked</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-muted-foreground">Total Winnings</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-4xl font-bold text-green-500">$1,250.50</p>
            <p className="text-sm text-muted-foreground mt-2">All time earnings</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Actions & Forms */}
          <div className="space-y-4">
            <Card className="p-6 border-border">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button
                  className="w-full bg-primary text-primary-foreground gap-2"
                  onClick={() => router.push("/wallet/deposit")}
                >
                  <Plus className="w-4 h-4" />
                  Add Funds
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={() => setTab("withdraw")}>
                  <Minus className="w-4 h-4" />
                  Withdraw
                </Button>
              </div>
            </Card>

            {/* Deposit Form */}
            {tab === "deposit" && (
              <Card className="p-6 border-border space-y-4">
                <h3 className="font-semibold">Add Funds via Stripe</h3>
                <div className="space-y-3">
                  {depositSuccess && (
                    <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm">
                      Processing your deposit...
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Amount to Deposit</label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="pl-8"
                        min="5"
                        step="0.01"
                        disabled={depositProcessing}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum: $5 • Maximum: $10,000</p>
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    onClick={handleDeposit}
                    disabled={depositProcessing}
                  >
                    {depositProcessing ? "Processing..." : "Proceed to Stripe"}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setTab("overview")}>
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Withdraw Form */}
            {tab === "withdraw" && (
              <Card className="p-6 border-border space-y-4">
                <h3 className="font-semibold">Withdraw Funds</h3>
                <div className="space-y-3">
                  {withdrawSuccess && (
                    <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm">
                      Processing your withdrawal...
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Amount to Withdraw</label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="pl-8"
                        min="10"
                        max="250.50"
                        step="0.01"
                        disabled={withdrawProcessing}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum: $10 • Maximum: $250.50</p>
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    onClick={handleWithdraw}
                    disabled={withdrawProcessing}
                  >
                    {withdrawProcessing ? "Processing..." : "Request Withdrawal"}
                  </Button>
                  <Button variant="ghost" className="w-full" onClick={() => setTab("overview")}>
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            {/* Account Info */}
            <Card className="p-6 border-border">
              <h3 className="font-semibold mb-4">Account Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs bg-secondary/50 p-2 rounded flex-1 truncate">
                      {user?.email || "loading..."}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(user?.email || "")}
                      className="px-2"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-bold">Transaction History</h2>
              </div>
              <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            tx.type === "won" || tx.type === "deposit" ? "bg-green-500/10" : "bg-destructive/10"
                          }`}
                        >
                          {tx.type === "won" || tx.type === "deposit" ? (
                            <ArrowDownLeft
                              className={`w-5 h-5 ${tx.type === "won" || tx.type === "deposit" ? "text-green-500" : "text-destructive"}`}
                            />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm capitalize">
                            {tx.type === "won"
                              ? "Winnings"
                              : tx.type === "wager"
                                ? "Wager Placed"
                                : tx.type === "deposit"
                                  ? "Deposit"
                                  : tx.type === "lost"
                                    ? "Loss"
                                    : "Withdrawal"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {"game" in tx ? tx.game : "method" in tx ? tx.method : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className={`font-semibold text-sm ${tx.amount > 0 ? "text-green-500" : "text-foreground"}`}>
                          {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-muted-foreground">No transactions yet</div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
