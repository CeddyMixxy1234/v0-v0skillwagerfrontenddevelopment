"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Award, Flame, Zap, Crown, Target, TrendingUp } from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  iconName: string
  color: string
  unlocked: boolean
  progress?: number
}

interface AchievementBadgesProps {
  achievements?: Achievement[]
  compact?: boolean
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  zap: Zap,
  crown: Crown,
  trending_up: TrendingUp,
  target: Target,
  award: Award,
}

export function AchievementBadges({ compact = false, achievements }: AchievementBadgesProps) {
  const [displayAchievements, setDisplayAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const defaultAchievements: Achievement[] = [
      {
        id: "first_win",
        name: "First Victory",
        description: "Win your first wager",
        iconName: "flame",
        color: "from-orange-500 to-red-500",
        unlocked: true,
      },
      {
        id: "streak_10",
        name: "On Fire",
        description: "10 consecutive wins",
        iconName: "zap",
        color: "from-yellow-400 to-orange-500",
        unlocked: true,
      },
      {
        id: "master",
        name: "Master Player",
        description: "Reach 80% win rate",
        iconName: "crown",
        color: "from-purple-500 to-pink-500",
        unlocked: true,
      },
      {
        id: "earned_1k",
        name: "Thousand Dollar Earner",
        description: "Earn $1,000",
        iconName: "trending_up",
        color: "from-green-500 to-emerald-500",
        unlocked: true,
      },
      {
        id: "verified_all",
        name: "Multi-Game Master",
        description: "Get verified in 5+ games",
        iconName: "target",
        color: "from-blue-500 to-cyan-500",
        unlocked: false,
        progress: 3,
      },
      {
        id: "social_butterfly",
        name: "Social Butterfly",
        description: "Challenge 10 different players",
        iconName: "award",
        color: "from-pink-500 to-rose-500",
        unlocked: false,
        progress: 6,
      },
    ]

    const cached = localStorage.getItem("user_achievements")
    if (cached) {
      setDisplayAchievements(JSON.parse(cached))
    } else {
      localStorage.setItem("user_achievements", JSON.stringify(defaultAchievements))
      setDisplayAchievements(defaultAchievements)
    }
    setLoading(false)
  }, [])

  const finalAchievements = achievements || displayAchievements

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading achievements...</div>
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Award className="w-4 h-4" />
          Achievements
        </h3>
        <div className="flex flex-wrap gap-2">
          {finalAchievements.map((achievement) => {
            const Icon = iconMap[achievement.iconName] || Award
            return (
              <div
                key={achievement.id}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer hover:scale-110 ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg`
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 opacity-50"
                }`}
                title={achievement.name}
              >
                <Icon className="w-5 h-5" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Card className="border-border p-6">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
        <Award className="w-5 h-5" />
        Achievements
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {finalAchievements.map((achievement) => {
          const Icon = iconMap[achievement.iconName] || Award
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${achievement.color} text-white border-transparent shadow-md hover:shadow-lg`
                  : "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-5 h-5" />
                <p className="font-semibold text-sm">{achievement.name}</p>
              </div>
              <p className="text-xs opacity-90">{achievement.description}</p>
              {achievement.progress && !achievement.unlocked && (
                <div className="mt-2 bg-black/20 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-white/50 h-full transition-all"
                    style={{ width: `${(achievement.progress / 10) * 100}%` }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
