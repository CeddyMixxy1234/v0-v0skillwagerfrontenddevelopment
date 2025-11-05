"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Gamepad2, Users, Filter, TrendingUp, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { PlayerComparison } from "@/components/player-comparison"

export default function BrowseWagersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("newest")
  const [showComparison, setShowComparison] = useState(false)
  const [selectedWager, setSelectedWager] = useState<any>(null)

  const allWagers = [
    {
      id: 1,
      game: "PUBG",
      creator: "ProPlayer_123",
      amount: 50,
      players: 1,
      creatorStats: { wins: 15, losses: 3 },
      status: "open",
      createdAt: "30 min ago",
      gameMode: "1v1",
    },
    {
      id: 2,
      game: "Valorant",
      creator: "GamingKing",
      amount: 25,
      players: 1,
      creatorStats: { wins: 22, losses: 5 },
      status: "open",
      createdAt: "1 hour ago",
      gameMode: "1v1",
    },
    {
      id: 3,
      game: "Chess.com",
      creator: "ChessMaster",
      amount: 100,
      players: 1,
      creatorStats: { wins: 45, losses: 8 },
      status: "open",
      createdAt: "2 hours ago",
      gameMode: "1v1",
    },
    {
      id: 4,
      game: "Fortnite",
      creator: "FortKing",
      amount: 75,
      players: 1,
      creatorStats: { wins: 18, losses: 4 },
      status: "open",
      createdAt: "45 min ago",
      gameMode: "1v1",
    },
    {
      id: 5,
      game: "League of Legends",
      creator: "MidLaneGod",
      amount: 50,
      players: 1,
      creatorStats: { wins: 28, losses: 7 },
      status: "open",
      createdAt: "20 min ago",
      gameMode: "1v1",
    },
  ]

  const games = Array.from(new Set(allWagers.map((w) => w.game)))

  const filteredWagers = allWagers
    .filter((wager) => {
      const matchesSearch =
        wager.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wager.game.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGame = !selectedGame || wager.game === selectedGame
      return matchesSearch && matchesGame
    })
    .sort((a, b) => {
      if (sortBy === "newest") return 0
      if (sortBy === "highest") return b.amount - a.amount
      if (sortBy === "lowest") return a.amount - b.amount
      if (sortBy === "topRated")
        return (
          b.creatorStats.wins / (b.creatorStats.wins + b.creatorStats.losses) -
          a.creatorStats.wins / (a.creatorStats.wins + a.creatorStats.losses)
        )
      return 0
    })

  const handleJoinWager = (wager: any) => {
    setSelectedWager(wager)
    setShowComparison(true)
  }

  const handleAcceptWager = () => {
    if (selectedWager) {
      router.push(`/wager/${selectedWager.id}`)
      setShowComparison(false)
    }
  }

  const getWinRate = (stats: any) => {
    const total = stats.wins + stats.losses
    return ((stats.wins / total) * 100).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Browse Wagers</h1>
            <p className="text-muted-foreground mt-1">{filteredWagers.length} wagers available</p>
          </div>
          <Link href="/wager/create">
            <Button className="bg-primary text-primary-foreground">Create Wager</Button>
          </Link>
        </div>

        <Card className="p-4 mb-8 border-border">
          <div className="space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                  placeholder="Search by game or player name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
                <option value="topRated">Top Rated Players</option>
              </select>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedGame === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGame(null)}
                className={selectedGame === null ? "bg-primary" : "bg-transparent"}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Games
              </Button>
              {games.map((game) => (
                <Button
                  key={game}
                  variant={selectedGame === game ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGame(game)}
                  className={selectedGame === game ? "bg-primary" : "bg-transparent"}
                >
                  {game}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {filteredWagers.length > 0 ? (
          <div className="space-y-4">
            {filteredWagers.map((wager) => (
              <Card key={wager.id} className="p-6 border-border hover:border-primary/30 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                  {/* Game & Creator */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Gamepad2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-lg">{wager.game}</p>
                      <p className="text-sm text-muted-foreground truncate">by {wager.creator}</p>
                      <p className="text-xs text-muted-foreground mt-1">{wager.gameMode}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 md:gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="font-bold text-green-500 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {getWinRate(wager.creatorStats)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Record</p>
                      <p className="font-bold">
                        {wager.creatorStats.wins}W-{wager.creatorStats.losses}L
                      </p>
                    </div>
                  </div>

                  {/* Amount & Players */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Wager</p>
                      <p className="text-2xl font-bold text-accent">${wager.amount}</p>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{wager.players}</span>
                    </div>
                  </div>

                  {/* Time & Action */}
                  <div className="text-right md:text-left">
                    <p className="text-xs text-muted-foreground mb-2">{wager.createdAt}</p>
                    <Button
                      className="w-full md:w-auto bg-primary text-primary-foreground gap-2"
                      onClick={() => handleJoinWager(wager)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Compare & Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border">
            <Gamepad2 className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">No wagers match your search</p>
          </Card>
        )}

        {showComparison && selectedWager && (
          <PlayerComparison
            player1={{
              name: selectedWager.creator,
              wins: selectedWager.creatorStats.wins,
              losses: selectedWager.creatorStats.losses,
              winRate: Number.parseFloat(getWinRate(selectedWager.creatorStats)),
            }}
            player2={{
              name: "You",
              wins: 8,
              losses: 4,
              winRate: 66.7,
            }}
            onClose={() => {
              setShowComparison(false)
              handleAcceptWager()
            }}
          />
        )}
      </main>
    </div>
  )
}
