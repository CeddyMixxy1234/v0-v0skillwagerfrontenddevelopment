"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Trophy, Award, Gamepad2, TrendingUp, CheckCircle, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const username = decodeURIComponent(params.username)
  const router = useRouter()
  const [showChallenge, setShowChallenge] = useState(false)
  const [selectedGame, setSelectedGame] = useState("")
  const [wagerAmount, setWagerAmount] = useState("")
  const [playerData, setPlayerData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate dynamic player data based on username
    const generatePlayerData = (user: string) => {
      const games = ["Valorant", "League of Legends", "CS:GO", "Dota 2"]
      const ranks = ["Iron", "Gold", "Platinum", "Diamond", "Master", "Radiant", "Global Elite"]
      return {
        username: user,
        displayName: user.replace(/_/g, " "),
        badge: ["elite", "expert", "advanced", "legendary"][Math.floor(Math.random() * 4)],
        verified: Math.random() > 0.2,
        avatar: user.charAt(0).toUpperCase(),
        bio: "Competitive gamer | Streaming on Twitch | Always grinding",
        joinedDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        stats: {
          totalWagers: Math.floor(Math.random() * 200) + 50,
          wins: Math.floor(Math.random() * 150) + 50,
          losses: Math.floor(Math.random() * 50) + 10,
          winRate: (Math.random() * 30 + 50).toFixed(1),
          totalEarnings: (Math.random() * 15000 + 1000).toFixed(2),
          totalWagered: (Math.random() * 25000 + 5000).toFixed(2),
        },
        games: games.map((game) => ({
          name: game,
          rank: ranks[Math.floor(Math.random() * ranks.length)],
          wins: Math.floor(Math.random() * 100) + 20,
          mainGame: Math.random() > 0.5,
        })),
        achievements: [
          { id: 1, name: "Winning Streak", desc: "10 consecutive wins", icon: "🔥" },
          { id: 2, name: "Legendary Earner", desc: "$10k+ in earnings", icon: "💰" },
          { id: 3, name: "Verified Player", desc: "All accounts verified", icon: "✓" },
          { id: 4, name: "Elite Competitor", desc: "1000+ matches completed", icon: "⭐" },
        ],
        recentMatches: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          game: games[Math.floor(Math.random() * games.length)],
          opponent: `Player${Math.floor(Math.random() * 1000)}`,
          result: Math.random() > 0.3 ? "won" : "lost",
          amount: Math.floor(Math.random() * 100) + 25,
          date: `${i + 1} ${i === 0 ? "hour" : "day"}${i > 1 ? "s" : ""} ago`,
        })),
      }
    }

    const data = generatePlayerData(username)
    setPlayerData(data)
    setSelectedGame(data.games[0]?.name || "")
    setLoading(false)
  }, [username])

  const handleChallengeSubmit = () => {
    if (selectedGame && wagerAmount) {
      const currentUser = localStorage.getItem("user")
      if (currentUser) {
        alert(`Challenge sent to ${username} for $${wagerAmount} on ${selectedGame}!`)
        setShowChallenge(false)
        setWagerAmount("")
      } else {
        router.push("/auth/login")
      }
    }
  }

  const handleMessagePlayer = () => {
    const message = `Want to message ${playerData.displayName}? Send a challenge or add them to your friends list in-game!`
    alert(message)
  }

  if (loading || !playerData) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Loading profile...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/leaderboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Leaderboard
        </Link>

        {/* Profile Header */}
        <Card className="p-8 border-border bg-gradient-to-r from-primary/5 to-accent/5 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold text-primary-foreground">
              {playerData.avatar}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{playerData.displayName}</h1>
                {playerData.verified && <CheckCircle className="w-6 h-6 text-green-500" />}
              </div>
              <p className="text-muted-foreground mb-2">@{playerData.username}</p>
              <p className="text-sm mb-3">{playerData.bio}</p>
              <p className="text-xs text-muted-foreground">Member since {playerData.joinedDate}</p>
            </div>

            <div className="flex gap-2 w-full md:w-auto flex-col md:flex-row">
              <Button
                className="bg-primary text-primary-foreground gap-2"
                onClick={() => setShowChallenge(!showChallenge)}
              >
                <Gamepad2 className="w-4 h-4" />
                Challenge Player
              </Button>
              <Button variant="outline" className="bg-transparent gap-2" onClick={handleMessagePlayer}>
                <MessageSquare className="w-4 h-4" />
                Message
              </Button>
            </div>
          </div>
        </Card>

        {/* Challenge Form */}
        {showChallenge && (
          <Card className="p-6 border-border bg-secondary/20 mb-8">
            <h3 className="font-semibold mb-4">Challenge {playerData.displayName}</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Game</label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full mt-2 p-2 rounded-lg border border-border bg-background text-foreground"
                >
                  {playerData.games.map((game: any) => (
                    <option key={game.name} value={game.name}>
                      {game.name} ({game.rank})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Wager Amount ($)</label>
                <input
                  type="number"
                  value={wagerAmount}
                  onChange={(e) => setWagerAmount(e.target.value)}
                  placeholder="100"
                  min="10"
                  className="w-full mt-2 p-2 rounded-lg border border-border bg-background text-foreground"
                />
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <Button className="bg-primary text-primary-foreground" onClick={handleChallengeSubmit}>
                  Send Challenge
                </Button>
                <Button variant="outline" className="bg-transparent" onClick={() => setShowChallenge(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border text-center">
            <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{playerData.stats.wins}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Wins</p>
          </Card>
          <Card className="p-4 border-border text-center">
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{playerData.stats.winRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Win Rate</p>
          </Card>
          <Card className="p-4 border-border text-center">
            <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-500">
              ${Number.parseFloat(playerData.stats.totalEarnings).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total Earnings</p>
          </Card>
          <Card className="p-4 border-border text-center">
            <Gamepad2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-primary">{playerData.stats.totalWagers}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Matches</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Games */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5" />
                  Main Games
                </h2>
              </div>
              <div className="divide-y divide-border">
                {playerData.games.map((game: any) => (
                  <div
                    key={game.name}
                    className="p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold">{game.name}</h3>
                      <p className="text-sm text-muted-foreground">Rank: {game.rank}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{game.wins}</p>
                      <p className="text-xs text-muted-foreground">wins</p>
                      {game.mainGame && <span className="text-xs text-primary font-semibold">Main</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Matches */}
            <Card className="border-border mt-8">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold">Recent Matches</h2>
              </div>
              <div className="divide-y divide-border">
                {playerData.recentMatches.map((match: any) => (
                  <div
                    key={match.id}
                    className="p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{match.game}</p>
                      <p className="text-sm text-muted-foreground">vs {match.opponent}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-semibold mb-1 ${match.result === "won" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}`}
                      >
                        {match.result === "won" ? "Won" : "Lost"}
                      </span>
                      <p className="text-sm font-semibold">${match.amount}</p>
                      <p className="text-xs text-muted-foreground">{match.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div>
            <Card className="border-border p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Award className="w-5 h-5" />
                Achievements
              </h2>
              <div className="space-y-3">
                {playerData.achievements.map((achievement: any) => (
                  <div key={achievement.id} className="p-3 bg-secondary/20 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{achievement.icon}</span>
                      <p className="font-semibold text-sm">{achievement.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
