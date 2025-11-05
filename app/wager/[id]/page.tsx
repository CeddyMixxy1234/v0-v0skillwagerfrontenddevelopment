"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Gamepad2, Users, Shield, AlertCircle } from "lucide-react"

export default function WagerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const wagerId = params.id as string

  const wager = {
    id: Number.parseInt(wagerId),
    game: "PUBG",
    creator: "ProPlayer_123",
    amount: 50,
    creatorStats: { wins: 15, losses: 3 },
    description: "Best of 1 match. Winner verified by API. Loser must accept results within 24 hours.",
    rules: [
      "Fair play only - no hacking or exploits",
      "Match must be played within 7 days",
      "Official game API used for verification",
      "Winner receives full pool automatically",
      "Disputes resolved by admin team within 48 hours",
    ],
    gameMode: "1v1",
    platform: "PC",
    createdAt: new Date(),
    status: "open",
  }

  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleJoinWager = async () => {
    setLoading(true)
    // Simulate joining
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setJoined(true)
    setLoading(false)
    // Redirect to active wagers after a delay
    setTimeout(() => router.push("/wagers"), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/wager/browse"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          aria-label="Back to browse wagers"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                    <Gamepad2 className="w-8 h-8" aria-hidden="true" />
                    {wager.game}
                  </h1>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground">Creator: {wager.creator}</span>
                    <span className="text-muted-foreground">Mode: {wager.gameMode}</span>
                    <span className="text-muted-foreground">Platform: {wager.platform}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-2">Wager Amount</p>
                  <p className="text-3xl font-bold text-accent">${wager.amount}</p>
                </div>
              </div>
            </Card>

            {/* Rules & Details */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" role="heading" aria-level={2}>
                <Shield className="w-5 h-5" aria-hidden="true" />
                Rules & Details
              </h2>
              <p className="text-muted-foreground mb-6">{wager.description}</p>
              <div className="space-y-3">
                <h3 className="font-semibold text-sm" role="heading" aria-level={3}>
                  Wager Rules:
                </h3>
                <ul className="space-y-2">
                  {wager.rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="text-primary font-bold min-w-fit" aria-hidden="true">
                        ✓
                      </span>
                      <span className="text-muted-foreground">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Opponent Profile */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" role="heading" aria-level={2}>
                <Users className="w-5 h-5" aria-hidden="true" />
                Opponent Profile
              </h2>
              <div className="space-y-4">
                <p className="text-lg font-semibold">{wager.creator}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-500">{wager.creatorStats.wins}</p>
                    <p className="text-xs text-muted-foreground mt-1">Wins</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-destructive">{wager.creatorStats.losses}</p>
                    <p className="text-xs text-muted-foreground mt-1">Losses</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {(
                        (wager.creatorStats.wins / (wager.creatorStats.wins + wager.creatorStats.losses)) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Win Rate</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card
              className="p-6 border-border sticky top-24 space-y-4"
              role="complementary"
              aria-label="Wager details sidebar"
            >
              <div className="space-y-2 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">Your Stake</p>
                <p className="text-2xl font-bold">${wager.amount}</p>
              </div>

              <div className="space-y-2 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">Potential Payout</p>
                <p className="text-2xl font-bold text-green-500">${wager.amount * 2}</p>
              </div>

              <div className="space-y-2 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">Your Balance</p>
                <p className="text-lg font-bold">$250.50</p>
              </div>

              {!joined ? (
                <>
                  <Button
                    className="w-full bg-primary text-primary-foreground"
                    onClick={handleJoinWager}
                    disabled={loading}
                    size="lg"
                    aria-busy={loading}
                  >
                    {loading ? "Joining..." : "Join Wager"}
                  </Button>
                  <div
                    className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex gap-2 text-xs text-yellow-700 dark:text-yellow-400"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p>Make sure your account is linked before joining!</p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center" role="status">
                  <p className="text-sm font-semibold text-green-500">Wager Joined!</p>
                  <p className="text-xs text-green-500/70 mt-1">Redirecting...</p>
                </div>
              )}

              <div className="p-3 bg-secondary/30 rounded-lg text-xs text-muted-foreground space-y-2">
                <p className="font-semibold">How it Works:</p>
                <ol className="space-y-1">
                  <li>1. Join the wager</li>
                  <li>2. Play the match</li>
                  <li>3. Results auto-verified</li>
                  <li>4. Winner paid instantly</li>
                </ol>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
