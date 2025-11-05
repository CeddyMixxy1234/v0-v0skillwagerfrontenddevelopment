"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { Gamepad2, Trophy, Clock, CheckCircle, AlertCircle, Filter } from "lucide-react"

export default function MatchesPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "completed" | "disputed">("all")

  const matches = [
    {
      id: 1,
      game: "PUBG",
      opponent: "ProPlayer_123",
      wagerAmount: 50,
      status: "live",
      startTime: "Started 45 min ago",
      timeRemaining: "2 hrs 15 min",
      yourStats: { kills: 5, placement: 1 },
      opponentStats: { kills: 2, placement: 3 },
      platform: "PC",
      mode: "1v1",
    },
    {
      id: 2,
      game: "Valorant",
      opponent: "GamingKing",
      wagerAmount: 25,
      status: "completed",
      result: "won",
      startTime: "1 day ago",
      yourScore: 13,
      opponentScore: 11,
      yourStats: { kills: 28, deaths: 15, assists: 8 },
      opponentStats: { kills: 22, deaths: 18, assists: 6 },
      earnings: 25,
      platform: "PC",
      mode: "1v1",
    },
    {
      id: 3,
      game: "Chess.com",
      opponent: "ChessMaster",
      wagerAmount: 100,
      status: "disputed",
      result: "disputed",
      startTime: "3 days ago",
      dispute: "Player claims disconnection during match",
      yourStats: { movesPlayed: 28, rating: 1650 },
      opponentStats: { movesPlayed: 27, rating: 1720 },
      platform: "Online",
      mode: "1v1",
    },
    {
      id: 4,
      game: "Fortnite",
      opponent: "FortKing",
      wagerAmount: 75,
      status: "completed",
      result: "lost",
      startTime: "2 days ago",
      yourStats: { kills: 3, placement: 4 },
      opponentStats: { kills: 8, placement: 1 },
      platform: "PC",
      mode: "1v1",
    },
    {
      id: 5,
      game: "League of Legends",
      opponent: "MidLaneGod",
      wagerAmount: 50,
      status: "completed",
      result: "won",
      startTime: "5 days ago",
      yourStats: { kills: 12, deaths: 3, cs: 245 },
      opponentStats: { kills: 8, deaths: 6, cs: 198 },
      earnings: 50,
      platform: "PC",
      mode: "1v1",
    },
  ]

  const filteredMatches = matches.filter((match) => {
    if (filterStatus === "all") return true
    return match.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400"
      case "completed":
        return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
      case "disputed":
        return "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 border-gray-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live":
        return <Clock className="w-4 h-4 animate-pulse" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "disputed":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getResultBadge = (result: string) => {
    switch (result) {
      case "won":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs font-semibold text-green-500">
            ✓ Won
          </span>
        )
      case "lost":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-destructive/10 border border-destructive/30 rounded text-xs font-semibold text-destructive">
            ✗ Lost
          </span>
        )
      case "disputed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs font-semibold text-yellow-500">
            ⚠ Disputed
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Match Tracking</h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredMatches.length} matches</p>
          </div>
          <Link href="/wager/browse">
            <Button className="bg-primary text-primary-foreground">Browse Wagers</Button>
          </Link>
        </div>

        <Card className="p-4 mb-6 border-border">
          <div className="flex gap-2 flex-wrap">
            {(["all", "live", "completed", "disputed"] as const).map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className={`${filterStatus === status ? "bg-primary" : "bg-transparent"}`}
              >
                <Filter className="w-4 h-4 mr-1" />
                {status === "all"
                  ? "All Matches"
                  : status === "live"
                    ? "Live"
                    : status === "completed"
                      ? "Completed"
                      : "Disputed"}
              </Button>
            ))}
          </div>
        </Card>

        {filteredMatches.length > 0 ? (
          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <Link key={match.id} href={`/matches/${match.id}`}>
                <Card className="p-4 border-border hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    {/* Game & Opponent */}
                    <div className="md:col-span-2 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Gamepad2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold">{match.game}</p>
                        <p className="text-sm text-muted-foreground truncate">vs {match.opponent}</p>
                        <p className="text-sm text-muted-foreground">{match.mode}</p>
                      </div>
                    </div>

                    {/* Wager & Status */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Wager</p>
                      <p className="font-bold text-accent">${match.wagerAmount}</p>
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded border text-sm font-medium mt-1 w-fit ${getStatusColor(match.status)}`}
                      >
                        {getStatusIcon(match.status)}
                        <span className="capitalize">
                          {match.status === "live" ? "Live" : match.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Your Score */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Your Stats</p>
                      {match.status === "live" && (
                        <div className="space-y-1">
                          {match.yourStats && "kills" in match.yourStats && (
                            <>
                              <p className="font-semibold">{match.yourStats.kills} Kills</p>
                              <p className="text-sm text-muted-foreground">Placement: #{match.yourStats.placement}</p>
                            </>
                          )}
                        </div>
                      )}
                      {match.status === "completed" && match.result !== "disputed" && (
                        <div className="space-y-1">
                          {match.yourStats && "kills" in match.yourStats && (
                            <p className="font-semibold">
                              {match.yourStats.kills}K {match.yourStats.deaths}D
                            </p>
                          )}
                          {match.yourStats && "movesPlayed" in match.yourStats && (
                            <p className="font-semibold">{match.yourStats.movesPlayed} Moves</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Opponent Score */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Opponent</p>
                      {match.status === "live" && (
                        <div className="space-y-1">
                          {match.opponentStats && "kills" in match.opponentStats && (
                            <>
                              <p className="font-semibold">{match.opponentStats.kills} Kills</p>
                              <p className="text-sm text-muted-foreground">
                                Placement: #{match.opponentStats.placement}
                              </p>
                            </>
                          )}
                        </div>
                      )}
                      {match.status === "completed" && match.result !== "disputed" && (
                        <div className="space-y-1">
                          {match.opponentStats && "kills" in match.opponentStats && (
                            <p className="font-semibold">
                              {match.opponentStats.kills}K {match.opponentStats.deaths}D
                            </p>
                          )}
                          {match.opponentStats && "movesPlayed" in match.opponentStats && (
                            <p className="font-semibold">{match.opponentStats.movesPlayed} Moves</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Result */}
                    <div className="text-right">
                      {match.status === "live" && (
                        <p className="text-sm text-muted-foreground">{match.timeRemaining} left</p>
                      )}
                      {match.status === "completed" && (
                        <div className="space-y-2">
                          {getResultBadge(match.result)}
                          {match.earnings && <p className="text-sm font-semibold text-green-500">+${match.earnings}</p>}
                        </div>
                      )}
                      {match.status === "disputed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent text-sm"
                          onClick={() => {
                            alert(
                              `Viewing dispute details for match vs ${match.opponent}. Dispute Status: ${match.dispute}`,
                            )
                          }}
                        >
                          View Dispute
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground mb-2">
              No {filterStatus === "all" ? "" : filterStatus} matches
            </p>
            <Link href="/wager/browse" className="text-sm text-primary hover:underline">
              Start by joining a wager
            </Link>
          </Card>
        )}
      </main>
    </div>
  )
}
