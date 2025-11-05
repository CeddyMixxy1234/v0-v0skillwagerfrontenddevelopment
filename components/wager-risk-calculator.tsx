"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { AlertCircle, TrendingUp, Shield } from "lucide-react"

type WagerRisk = {
  level: "low" | "medium" | "high" | "extreme"
  score: number // 0-100
  factors: string[]
}

interface WagerRiskProps {
  opponentWinRate: number
  opponentRecordWins: number
  opponentRecordLosses: number
  wagerAmount: number
  userWinRate: number
  userBalance: number
}

export function WagerRiskCalculator({
  opponentWinRate,
  opponentRecordWins,
  opponentRecordLosses,
  wagerAmount,
  userWinRate,
  userBalance,
}: WagerRiskProps) {
  const [risk, setRisk] = useState<WagerRisk>({
    level: "medium",
    score: 50,
    factors: [],
  })

  useEffect(() => {
    const factors: string[] = []
    let riskScore = 50

    // Check if opponent is significantly stronger
    const winRateDiff = opponentWinRate - userWinRate
    if (winRateDiff > 15) {
      riskScore += 20
      factors.push("Opponent significantly stronger")
    } else if (winRateDiff > 5) {
      riskScore += 10
      factors.push("Opponent has higher win rate")
    }

    // Check record consistency
    const opponentTotal = opponentRecordWins + opponentRecordLosses
    if (opponentTotal > 50 && opponentRecordWins > 30) {
      riskScore -= 5
      factors.push("Opponent has proven track record")
    }

    // Check wager amount relative to balance
    const wagerRatio = (wagerAmount / userBalance) * 100
    if (wagerRatio > 20) {
      riskScore += 15
      factors.push("Large wager relative to balance")
    }
    if (wagerRatio > 50) {
      riskScore += 15
      factors.push("Very high risk wager amount")
    }

    // Clamp score between 0-100
    riskScore = Math.max(0, Math.min(100, riskScore))

    let level: WagerRisk["level"] = "low"
    if (riskScore < 30) level = "low"
    else if (riskScore < 60) level = "medium"
    else if (riskScore < 80) level = "high"
    else level = "extreme"

    setRisk({
      level,
      score: riskScore,
      factors: factors.length > 0 ? factors : ["Well-matched wager"],
    })
  }, [opponentWinRate, userWinRate, wagerAmount, userBalance, opponentRecordWins, opponentRecordLosses])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400"
      case "medium":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-400"
      case "high":
        return "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400"
      case "extreme":
        return "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
      default:
        return "bg-gray-500/10 border-gray-500/30"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <Shield className="w-5 h-5" />
      case "medium":
        return <AlertCircle className="w-5 h-5" />
      case "high":
        return <TrendingUp className="w-5 h-5" />
      case "extreme":
        return <AlertCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <Card className={`p-4 border ${getRiskColor(risk.level)}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getRiskIcon(risk.level)}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold capitalize">Risk Level: {risk.level}</h3>
            <span className="text-sm font-bold">{risk.score}%</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2 mb-3">
            <div
              className={`h-2 rounded-full transition-all ${
                risk.level === "low"
                  ? "bg-green-500"
                  : risk.level === "medium"
                    ? "bg-yellow-500"
                    : risk.level === "high"
                      ? "bg-orange-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${risk.score}%` }}
            />
          </div>
          <ul className="space-y-1">
            {risk.factors.map((factor, i) => (
              <li key={i} className="text-sm">
                • {factor}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
