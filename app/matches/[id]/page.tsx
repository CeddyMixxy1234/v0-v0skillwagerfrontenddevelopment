"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Gamepad2, CheckCircle, AlertCircle, Share2 } from "lucide-react"

export default function MatchDetailPage() {
  const params = useParams()
  const matchId = Number.parseInt(params.id as string)
  const [showDispute, setShowDispute] = useState(false)

  const match = {
    id: matchId,
    game: "PUBG",
    opponent: "ProPlayer_123",
    wagerAmount: 50,
    status: "completed",
    result: "won",
    earnings: 50,
    startTime: "November 4, 2024 at 2:30 PM",
    endTime: "November 4, 2024 at 3:15 PM",
    duration: "45 minutes",
    platform: "PC",
    mode: "1v1 BR",
    yourStats: {
      kills: 8,
      deaths: 2,
      damage: 650,
      placement: 1,
      headshots: 3,
      armorHealed: 120,
    },
    opponentStats: {
      kills: 5,
      deaths: 1,
      damage: 480,
      placement: 2,
      headshots: 1,
      armorHealed: 80,
    },
    timeline: [
      { time: "00:00", event: "Match started", player: "both" },
      { time: "05:30", event: "First blood", player: "you", description: "You secured first kill" },
      { time: "12:45", event: "Opponent eliminated", player: "you", description: "ProPlayer_123 was eliminated" },
      { time: "45:00", event: "Victory royale", player: "you", description: "You won the match" },
    ],
    verification: {
      status: "verified",
      verifiedAt: "November 4, 2024 at 3:18 PM",
      verificationMethod: "API",
      gameId: "pubg_match_xyz789",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/matches"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          aria-label="Back to matches"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to Matches
        </Link>

        {/* Header */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3 mb-3">
                <Gamepad2 className="w-8 h-8" aria-hidden="true" />
                {match.game}
              </h1>
              <p className="text-muted-foreground">vs {match.opponent}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                <span className="font-bold text-green-500">Victory</span>
              </div>
              <p className="text-3xl font-bold text-green-500">+${match.earnings}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Wager Amount</p>
              <p className="font-bold text-lg">${match.wagerAmount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-bold text-lg">{match.duration}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Game Mode</p>
              <p className="font-bold text-lg">{match.mode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platform</p>
              <p className="font-bold text-lg">{match.platform}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Stats Comparison */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold mb-6" role="heading" aria-level={2}>
                Match Statistics
              </h2>
              <div className="space-y-6">
                {/* Kills */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Your Kills: {match.yourStats.kills}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Opponent Kills: {match.opponentStats.kills}
                    </span>
                  </div>
                  <div
                    className="w-full bg-border rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-label={`Kill ratio: You ${match.yourStats.kills} vs ${match.opponentStats.kills}`}
                  >
                    <div
                      className="bg-green-500 h-full"
                      style={{
                        width: `${(match.yourStats.kills / (match.yourStats.kills + match.opponentStats.kills)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Damage */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Your Damage: {match.yourStats.damage}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Opponent Damage: {match.opponentStats.damage}
                    </span>
                  </div>
                  <div
                    className="w-full bg-border rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-label={`Damage ratio: You ${match.yourStats.damage} vs ${match.opponentStats.damage}`}
                  >
                    <div
                      className="bg-accent h-full"
                      style={{
                        width: `${(match.yourStats.damage / (match.yourStats.damage + match.opponentStats.damage)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Headshots */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Your Headshots: {match.yourStats.headshots}</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Opponent Headshots: {match.opponentStats.headshots}
                    </span>
                  </div>
                  <div
                    className="w-full bg-border rounded-full h-2 overflow-hidden"
                    role="progressbar"
                    aria-label={`Headshot ratio: You ${match.yourStats.headshots} vs ${match.opponentStats.headshots}`}
                  >
                    <div
                      className="bg-purple-500 h-full"
                      style={{
                        width: `${(match.yourStats.headshots / Math.max(match.yourStats.headshots + match.opponentStats.headshots, 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border">
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm" role="heading" aria-level={3}>
                    Your Stats
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">K/D:</span>{" "}
                      <span className="font-semibold">
                        {match.yourStats.kills}/{match.yourStats.deaths}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Placement:</span>{" "}
                      <span className="font-semibold">#{match.yourStats.placement}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Armor Healed:</span>{" "}
                      <span className="font-semibold">{match.yourStats.armorHealed}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm" role="heading" aria-level={3}>
                    Opponent Stats
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">K/D:</span>{" "}
                      <span className="font-semibold">
                        {match.opponentStats.kills}/{match.opponentStats.deaths}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Placement:</span>{" "}
                      <span className="font-semibold">#{match.opponentStats.placement}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Armor Healed:</span>{" "}
                      <span className="font-semibold">{match.opponentStats.armorHealed}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Match Timeline */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold mb-6" role="heading" aria-level={2}>
                Match Timeline
              </h2>
              <div className="space-y-4">
                {match.timeline.map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${event.player === "you" ? "bg-green-500" : "bg-primary"}`}
                        aria-hidden="true"
                      />
                      {idx < match.timeline.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm">{event.event}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                      {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Verification */}
            <Card className="p-6 border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2" role="heading" aria-level={2}>
                <CheckCircle className="w-5 h-5 text-green-500" aria-hidden="true" />
                Verification Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm font-medium">Status</span>
                  <span className="text-sm font-semibold text-green-500">Verified</span>
                </div>
                <p className="text-sm">
                  <span className="text-muted-foreground">Verified at:</span> {match.verification.verifiedAt}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Method:</span> {match.verification.verificationMethod}
                </p>
                <p className="text-sm font-mono text-muted-foreground text-xs break-all">
                  ID: {match.verification.gameId}
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="p-6 border-border">
              <h3 className="font-bold mb-4" role="heading" aria-level={2}>
                Match Information
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Started</p>
                  <p className="font-medium">{match.startTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Ended</p>
                  <p className="font-medium">{match.endTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium">{match.duration}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="font-bold mb-4" role="heading" aria-level={2}>
                Actions
              </h3>
              <div className="space-y-3">
                <Button
                  className="w-full bg-primary text-primary-foreground gap-2"
                  onClick={() => {
                    navigator
                      .share?.({
                        title: `${match.game} Match Result`,
                        text: `I just won a match against ${match.opponent}! Check out my victory on SkillWager.`,
                        url: window.location.href,
                      })
                      .catch(() => {
                        navigator.clipboard.writeText(window.location.href)
                        alert("Link copied to clipboard!")
                      })
                  }}
                >
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                  Share Results
                </Button>
                {match.status === "completed" && !showDispute && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent gap-2"
                    onClick={() => setShowDispute(true)}
                  >
                    <AlertCircle className="w-4 h-4" aria-hidden="true" />
                    Dispute Match
                  </Button>
                )}
              </div>

              {showDispute && (
                <div
                  className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg space-y-3"
                  role="region"
                  aria-label="Dispute form"
                >
                  <p className="text-sm font-semibold">Report a Dispute</p>
                  <textarea
                    placeholder="Describe the issue with this match..."
                    className="w-full p-2 text-sm rounded border border-border bg-background resize-none"
                    rows={3}
                    id="dispute-reason"
                    aria-label="Dispute reason"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-primary text-primary-foreground"
                      onClick={() => {
                        const reason = (document.getElementById("dispute-reason") as HTMLTextAreaElement)?.value
                        if (reason) {
                          alert("Dispute submitted successfully. Our team will review it within 24 hours.")
                          setShowDispute(false)
                        } else {
                          alert("Please describe the issue")
                        }
                      }}
                    >
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowDispute(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-4 border-border bg-green-500/5 text-sm">
              <p className="text-muted-foreground">
                Match results are verified by official game APIs to ensure fair play.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
