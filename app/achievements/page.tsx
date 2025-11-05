"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft } from "lucide-react"
import { ACHIEVEMENTS } from "@/lib/achievements"
import { useStorage } from "@/hooks/use-storage"
import { ROUTES } from "@/lib/routes"

export default function AchievementsPage() {
  const [user] = useStorage("user", null)
  const [userAchievements] = useStorage("userAchievements", { unlockedIds: [], totalPoints: 0 })
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["all", ...new Set(ACHIEVEMENTS.map((a) => a.category))]
  const filteredAchievements =
    selectedCategory && selectedCategory !== "all"
      ? ACHIEVEMENTS.filter((a) => a.category === selectedCategory)
      : ACHIEVEMENTS

  const isUnlocked = (id: string) => userAchievements.unlockedIds.includes(id)

  const getRarityColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: "border-gray-400 bg-gray-500/10",
      rare: "border-blue-400 bg-blue-500/10",
      epic: "border-purple-400 bg-purple-500/10",
      legendary: "border-amber-400 bg-amber-500/10",
    }
    return colors[rarity] || colors.common
  }

  const getRarityBgColor = (rarity: string) => {
    const colors: Record<string, string> = {
      common: "bg-gray-500/20",
      rare: "bg-blue-500/20",
      epic: "bg-purple-500/20",
      legendary: "bg-amber-500/20",
    }
    return colors[rarity] || colors.common
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Achievements</h1>
              <p className="text-lg text-muted-foreground">Collect badges and earn points by completing challenges</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{userAchievements.totalPoints}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center border-border">
              <p className="text-2xl font-bold text-primary">{userAchievements.unlockedIds.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Unlocked</p>
            </Card>
            <Card className="p-4 text-center border-border">
              <p className="text-2xl font-bold text-accent">
                {ACHIEVEMENTS.length - userAchievements.unlockedIds.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Locked</p>
            </Card>
            <Card className="p-4 text-center border-border">
              <p className="text-2xl font-bold text-amber-500">
                {ACHIEVEMENTS.filter((a) => a.rarity === "legendary").length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Legendary</p>
            </Card>
            <Card className="p-4 text-center border-border">
              <p className="text-2xl font-bold">
                {((userAchievements.unlockedIds.length / ACHIEVEMENTS.length) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Progress</p>
            </Card>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={
                  selectedCategory === cat || (selectedCategory === null && cat === "all") ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedCategory(cat === "all" ? null : cat)}
                className={
                  selectedCategory === cat || (selectedCategory === null && cat === "all")
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-6 border-2 transition-all ${
                isUnlocked(achievement.id)
                  ? `${getRarityColor(achievement.rarity)}`
                  : "border-border bg-secondary/30 opacity-50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-5xl ${getRarityBgColor(achievement.rarity)} p-4 rounded-lg`}>
                  {achievement.icon}
                </div>
                <span className="text-2xl font-bold text-primary">{achievement.points}</span>
              </div>

              <h3 className="font-bold text-lg mb-1">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

              <div className="flex items-center justify-between text-xs">
                <span className={`px-2 py-1 rounded ${getRarityBgColor(achievement.rarity)}`}>
                  {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                </span>
                {isUnlocked(achievement.id) && <span className="text-green-500 font-semibold">Unlocked</span>}
              </div>

              {!isUnlocked(achievement.id) && (
                <div className="mt-4 p-3 bg-muted/50 rounded">
                  <p className="text-xs text-muted-foreground">
                    {achievement.requirement.type === "wagers"
                      ? `Complete ${achievement.requirement.target} wagers`
                      : achievement.requirement.type === "wins"
                        ? `Win ${achievement.requirement.target} matches`
                        : achievement.requirement.type === "streak"
                          ? `Win ${achievement.requirement.target} in a row`
                          : achievement.requirement.type === "followers"
                            ? `Gain ${achievement.requirement.target} followers`
                            : "Keep playing to unlock"}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
