"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Wallet, Plus, Gamepad2, TrendingUp, ArrowUpRight, ArrowDownLeft, Zap, Check } from "lucide-react"
import { AchievementBadges } from "@/components/achievement-badges"
import { WagerStats } from "@/components/wager-stats"
import { RecommendedWagers } from "@/components/recommended-wagers"
import { ROUTES } from "@/lib/routes" // Fixed import path from constants/routes to lib/routes

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    balance: 250.5,
    escrow: 25.0,
    totalWinnings: 1250.0,
    totalWagers: 12,
    wins: 8,
    losses: 4,
  })
  const [currentTier, setCurrentTier] = useState("free")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
      const userObject = JSON.parse(userData)
      setCurrentTier(userObject.subscriptionTier || "free")
    } catch (error) {
      router.push("/auth/login")
      return
    }

    setLoading(false)
  }, [router])

  const recentWagers = [
    { id: 1, game: "PUBG", opponent: "ProPlayer_123", amount: 50, status: "won", date: "2 hours ago" },
    { id: 2, game: "Valorant", opponent: "GamingKing", amount: 25, status: "pending", date: "1 day ago" },
    { id: 3, game: "Chess.com", opponent: "ChessMaster", amount: 100, status: "lost", date: "3 days ago" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-7xl mx-auto px-3 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.email?.split("@")[0] || "Player"}</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's your gaming dashboard</p>
          </div>
          <Link href="/wager/create">
            <Button className="bg-primary text-primary-foreground gap-2 py-2 px-4 h-auto">
              <Plus className="w-4 h-4" />
              Create Wager
            </Button>
          </Link>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Available Balance</h3>
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">${stats.balance.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">Ready to wager</p>
            <Link href="/wallet" className="mt-3 inline-block">
              <Button size="sm" variant="outline" className="text-sm bg-transparent">
                Manage Wallet
              </Button>
            </Link>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-muted-foreground">In Escrow</h3>
              <Gamepad2 className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold">${stats.escrow.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">In active wagers</p>
            <p className="text-sm text-muted-foreground">Locked until match completes</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Total Winnings</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-500">${stats.totalWinnings.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-2">All time earnings</p>
          </Card>
        </div>

        {/* Subscription Status */}
        {currentTier === "free" && (
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Upgrade to Pro</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock unlimited wagers, advanced analytics, tournaments, and more
                </p>
              </div>
              <Link href={ROUTES.SUBSCRIPTION}>
                <Button className="bg-primary text-primary-foreground gap-2">
                  <Zap className="w-4 h-4" />
                  Upgrade Now
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Subscription Active Status */}
        {currentTier !== "free" && (
          <Card className="p-4 bg-green-500/10 border-green-500/30 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold text-sm">
                    Premium {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Active
                  </p>
                  <p className="text-xs text-muted-foreground">Your premium features are active</p>
                </div>
              </div>
              <Link href={ROUTES.SUBSCRIPTION}>
                <Button variant="outline" size="sm" className="bg-transparent text-sm">
                  Manage
                </Button>
              </Link>
            </div>
          </Card>
        )}

        <div className="mb-6">
          <WagerStats />
        </div>

        {/* Achievements Section */}
        <div className="mb-6">
          <AchievementBadges compact={true} />
        </div>

        {/* Recommended Wagers Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Recommended for You</h2>
            <Link href="/wager/browse">
              <Button variant="ghost" size="sm" className="text-sm">
                Browse All →
              </Button>
            </Link>
          </div>
          <RecommendedWagers />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card className="p-3 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-2xl font-bold text-primary">{stats.totalWagers}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Wagers</p>
          </Card>
          <Card className="p-3 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-2xl font-bold text-green-500">{stats.wins}</p>
            <p className="text-sm text-muted-foreground mt-1">Wins</p>
          </Card>
          <Card className="p-3 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-2xl font-bold text-destructive">{stats.losses}</p>
            <p className="text-sm text-muted-foreground mt-1">Losses</p>
          </Card>
          <Card className="p-3 text-center border-border hover:bg-secondary/50 transition-colors">
            <p className="text-2xl font-bold">{((stats.wins / stats.totalWagers) * 100).toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground mt-1">Win Rate</p>
          </Card>
        </div>

        {/* Recent Wagers */}
        <Card className="border-border">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Wagers</h2>
            <Link href="/wagers">
              <Button variant="ghost" size="sm" className="text-sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentWagers.map((wager) => (
              <div
                key={wager.id}
                className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors text-sm"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Gamepad2 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{wager.game}</p>
                    <p className="text-sm text-muted-foreground truncate">vs {wager.opponent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-2">
                  <div className="text-right">
                    <p className="font-semibold">${wager.amount.toFixed(2)}</p>
                    <p
                      className={`text-xs font-medium ${wager.status === "won" ? "text-green-500" : wager.status === "lost" ? "text-destructive" : "text-yellow-500"}`}
                    >
                      {wager.status === "won" ? "✓ Won" : wager.status === "lost" ? "✗ Lost" : "⏳ Pending"}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-muted-foreground whitespace-nowrap">
                    {wager.status === "won" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDownLeft className="w-3 h-3 text-destructive" />
                    )}
                    {wager.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-secondary/30 text-center border-t border-border">
            <Link href="/wagers">
              <Button variant="ghost" size="sm" className="text-sm">
                View All Wagers →
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  )
}
