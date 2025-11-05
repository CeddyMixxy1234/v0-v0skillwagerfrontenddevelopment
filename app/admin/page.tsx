"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Gamepad2, Users, DollarSign, AlertCircle, Settings, TrendingUp, Activity, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "disputes" | "users" | "games" | "settings">("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [disputeFilter, setDisputeFilter] = useState<"all" | "pending" | "reviewing" | "resolved">("all")

  const stats = {
    totalUsers: 2450,
    activeWagers: 156,
    totalVolume: 45230.5,
    disputes: 8,
    avgWagerAmount: 289.8,
    platformFee: 2261.5,
    userGrowth: 12,
    wagerGrowth: 8,
    volumeGrowth: 15,
  }

  const disputes = [
    {
      id: 1,
      wager: "PUBG - ProPlayer vs ChampKing",
      amount: 100,
      reason: "Result verification mismatch",
      status: "pending",
      createdAt: "2 hours ago",
      evidence: "Player claims API error",
    },
    {
      id: 2,
      wager: "Valorant - Player1 vs Player2",
      amount: 50,
      reason: "Player claims unfair match",
      status: "reviewing",
      createdAt: "5 hours ago",
      evidence: "Reported by opponent",
    },
    {
      id: 3,
      wager: "Chess.com - Master vs Pro",
      amount: 75,
      reason: "Disconnect during match",
      status: "resolved",
      createdAt: "1 day ago",
      resolution: "Refunded to both players",
    },
  ]

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch = d.wager.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = disputeFilter === "all" || d.status === disputeFilter
    return matchesSearch && matchesFilter
  })

  const supportedGames = [
    { id: 1, name: "PUBG", api: "PUBG Developer API", status: "active", users: 450, wagers: 32 },
    { id: 2, name: "Fortnite", api: "Epic Games API", status: "active", users: 380, wagers: 28 },
    { id: 3, name: "Valorant", api: "Riot Games API", status: "active", users: 520, wagers: 45 },
    { id: 4, name: "Chess.com", api: "Chess.com Public API", status: "active", users: 250, wagers: 18 },
  ]

  const recentUsers = [
    { id: 1, email: "user1@example.com", joinedAt: "2 hours ago", wagers: 5, status: "active" },
    { id: 2, email: "user2@example.com", joinedAt: "4 hours ago", wagers: 0, status: "active" },
    { id: 3, email: "user3@example.com", joinedAt: "1 day ago", wagers: 12, status: "active" },
    { id: 4, email: "user4@example.com", joinedAt: "2 days ago", wagers: 3, status: "suspended" },
  ]

  const handleResolveDispute = (disputeId: number) => {
    alert(`Dispute #${disputeId} has been resolved. Both parties will be notified.`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Nav */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Settings className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">Admin Panel</span>
          </Link>
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="bg-transparent">
            Back to App
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(["overview", "disputes", "users", "games", "settings"] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`gap-2 whitespace-nowrap ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
            >
              {tab === "overview" && <Activity className="w-4 h-4" />}
              {tab === "disputes" && <AlertCircle className="w-4 h-4" />}
              {tab === "users" && <Users className="w-4 h-4" />}
              {tab === "games" && <Gamepad2 className="w-4 h-4" />}
              {tab === "settings" && <Settings className="w-4 h-4" />}
              <span className="capitalize">{tab}</span>
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground font-semibold">Total Users</h3>
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stats.userGrowth}% from last week
                </p>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground font-semibold">Active Wagers</h3>
                  <Gamepad2 className="w-5 h-5 text-accent" />
                </div>
                <p className="text-3xl font-bold">{stats.activeWagers}</p>
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stats.wagerGrowth}% from yesterday
                </p>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground font-semibold">Total Volume</h3>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold">${stats.totalVolume.toFixed(2)}</p>
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {stats.volumeGrowth}% from last month
                </p>
              </Card>

              <Card className="p-6 border-border border-destructive/30 bg-destructive/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm text-muted-foreground font-semibold">Disputes</h3>
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-3xl font-bold text-destructive">{stats.disputes}</p>
                <p className="text-xs text-destructive/70 mt-2">Requires attention</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Disputes */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Recent Disputes
                    </h2>
                  </div>
                  <div className="divide-y divide-border">
                    {disputes.slice(0, 3).map((dispute) => (
                      <div key={dispute.id} className="p-6 hover:bg-secondary/30 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{dispute.wager}</p>
                            <p className="text-sm text-muted-foreground mt-1">{dispute.reason}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              dispute.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                : dispute.status === "reviewing"
                                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                  : "bg-green-500/20 text-green-700 dark:text-green-400"
                            }`}
                          >
                            {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div>
                            <p className="font-bold text-lg">${dispute.amount}</p>
                            <p className="text-xs text-muted-foreground">{dispute.createdAt}</p>
                          </div>
                          {dispute.status !== "resolved" && (
                            <Button size="sm" className="bg-primary text-primary-foreground">
                              Review
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card className="p-6 border-border">
                  <h3 className="font-bold mb-4">Key Metrics</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Wager</p>
                      <p className="text-2xl font-bold">${stats.avgWagerAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Platform Fee</p>
                      <p className="text-2xl font-bold text-green-500">${stats.platformFee.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border">
                  <h3 className="font-bold mb-4">Supported Games</h3>
                  <div className="space-y-2">
                    {supportedGames.map((game) => (
                      <div key={game.id} className="flex items-center justify-between text-sm">
                        <span>{game.name}</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-700 dark:text-green-400 rounded text-xs">
                          {game.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Disputes Tab */}
        {activeTab === "disputes" && (
          <Card className="border-border">
            <div className="p-6 border-b border-border space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Manage Disputes
              </h2>
              <div className="flex gap-4 flex-col sm:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search disputes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input border-border"
                  />
                </div>
                <select
                  value={disputeFilter}
                  onChange={(e) => setDisputeFilter(e.target.value as any)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="divide-y divide-border">
              {filteredDisputes.map((dispute) => (
                <div key={dispute.id} className="p-6 hover:bg-secondary/30 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                    <div className="md:col-span-2">
                      <p className="font-semibold">{dispute.wager}</p>
                      <p className="text-sm text-muted-foreground mt-1">{dispute.reason}</p>
                      <p className="text-xs text-muted-foreground mt-2">{dispute.evidence}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-bold text-lg">${dispute.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">{dispute.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          dispute.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                            : dispute.status === "reviewing"
                              ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                              : "bg-green-500/20 text-green-700 dark:text-green-400"
                        }`}
                      >
                        {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                      </span>
                      {dispute.status !== "resolved" && (
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                          onClick={() => {
                            alert(
                              `Dispute #${dispute.id} marked as reviewing. Please examine the evidence and make a resolution.`,
                            )
                            setActiveTab("disputes")
                          }}
                        >
                          Review
                        </Button>
                      )}
                      {dispute.status !== "resolved" && (
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground"
                          onClick={() => handleResolveDispute(dispute.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card className="border-border">
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <Users className="w-6 h-6" />
                User Management
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search users by email..." className="pl-10 bg-input border-border" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left text-sm font-semibold">Email</th>
                    <th className="p-4 text-left text-sm font-semibold">Joined</th>
                    <th className="p-4 text-left text-sm font-semibold">Wagers</th>
                    <th className="p-4 text-left text-sm font-semibold">Status</th>
                    <th className="p-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="p-4 text-sm font-medium">{user.email}</td>
                      <td className="p-4 text-sm text-muted-foreground">{user.joinedAt}</td>
                      <td className="p-4 text-sm font-semibold">{user.wagers}</td>
                      <td className="p-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-500/20 text-green-700 dark:text-green-400"
                              : "bg-red-500/20 text-red-700 dark:text-red-400"
                          }`}
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                          onClick={() =>
                            alert(`Viewing user profile: ${user.email}. Wagers: ${user.wagers}, Status: ${user.status}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Games Tab */}
        {activeTab === "games" && (
          <Card className="border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Gamepad2 className="w-6 h-6" />
                Supported Games
              </h2>
              <Button
                className="bg-primary text-primary-foreground"
                onClick={() =>
                  alert("Add Game modal: Select game, provide API key, and configure verification settings.")
                }
              >
                Add Game
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {supportedGames.map((game) => (
                <Card key={game.id} className="p-4 border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold">{game.name}</p>
                      <p className="text-xs text-muted-foreground">{game.api}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-700 dark:text-green-400 font-semibold">
                      {game.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Users</p>
                      <p className="font-semibold">{game.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Wagers</p>
                      <p className="font-semibold">{game.wagers}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Platform Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Platform Fee (%)</label>
                  <Input type="number" placeholder="5" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium">Min Wager Amount</label>
                  <Input type="number" placeholder="1" className="mt-2 bg-input border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Wager Amount</label>
                  <Input type="number" placeholder="1000" className="mt-2 bg-input border-border" />
                </div>
                <Button
                  className="bg-primary text-primary-foreground"
                  onClick={() => alert("Settings saved successfully! Platform fee and wager limits have been updated.")}
                >
                  Save Settings
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
