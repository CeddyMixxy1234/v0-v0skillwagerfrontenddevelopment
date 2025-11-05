"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface PlayerComparisonProps {
  player1: {
    name: string
    wins: number
    losses: number
    winRate: number
  }
  player2: {
    name: string
    wins: number
    losses: number
    winRate: number
  }
  onClose: () => void
}

export function PlayerComparison({ player1, player2, onClose }: PlayerComparisonProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold">Player Comparison</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="font-semibold text-center">Stat</div>
            <div className="font-semibold text-center text-primary">{player1.name}</div>
            <div className="font-semibold text-center text-accent">{player2.name}</div>

            <div className="text-muted-foreground text-center">Win Rate</div>
            <div className="font-bold text-center text-primary">{player1.winRate}%</div>
            <div className="font-bold text-center text-accent">{player2.winRate}%</div>

            <div className="text-muted-foreground text-center">Wins</div>
            <div className="font-bold text-center">{player1.wins}</div>
            <div className="font-bold text-center">{player2.wins}</div>

            <div className="text-muted-foreground text-center">Losses</div>
            <div className="font-bold text-center">{player1.losses}</div>
            <div className="font-bold text-center">{player2.losses}</div>

            <div className="text-muted-foreground text-center">Matches Played</div>
            <div className="font-bold text-center">{player1.wins + player1.losses}</div>
            <div className="font-bold text-center">{player2.wins + player2.losses}</div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground" onClick={onClose}>
              Accept Wager
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
