"use client"

import { Card } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Users } from "lucide-react"

interface WagerInsightsProps {
  userWinRate: number
  userTotalWagers: number
  recommendedWagerSize: number
}

export function WagerInsights({ userWinRate, userTotalWagers, recommendedWagerSize }: WagerInsightsProps) {
  const insights = []

  if (userWinRate > 70) {
    insights.push({
      icon: <TrendingUp className="w-4 h-4" />,
      text: "You're on a hot streak! Consider slightly higher wagers.",
    })
  } else if (userWinRate < 40) {
    insights.push({
      icon: <Lightbulb className="w-4 h-4" />,
      text: "Consider playing more cautiously to improve your win rate.",
    })
  }

  if (userTotalWagers < 5) {
    insights.push({
      icon: <Users className="w-4 h-4" />,
      text: "Build your experience - more wagers help establish your skill level.",
    })
  }

  insights.push({
    icon: <Lightbulb className="w-4 h-4" />,
    text: `Recommended wager size: $${recommendedWagerSize} based on your record.`,
  })

  return (
    <div className="space-y-2">
      {insights.map((insight, i) => (
        <Card key={i} className="p-3 border-border bg-secondary/30 flex items-start gap-2">
          <div className="text-muted-foreground mt-0.5 flex-shrink-0">{insight.icon}</div>
          <p className="text-sm text-muted-foreground">{insight.text}</p>
        </Card>
      ))}
    </div>
  )
}
