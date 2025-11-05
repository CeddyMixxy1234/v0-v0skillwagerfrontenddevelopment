"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFormValidation } from "@/components/form-validation-helper"
import { useToast } from "@/components/toast-provider"
import { validators } from "@/lib/validators"
import { storage } from "@/lib/storage"

export default function CreateWagerPage() {
  const router = useRouter()
  const { validateWagerAmount, validateRequired } = useFormValidation()
  const { addToast } = useToast()
  const [step, setStep] = useState(1)
  const [selectedGame, setSelectedGame] = useState("")
  const [wagerAmount, setWagerAmount] = useState("")
  const [gameMode, setGameMode] = useState("1v1")
  const [description, setDescription] = useState("")
  const [opponentName, setOpponentName] = useState("")
  const [gamePlatform, setGamePlatform] = useState("pc")
  const [deadline, setDeadline] = useState("7")
  const [mapSelection, setMapSelection] = useState("")

  const games = [
    { id: "pubg", name: "PUBG", icon: "🎮", category: "BR" },
    { id: "fortnite", name: "Fortnite", icon: "🎮", category: "BR" },
    { id: "valorant", name: "Valorant", icon: "🔫", category: "Tactical" },
    { id: "lol", name: "League of Legends", icon: "⚔️", category: "MOBA" },
    { id: "chess", name: "Chess.com", icon: "♟️", category: "Strategy" },
    { id: "dota2", name: "Dota 2", icon: "⚔️", category: "MOBA" },
  ]

  const gameModes = ["1v1", "2v2", "3v3", "5v5"]
  const gameMapsByGame: Record<string, string[]> = {
    pubg: ["Erangel", "Miramar", "Taego", "Deston", "Random"],
    fortnite: ["Battle Royale", "Zero Build", "Creative"],
    valorant: ["Split", "Bind", "Haven", "Icebox", "Sunset", "Random"],
    lol: ["Summoner's Rift", "ARAM", "Random"],
    chess: ["Rapid", "Blitz", "Classic"],
    dota2: ["Captain's Mode", "All Pick", "Random Draft"],
  }

  const platforms = ["PC", "Consoles", "Mobile", "Cross-Platform"]

  const handleCreateWager = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validators.validateRequired(selectedGame, "Game").valid) return
    if (!validators.validateRequired(gameMode, "Game Mode").valid) return

    const amountValidation = validators.validateAmount(wagerAmount, 1, 250)
    if (!amountValidation.valid) {
      addToast(amountValidation.error || "Invalid amount", "error")
      return
    }

    if (!validators.validateRequired(gamePlatform, "Platform").valid) return

    addToast("Wager created successfully!", "success")

    storage.set("pendingWager", {
      game: selectedGame,
      amount: wagerAmount,
      gameMode,
      description: validators.sanitizeInput(description),
      opponentName: validators.sanitizeInput(opponentName),
      gamePlatform,
      deadline: `${deadline} days`,
      mapSelection,
    })

    router.push("/wager/browse")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a Wager</h1>
          <p className="text-muted-foreground">Step {step} of 5</p>
          <div className="mt-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded ${s <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card className="p-8 border-border">
            <h2 className="text-xl font-semibold mb-6">Select a Game</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedGame === game.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="text-2xl mb-2">{game.icon}</p>
                  <p className="font-semibold text-sm">{game.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{game.category}</p>
                </button>
              ))}
            </div>
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => setStep(2)}
              disabled={!selectedGame}
            >
              Continue
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 border-border">
            <h2 className="text-xl font-semibold mb-6">Select Game Mode</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {gameModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    gameMode === mode ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold">{mode}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" className="flex-1 bg-primary text-primary-foreground" onClick={() => setStep(3)}>
                Continue
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 border-border">
            <h2 className="text-xl font-semibold mb-6">Set Wager Amount</h2>
            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="text-sm font-medium">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold">$</span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    value={wagerAmount}
                    onChange={(e) => setWagerAmount(e.target.value)}
                    className="pl-8 bg-input border-border text-lg"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Available balance: $250.50 • Minimum: $1 • Maximum: $250
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Quick Select</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setWagerAmount(amount.toString())
                        addToast(`Selected $${amount}`, "info")
                      }}
                      className="p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors font-medium"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary text-primary-foreground"
                onClick={() => setStep(4)}
                disabled={!wagerAmount || Number.parseFloat(wagerAmount) < 1 || Number.parseFloat(wagerAmount) > 250}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 border-border">
            <h2 className="text-xl font-semibold mb-6">Opponent & Game Details</h2>
            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="text-sm font-medium">Opponent Name/Username (Optional)</label>
                <Input
                  type="text"
                  placeholder="Enter opponent's username... (optional)"
                  value={opponentName}
                  onChange={(e) => setOpponentName(e.target.value)}
                  className="bg-input border-border"
                />
                <p className="text-xs text-muted-foreground">
                  The player you want to challenge (you can leave blank to accept any challenger)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Gaming Platform</label>
                  <select
                    value={gamePlatform}
                    onChange={(e) => setGamePlatform(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-input text-sm"
                  >
                    {platforms.map((platform) => (
                      <option key={platform} value={platform.toLowerCase()}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Completion Deadline</label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-input text-sm"
                  >
                    <option value="1">1 Day</option>
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>

              {mapSelection !== "" && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Map/Mode Selection</label>
                  <select
                    value={mapSelection}
                    onChange={(e) => setMapSelection(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-input text-sm"
                  >
                    <option value="">Auto/Any Map</option>
                    {gameMapsByGame[selectedGame]?.map((map) => (
                      <option key={map} value={map}>
                        {map}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary text-primary-foreground"
                onClick={() => setStep(5)}
                disabled={!gamePlatform}
              >
                Continue
              </Button>
            </div>
          </Card>
        )}

        {step === 5 && (
          <Card className="p-8 border-border">
            <h2 className="text-xl font-semibold mb-6">Add Description (Optional)</h2>
            <form onSubmit={handleCreateWager} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Wager Description</label>
                <textarea
                  placeholder="Add any special rules or details about your wager..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-sm">Wager Summary</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Game:</span>{" "}
                    <span className="font-semibold">{games.find((g) => g.id === selectedGame)?.name}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Mode:</span>{" "}
                    <span className="font-semibold">{gameMode}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Amount:</span>{" "}
                    <span className="font-semibold text-accent">${Number.parseFloat(wagerAmount).toFixed(2)}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Potential Payout:</span>{" "}
                    <span className="font-semibold text-green-500">
                      ${(Number.parseFloat(wagerAmount) * 2).toFixed(2)}
                    </span>
                  </p>
                  {opponentName && (
                    <p>
                      <span className="text-muted-foreground">Opponent Name:</span>{" "}
                      <span className="font-semibold">{opponentName}</span>
                    </p>
                  )}
                  <p>
                    <span className="text-muted-foreground">Platform:</span>{" "}
                    <span className="font-semibold">{gamePlatform}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Deadline:</span>{" "}
                    <span className="font-semibold">{`${deadline} days`}</span>
                  </p>
                  {mapSelection && (
                    <p>
                      <span className="text-muted-foreground">Map Selection:</span>{" "}
                      <span className="font-semibold">{mapSelection}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(4)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground gap-2">
                  <Check className="w-4 h-4" />
                  Create Wager
                </Button>
              </div>
            </form>
          </Card>
        )}
      </main>
    </div>
  )
}
