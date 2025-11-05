"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { ArrowLeft, Plus, Trash2, Check, AlertCircle, Gamepad2, Shield, Key } from "lucide-react"
import { TwoFactorSetup } from "@/components/two-factor-setup"
import { ChangePasswordModal } from "@/components/change-password-modal"
import { SecurityActivityLog } from "@/components/security-activity-log"
import { useStorage } from "@/hooks/use-storage"
import { validators } from "@/lib/validators"

export default function SettingsPage() {
  const [user] = useStorage("user", null)
  const [linkedAccounts, setLinkedAccounts] = useStorage("linkedAccounts", [])
  const [securitySettings, setSecuritySettings] = useStorage("securitySettings", {})

  const [showLinkForm, setShowLinkForm] = useState(false)
  const [selectedGame, setSelectedGame] = useState("")
  const [gameUsername, setGameUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState<string | null>(null)
  const [show2FASetup, setShow2FASetup] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  const games = [
    { id: "pubg", name: "PUBG", apiSupport: true, verificationMethod: "API" },
    { id: "valorant", name: "Valorant", apiSupport: true, verificationMethod: "API" },
    { id: "chess", name: "Chess.com", apiSupport: true, verificationMethod: "API" },
    { id: "fortnite", name: "Fortnite", apiSupport: true, verificationMethod: "API" },
    { id: "lol", name: "League of Legends", apiSupport: true, verificationMethod: "API" },
    { id: "dota2", name: "Dota 2", apiSupport: true, verificationMethod: "API" },
    { id: "csgo", name: "CS:GO", apiSupport: true, verificationMethod: "API" },
    { id: "ow2", name: "Overwatch 2", apiSupport: true, verificationMethod: "API" },
  ]

  const handleLinkAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGame || !gameUsername) return

    const usernameValidation = validators.validateUsername(gameUsername)
    if (!usernameValidation.valid) {
      alert(usernameValidation.error)
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const gameName = games.find((g) => g.id === selectedGame)?.name || selectedGame

    const newAccount = {
      id: Date.now(),
      gameId: selectedGame,
      gameName,
      username: validators.sanitizeInput(gameUsername),
      verified: true,
      linkedAt: new Date().toLocaleDateString(),
      stats: {
        rank: "Gold II",
        level: 45,
        wins: 120,
      },
    }

    setLinkedAccounts([...linkedAccounts, newAccount])
    setSelectedGame("")
    setGameUsername("")
    setShowLinkForm(false)
    setLoading(false)
  }

  const handleUnlinkAccount = (accountId: number) => {
    setLinkedAccounts(linkedAccounts.filter((acc) => acc.id !== accountId))
  }

  const handleVerifyAccount = async (accountId: number) => {
    setVerifying(accountId.toString())
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setVerifying(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Account Info */}
        <Card className="p-6 border-border mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-semibold">{user?.email || "Loading..."}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Account Created</p>
              <p className="font-semibold">November 2024</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verification Status</p>
              <div className="flex items-center gap-2 text-green-500">
                <Check className="w-4 h-4" />
                <span className="font-semibold">Email Verified</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Linked Game Accounts */}
        <Card className="p-6 border-border mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Linked Game Accounts
            </h2>
            {!showLinkForm && (
              <Button className="bg-primary text-primary-foreground gap-2" onClick={() => setShowLinkForm(true)}>
                <Plus className="w-4 h-4" />
                Link Account
              </Button>
            )}
          </div>

          {/* Link Form */}
          {showLinkForm && (
            <div className="mb-8 p-6 bg-secondary/30 rounded-lg border border-border">
              <h3 className="font-semibold mb-4">Link a Game Account</h3>
              <form onSubmit={handleLinkAccount} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Game</label>
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full mt-2 p-2 rounded-lg border border-border bg-background text-foreground"
                    required
                  >
                    <option value="">Choose a game...</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Game Username / ID</label>
                  <Input
                    type="text"
                    placeholder="Your in-game username"
                    value={gameUsername}
                    onChange={(e) => setGameUsername(e.target.value)}
                    className="mt-2 bg-input border-border"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter your exact in-game username for verification
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground"
                    disabled={loading || !selectedGame || !gameUsername}
                  >
                    {loading ? "Verifying..." : "Link & Verify"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setShowLinkForm(false)
                      setSelectedGame("")
                      setGameUsername("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Linked Accounts List */}
          {linkedAccounts.length > 0 ? (
            <div className="space-y-4">
              {linkedAccounts.map((account) => (
                <div key={account.id} className="p-4 bg-secondary/20 rounded-lg border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{account.gameName}</h4>
                        {account.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-500 font-semibold">
                            <Check className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-500 font-semibold">
                            <AlertCircle className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">Username: {account.username}</p>

                      {/* Account Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="p-2 bg-primary/10 rounded text-center">
                          <p className="text-xs text-muted-foreground">Rank</p>
                          <p className="text-sm font-semibold">{account.stats.rank}</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded text-center">
                          <p className="text-xs text-muted-foreground">Level</p>
                          <p className="text-sm font-semibold">{account.stats.level}</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded text-center">
                          <p className="text-xs text-muted-foreground">Wins</p>
                          <p className="text-sm font-semibold">{account.stats.wins}</p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground">Linked on {account.linkedAt}</p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => handleVerifyAccount(account.id)}
                        disabled={verifying === account.id.toString()}
                      >
                        <Key className="w-4 h-4" />
                        {verifying === account.id.toString() ? "Verifying..." : "Verify"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-destructive hover:text-destructive"
                        onClick={() => handleUnlinkAccount(account.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Gamepad2 className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground mb-4">No linked game accounts yet</p>
              <p className="text-sm text-muted-foreground">
                Link your game accounts to verify your identity and join wagers
              </p>
            </div>
          )}
        </Card>

        <Card className="p-6 border-border mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border">
              <div>
                <p className="font-semibold">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">
                  {securitySettings.twoFactorEnabled ? "Enabled" : "Add extra security to your account"}
                </p>
              </div>
              <Button variant="outline" className="bg-transparent" onClick={() => setShow2FASetup(true)}>
                {securitySettings.twoFactorEnabled ? "Manage" : "Enable"}
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border">
              <div>
                <p className="font-semibold">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" className="bg-transparent" onClick={() => setShowChangePassword(true)}>
                Change
              </Button>
            </div>
          </div>
        </Card>

        <SecurityActivityLog />
      </main>

      {show2FASetup && (
        <TwoFactorSetup
          onClose={() => setShow2FASetup(false)}
          onEnable={() => setSecuritySettings({ ...securitySettings, twoFactorEnabled: true })}
        />
      )}
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
    </div>
  )
}
