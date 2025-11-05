"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

type RecommendedWager = {
  id: number
  game: string
  creator: string
  amount: number
  creatorStats: { wins: number; losses: number }
  gameMode: string
  matchScore: number // 0-100, how well matched the players are
}

export function RecommendedWagers() {
  const [wagers, setWagers] = useState<RecommendedWager[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching recommendations based on player skill level
    const mockWagers: RecommendedWager[] = [
      {
        id: 101,
        game: "Valorant",
        creator: "SkillMatch_Pro",
        amount: 30,
        creatorStats: { wins: 20, losses: 5 },
        gameMode: "1v1",
        matchScore: 92,
      },
      {
        id: 102,
        game: "PUBG",
        creator: "CompetitiveGamer",
        amount: 45,
        creatorStats: { wins: 18, losses: 6 },
        gameMode: "1v1",
        matchScore: 85,
      },
      {
        id: 103,
        game: "League of Legends",
        creator: "RankedMaster",
        amount: 50,
        creatorStats: { wins: 25, losses: 4 },
        gameMode: "1v1",
        matchScore: 78,
      },
    ]
    setWagers(mockWagers)
    setLoading(false)
  }, [])

  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent Match"
    if (score >= 75) return "Good Match"
    if (score >= 60) return "Fair Match"
    return "Consider Skill Gap"
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500/10 text-green-700 dark:text-green-400"
    if (score >= 75) return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
    if (score >= 60) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
    return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-secondary rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {wagers.map((wager) => {
        const winRate = (wager.creatorStats.wins / (wager.creatorStats.wins + wager.creatorStats.losses)) * 100
        return (
          <Card key={wager.id} className="p-4 border-border hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{wager.game}</p>
                  <p className="text-xs text-muted-foreground">by {wager.creator}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      {winRate.toFixed(0)}% WR
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      {wager.creatorStats.wins}W-{wager.creatorStats.losses}L
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${getMatchScoreColor(wager.matchScore)}`}
                >
                  {wager.matchScore}% Match
                </span>
                <p className="text-lg font-bold text-accent">${wager.amount}</p>
                <Link href="/wager/browse">
                  <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
