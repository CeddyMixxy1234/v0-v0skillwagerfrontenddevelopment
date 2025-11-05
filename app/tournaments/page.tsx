"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Trophy, Users, Zap, Calendar } from "lucide-react"
import { ROUTES } from "@/lib/routes"
import { POPULAR_TOURNAMENTS } from "@/lib/tournaments"

export default function TournamentsPage() {
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null)
  const [registeredTournaments, setRegisteredTournaments] = useState<string[]>([])

  const handleRegister = (tournamentId: string) => {
    if (!registeredTournaments.includes(tournamentId)) {
      setRegisteredTournaments([...registeredTournaments, tournamentId])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link href={ROUTES.DASHBOARD} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Tournaments</h1>
              <p className="text-lg text-muted-foreground">Compete in tournaments and win massive prize pools</p>
            </div>
            <Button className="bg-primary text-primary-foreground gap-2">
              <Trophy className="w-4 h-4" />
              Create Tournament
            </Button>
          </div>
        </div>

        {/* Tournament Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border">
            <p className="text-sm text-muted-foreground mb-1">Active Tournaments</p>
            <p className="text-3xl font-bold">12</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Prize Pool</p>
            <p className="text-3xl font-bold">$150K</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-sm text-muted-foreground mb-1">Registered</p>
            <p className="text-3xl font-bold">{registeredTournaments.length}</p>
          </Card>
          <Card className="p-4 border-border">
            <p className="text-sm text-muted-foreground mb-1">My Ranking</p>
            <p className="text-3xl font-bold">#247</p>
          </Card>
        </div>

        {/* Tournament List */}
        <div className="space-y-4">
          {POPULAR_TOURNAMENTS.map((tournament) => (
            <Card
              key={tournament.id}
              className="p-6 border-border hover:bg-secondary/30 transition-colors cursor-pointer"
              onClick={() => setSelectedTournament(tournament.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-6 h-6 text-accent" />
                    <div>
                      <h3 className="text-xl font-bold">{tournament.name}</h3>
                      <p className="text-sm text-muted-foreground">{tournament.game}</p>
                    </div>
                  </div>

                  {/* Tournament Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Format</p>
                      <p className="font-semibold text-sm">
                        {tournament.format
                          .split("-")
                          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                          .join(" ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Prize Pool</p>
                      <p className="font-semibold text-sm text-green-500">
                        ${(tournament.prizePool / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Players</p>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold text-sm">{tournament.players}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Starts</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-semibold text-sm">
                          {new Date(tournament.startDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className={`ml-4 gap-2 ${
                    registeredTournaments.includes(tournament.id)
                      ? "bg-secondary text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRegister(tournament.id)
                  }}
                >
                  <Zap className="w-4 h-4" />
                  {registeredTournaments.includes(tournament.id) ? "Registered" : "Register"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="p-6 border-border mt-12 bg-accent/5">
          <h2 className="text-xl font-bold mb-4">Tournament FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">How do tournaments work?</h3>
              <p className="text-sm text-muted-foreground">
                Choose a tournament format (single/double elimination, round-robin, or swiss). Compete in matches, climb
                the rankings, and compete for prize money.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What are the entry fees?</h3>
              <p className="text-sm text-muted-foreground">
                Entry fees vary by tournament tier. All fees contribute to the prize pool. Pro members get discounted
                entry fees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When do I get paid?</h3>
              <p className="text-sm text-muted-foreground">
                Winnings are automatically paid out within 24 hours of tournament completion, directly to your wallet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I create a tournament?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Pro and Elite members can create tournaments. Set the rules, game, prize pool, and invite players.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
