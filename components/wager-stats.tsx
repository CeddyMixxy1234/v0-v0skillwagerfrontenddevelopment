"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target } from "lucide-react"
import { useState, useEffect } from "react"

export function WagerStats() {
  const [stats, setStats] = useState({
    totalWagers: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    avgWager: 0,
    totalEarned: 0,
  })

  useEffect(() => {
    const wagers = JSON.parse(localStorage.getItem("userWagers") || "[]")
    const completed = wagers.filter((w: any) => w.status === "completed")

    const wins = completed.filter((w: any) => w.result === "won").length
    const losses = completed.filter((w: any) => w.result === "lost").length
    const total = completed.length

    const avgWager = total > 0 ? wagers.reduce((acc: number, w: any) => acc + w.amount, 0) / wagers.length : 0
    const earned = completed.filter((w: any) => w.result === "won").reduce((acc: number, w: any) => acc + w.payout, 0)

    setStats({
      totalWagers: total,
      wins,
      losses,
      winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : "0",
      avgWager: avgWager.toFixed(2),
      totalEarned: earned.toFixed(2),
    })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Win Rate</p>
            <p className="text-2xl font-bold">{stats.winRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.wins}W - {stats.losses}L
            </p>
          </div>
          <Target className="w-8 h-8 text-primary opacity-50" />
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Wager</p>
            <p className="text-2xl font-bold">${stats.avgWager}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.totalWagers} wagers</p>
          </div>
          <TrendingDown className="w-8 h-8 text-accent opacity-50" />
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Earned</p>
            <p className="text-2xl font-bold text-green-500">${stats.totalEarned}</p>
            <p className="text-xs text-muted-foreground mt-1">From wins</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
        </div>
      </Card>
    </div>
  )
}
