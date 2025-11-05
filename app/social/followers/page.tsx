"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, UserPlus } from "lucide-react"
import { ROUTES } from "@/lib/routes"
import { useStorage } from "@/hooks/use-storage"

export default function FollowersPage() {
  const [user] = useStorage("user", null)
  const [followers] = useStorage("followers", [])

  const mockFollowers = [
    {
      id: 1,
      username: "ProPlayer_123",
      level: 25,
      wins: 156,
      winRate: 72,
      badge: "Elite",
      isFollowing: false,
    },
    {
      id: 2,
      username: "GamingKing",
      level: 18,
      wins: 89,
      winRate: 65,
      badge: "Pro",
      isFollowing: true,
    },
    {
      id: 3,
      username: "SkillMaster",
      level: 22,
      wins: 134,
      winRate: 68,
      badge: "Pro",
      isFollowing: false,
    },
  ]

  const [followedUsers, setFollowedUsers] = useState(
    mockFollowers.reduce((acc, f) => ({ ...acc, [f.id]: f.isFollowing }), {}),
  )

  const handleFollowToggle = (userId: number) => {
    setFollowedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href={ROUTES.DASHBOARD} className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Your Followers</h1>
          <p className="text-lg text-muted-foreground">
            {followers.length || mockFollowers.length} players are following your progress
          </p>
        </div>

        {/* Followers List */}
        <div className="space-y-4">
          {mockFollowers.map((follower) => (
            <Card key={follower.id} className="p-6 border-border hover:bg-secondary/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {follower.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{follower.username}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                          Level {follower.level}
                        </span>
                        {follower.badge && (
                          <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded">{follower.badge}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Total Wins</p>
                      <p className="text-2xl font-bold text-primary">{follower.wins}</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                      <p className="text-2xl font-bold text-green-500">{follower.winRate}%</p>
                    </div>
                    <div className="p-3 bg-background rounded border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Followers</p>
                      <p className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 10}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-4 flex gap-2">
                  <Link href={ROUTES.PROFILE(follower.username)}>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className={
                      followedUsers[follower.id] ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground"
                    }
                    onClick={() => handleFollowToggle(follower.id)}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {followedUsers[follower.id] ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
