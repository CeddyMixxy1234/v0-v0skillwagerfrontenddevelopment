"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardNav } from "@/components/dashboard-nav"
import { Gamepad2, Clock, CheckCircle, AlertCircle, Trophy, Filter } from "lucide-react"
import { useState } from "react"

export default function WagersPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "playing" | "pending" | "completed">("all")

  const activeWagers = [
    {
      id: 1,
      game: "PUBG",
      opponent: "ProPlayer_123",
      amount: 50,
      status: "playing",
      timeLeft: "3 days",
      yourStats: { kills: 0, placement: 0 },
      joined: "2 hours ago",
    },
    {
      id: 2,
      game: "Valorant",
      opponent: "GamingKing",
      amount: 25,
      status: "pending_verification",
      yourScore: "13-11",
      opponentScore: "11-13",
      joined: "1 day ago",
    },
    {
      id: 3,
      game: "Chess.com",
      opponent: "ChessMaster",
      amount: 100,
      status: "completed",
      result: "won",
      payout: 100,
      joined: "3 days ago",
    },
  ]

  const filteredWagers = activeWagers.filter((wager) => {
    if (filterStatus === "all") return true
    if (filterStatus === "playing") return wager.status === "playing"
    if (filterStatus === "pending") return wager.status === "pending_verification"
    if (filterStatus === "completed") return wager.status === "completed"
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "playing":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400"
      case "pending_verification":
        return "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400"
      case "completed":
        return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
      default:
        return "bg-gray-500/10 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "playing":
        return <Clock className="w-4 h-4" />
      case "pending_verification":
        return <AlertCircle className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "playing":
        return "In Progress"
      case "pending_verification":
        return "Pending Verification"
      case "completed":
        return "Completed"
      default:
        return status
    }
  }

  // Wager analytics section with personal statistics
  const totalAmount = activeWagers.reduce((acc, wager) => acc + wager.amount, 0)
  const completedWagers = activeWagers.filter((wager) => wager.status === "completed")
  const wonWagers = completedWagers.filter((wager) => wager.result === "won")
  const lostWagers = completedWagers.filter((wager) => wager.result === "lost")
  const drawWagers = completedWagers.filter((wager) => wager.result !== "won" && wager.result !== "lost")

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Active Wagers</h1>
            <p className="text-muted-foreground mt-1">{filteredWagers.length} wagers</p>
          </div>
          <Link href="/wager/browse">
            <Button className="bg-primary text-primary-foreground w-full sm:w-auto">Browse Wagers</Button>
          </Link>
        </div>

        <Card className="p-4 mb-6 border-border">
          <div className="flex gap-2 flex-wrap">
            {(["all", "playing", "pending", "completed"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "bg-primary" : "bg-transparent"}
              >
                <Filter className="w-4 h-4 mr-1" />
                {status === "all"
                  ? "All"
                  : status === "playing"
                    ? "In Progress"
                    : status === "pending"
                      ? "Pending"
                      : "Completed"}
              </Button>
            ))}
          </div>
        </Card>

        {/* Wager Analytics Section */}
        <Card className="p-6 mb-8 border-border">
          <h2 className="text-2xl font-bold mb-6">Wager Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Stake</p>
              <p className="text-3xl font-bold text-accent mt-2">${totalAmount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Completed Wagers</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{completedWagers.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-3xl font-bold text-green-500 mt-2">
                {completedWagers.length > 0
                  ? ((wonWagers.length / completedWagers.length) * 100).toFixed(2) + "%"
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>

        {filteredWagers.length > 0 ? (
          <div className="space-y-4">
            {filteredWagers.map((wager) => (
              <Card key={wager.id} className="p-6 border-border hover:border-primary/30 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  {/* Game & Opponent */}
                  <div className="flex items-center gap-4 md:col-span-2">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{wager.game}</p>
                      <p className="text-sm text-muted-foreground">vs {wager.opponent}</p>
                    </div>
                  </div>

                  {/* Wager Amount */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Stake</p>
                    <p className="text-2xl font-bold text-accent mt-1">${wager.amount}</p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getStatusColor(wager.status)}`}
                    >
                      {getStatusIcon(wager.status)}
                      <span className="text-sm font-medium">{getStatusLabel(wager.status)}</span>
                    </div>
                  </div>

                  {/* Time / Result */}
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {wager.status === "playing" ? "Time Left" : wager.status === "completed" ? "Result" : "Joined"}
                    </p>
                    {wager.status === "playing" && <p className="font-semibold mt-1">{wager.timeLeft}</p>}
                    {wager.status === "pending_verification" && <p className="font-semibold mt-1">{wager.joined}</p>}
                    {wager.status === "completed" && (
                      <>
                        <p
                          className={`font-semibold mt-1 ${
                            wager.result === "won"
                              ? "text-green-500"
                              : wager.result === "lost"
                                ? "text-destructive"
                                : "text-foreground"
                          }`}
                        >
                          {wager.result === "won" ? "✓ Won" : wager.result === "lost" ? "✗ Lost" : "Draw"}
                        </p>
                        <p className="text-sm text-green-500 font-semibold mt-1">+${wager.payout}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground mb-4">No {filterStatus === "all" ? "" : filterStatus} wagers</p>
            <Link href="/wager/browse" className="text-sm text-primary hover:underline">
              Browse available wagers
            </Link>
          </Card>
        )}
      </main>
    </div>
  )
}
