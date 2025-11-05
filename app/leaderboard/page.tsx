"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Trophy, Crown, TrendingUp, Filter, Medal } from "lucide-react"
import { useStorage } from "@/hooks/use-storage"

export default function LeaderboardPage() {
  const [gameFilter, setGameFilter] = useState<string>("all")
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all")
  const [leaderboardData, setLeaderboardData] = useStorage("leaderboard_cache", [])
  const [loading, setLoading] = useState(true)

  const games = ["all", ...new Set(leaderboardData.map((entry) => entry.game))]

  const filteredLeaderboard = leaderboardData
    .filter((entry) => (gameFilter === "all" ? true : entry.game === gameFilter))
    .slice(0, 50)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "legendary":
        return "bg-yellow-500/20 border-yellow-500/40 text-yellow-600 dark:text-yellow-400"
      case "elite":
        return "bg-purple-500/20 border-purple-500/40 text-purple-600 dark:text-purple-400"
      case "expert":
        return "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400"
      default:
        return "bg-green-500/20 border-green-500/40 text-green-600 dark:text-green-400"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />
      default:
        return <span className="font-bold text-primary text-sm">{rank}</span>
    }
  }

  useEffect(() => {
    if (leaderboardData.length === 0) {
      const generateLeaderboardData = () => {
        const games = ["Valorant", "PUBG", "Chess.com", "League of Legends", "Fortnite", "Dota 2"]
        const data = games.flatMap((game, idx) =>
          Array.from({ length: 5 }, (_, i) => ({
            rank: idx * 5 + i + 1,
            username: `${game.replace(/\s+/g, "")}Player${Math.floor(Math.random() * 1000)}`,
            game,
            wins: Math.floor(Math.random() * 250) + 50,
            winRate: (Math.random() * 25 + 55).toFixed(1),
            earnings: (Math.random() * 10000 + 1000).toFixed(2),
            badge: ["legendary", "elite", "expert", "advanced"][Math.floor(Math.random() * 4)],
            verified: Math.random() > 0.3,
          })),
        )
        return data.sort((a, b) => b.wins - a.wins)
      }

      const newData = generateLeaderboardData()
      setLeaderboardData(newData)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold">Global Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">Top players earning real money through competitive gaming</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-4 border-border">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-semibold">Game</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => setGameFilter(game)}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors ${
                    gameFilter === game
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/30 border-border hover:border-primary/50"
                  }`}
                >
                  {game === "all" ? "All Games" : game}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-semibold">Time Period</label>
            </div>
            <div className="flex gap-2">
              {(["all", "month", "week"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeFilter(period)}
                  className={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors ${
                    timeFilter === period
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/30 border-border hover:border-primary/50"
                  }`}
                >
                  {period === "all" ? "All Time" : period === "month" ? "This Month" : "This Week"}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card className="border-border overflow-hidden">
          <div className="hidden md:grid md:grid-cols-7 gap-4 p-6 bg-secondary/20 border-b border-border font-semibold text-sm">
            <div>Rank</div>
            <div className="col-span-2">Player</div>
            <div>Game</div>
            <div className="text-right">Wins</div>
            <div className="text-right">Win Rate</div>
            <div className="text-right">Earnings</div>
          </div>

          <div className="divide-y divide-border">
            {filteredLeaderboard.map((entry) => (
              <Link
                key={`${entry.rank}-${entry.username}`}
                href={`/profile/${entry.username}`}
                className="hover:bg-secondary/30 transition-colors"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                  {/* Rank */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center">{getRankIcon(entry.rank)}</div>
                  </div>

                  {/* Player Info */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold line-clamp-1">{entry.username}</p>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getBadgeColor(entry.badge)}`}
                        >
                          {entry.badge.charAt(0).toUpperCase() + entry.badge.slice(1)}
                          {entry.verified && " ✓"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Game */}
                  <div className="text-sm">
                    <p className="md:hidden text-muted-foreground mb-1">Game</p>
                    <p className="font-medium">{entry.game}</p>
                  </div>

                  {/* Wins */}
                  <div className="text-right">
                    <p className="md:hidden text-muted-foreground mb-1">Wins</p>
                    <p className="font-semibold text-primary">{entry.wins}</p>
                  </div>

                  {/* Win Rate */}
                  <div className="text-right">
                    <p className="md:hidden text-muted-foreground mb-1">Win Rate</p>
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-full md:w-16 bg-secondary/30 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-accent to-primary h-full rounded-full"
                          style={{ width: `${Math.min(Number.parseFloat(entry.winRate), 100)}%` }}
                        />
                      </div>
                      <p className="font-semibold text-sm">{entry.winRate}%</p>
                    </div>
                  </div>

                  {/* Earnings */}
                  <div className="text-right">
                    <p className="md:hidden text-muted-foreground mb-1">Earnings</p>
                    <p className="font-bold text-green-500">${Number.parseFloat(entry.earnings).toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
