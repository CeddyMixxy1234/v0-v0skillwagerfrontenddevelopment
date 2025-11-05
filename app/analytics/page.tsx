"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { ROUTES } from "@/lib/routes"
import { useStorage } from "@/hooks/use-storage"
import { calculateAnalytics } from "@/lib/analytics"

export default function AnalyticsDashboard() {
  const [user] = useStorage("user", null)
  const [wagers] = useStorage("wagers", [])

  const analytics = calculateAnalytics(wagers)

  const gameBreakdown = [
    { name: "PUBG", wagers: 5, wins: 4, earnings: 250 },
    { name: "Valorant", wagers: 4, wins: 2, earnings: 150 },
    { name: "Chess.com", wagers: 3, wins: 2, earnings: 100 },
  ]

  const topOpponents = [
    { name: "ProPlayer_123", played: 4, wins: 3 },
    { name: "GamingKing", played: 3, wins: 2 },
    { name: "SkillMaster", played: 2, wins: 1 },
  ]

  const StatCard = ({ icon: Icon, title, value, unit = "", change = null, subtext = "" }: any) => (
    <Card className="p-4 border-border hover:bg-secondary/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <p className="text-3xl font-bold mb-2">
        {value}
        {unit}
      </p>
      {change && (
        <div className="flex items-center gap-1">
          {change > 0 ? (
            <TrendingUp className="w-3 h-3 text-green-500" />
          ) : (
            <TrendingDown className="w-3 h-3 text-destructive" />
          )}
          <span className={change > 0 ? "text-green-500 text-xs" : "text-destructive text-xs"}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
        </div>
      )}
      {subtext && <p className="text-xs text-muted-foreground mt-2">{subtext}</p>}
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link href={ROUTES.DASHBOARD} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Advanced Analytics</h1>
          <p className="text-lg text-muted-foreground">Track your performance across all games and opponents</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={BarChart3} title="Total Wagers" value={analytics.totalWagers} change={12} />
          <StatCard
            icon={TrendingUp}
            title="Win Rate"
            value={analytics.winRate}
            unit="%"
            subtext={`${analytics.totalWins}W - ${analytics.totalLosses}L`}
          />
          <StatCard icon={TrendingUp} title="Total Earnings" value={`$${analytics.totalEarnings}`} change={8} />
          <StatCard
            icon={BarChart3}
            title="Current Streak"
            value={analytics.currentStreak}
            subtext={`Best: ${analytics.bestStreak}`}
          />
        </div>

        {/* Performance Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 border-border">
            <h3 className="font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Average Wager</span>
                <span className="font-semibold">${analytics.averageWagerAmount}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Largest Win</span>
                <span className="font-semibold text-green-500">${analytics.largestWin}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Largest Loss</span>
                <span className="font-semibold text-destructive">${analytics.largestLoss}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <h3 className="font-semibold mb-4">Monthly Trend</h3>
            <div className="space-y-2">
              <div className="h-24 bg-secondary/30 rounded flex items-end justify-around p-2">
                <div className="w-3 h-12 bg-primary/60 rounded" title="Week 1" />
                <div className="w-3 h-16 bg-primary rounded" title="Week 2" />
                <div className="w-3 h-20 bg-primary rounded" title="Week 3" />
                <div className="w-3 h-14 bg-primary/60 rounded" title="Week 4" />
              </div>
              <p className="text-xs text-muted-foreground text-center">Last 4 weeks earnings trend</p>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <h3 className="font-semibold mb-4">ROI Analysis</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-muted-foreground">ROI</span>
                  <span className="font-semibold text-green-500">+42.5%</span>
                </div>
                <div className="w-full h-2 bg-secondary/50 rounded overflow-hidden">
                  <div className="h-full bg-green-500/60 rounded" style={{ width: "42.5%" }} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">You've earned $1,250 on $1,000 wagered</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Game Breakdown */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-bold mb-6">Performance by Game</h2>
            <div className="space-y-4">
              {gameBreakdown.map((game) => (
                <div key={game.name} className="p-4 bg-secondary/20 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{game.name}</h3>
                    <span className="text-sm font-semibold text-primary">
                      {Math.round((game.wins / game.wagers) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>
                      {game.wins}W - {game.wagers - game.wins}L
                    </span>
                    <span className="text-green-500">+${game.earnings}</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded overflow-hidden">
                    <div
                      className="h-full bg-primary rounded"
                      style={{ width: `${(game.wins / game.wagers) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Opponents */}
          <Card className="p-6 border-border">
            <h2 className="text-lg font-bold mb-6">Top Opponents</h2>
            <div className="space-y-4">
              {topOpponents.map((opponent, index) => (
                <div
                  key={opponent.name}
                  className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{opponent.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {opponent.wins}W - {opponent.played - opponent.wins}L
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{Math.round((opponent.wins / opponent.played) * 100)}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 border-border mt-8 bg-accent/5">
          <h2 className="text-lg font-bold mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded">
              <p className="text-sm font-semibold mb-2">Strongest Game</p>
              <p className="text-2xl font-bold text-green-500">PUBG</p>
              <p className="text-xs text-muted-foreground mt-1">80% win rate</p>
            </div>
            <div className="p-4 bg-background rounded">
              <p className="text-sm font-semibold mb-2">Best Time to Play</p>
              <p className="text-2xl font-bold">Evenings</p>
              <p className="text-xs text-muted-foreground mt-1">65% win rate 6-10PM</p>
            </div>
            <div className="p-4 bg-background rounded">
              <p className="text-sm font-semibold mb-2">Recommendation</p>
              <p className="text-2xl font-bold">Focus PUBG</p>
              <p className="text-xs text-muted-foreground mt-1">Higher ROI potential</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
