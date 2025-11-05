"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

interface AccountLinkingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (accountData: any) => void
}

export function AccountLinkingModal({ isOpen, onClose, onSuccess }: AccountLinkingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedGame, setSelectedGame] = useState("")
  const [username, setUsername] = useState("")
  const [verifying, setVerifying] = useState(false)

  const games = [
    { id: "pubg", name: "PUBG" },
    { id: "valorant", name: "Valorant" },
    { id: "chess", name: "Chess.com" },
    { id: "fortnite", name: "Fortnite" },
    { id: "lol", name: "League of Legends" },
  ]

  const handleVerify = async () => {
    setVerifying(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onSuccess({ game: selectedGame, username })
    setVerifying(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-4 border-border">
        <h2 className="text-lg font-bold mb-3">Link Game Account</h2>

        {step === 1 && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Select a Game</label>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg border border-border bg-background"
              >
                <option value="">Choose game...</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => setStep(2)}
              disabled={!selectedGame}
            >
              Continue
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <Input
              placeholder="Enter your game username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-input border-border"
            />
            <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg flex gap-2 text-xs text-blue-700 dark:text-blue-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>We'll verify your account through the official game API</p>
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={handleVerify}
              disabled={!username || verifying}
            >
              {verifying ? "Verifying..." : "Verify Account"}
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
