"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2, Zap, Shield, ArrowRight, Trophy, Users, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth-utils"

export default function LandingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true)
      router.push("/dashboard")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/10">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">SkillWager</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-primary text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-balance">Wager on Your Gaming Skills</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl">
            Connect your gaming accounts, challenge other players, and earn real money based on verified match results
          </p>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary text-primary-foreground gap-2">
              Start Playing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full">
          <div className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-colors">
            <Zap className="w-8 h-8 text-accent mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Instant Verification</h3>
            <p className="text-muted-foreground">Match results verified instantly from official game APIs</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-colors">
            <Shield className="w-8 h-8 text-accent mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Secure Escrow</h3>
            <p className="text-muted-foreground">Funds held safely until match results are verified</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-colors">
            <Gamepad2 className="w-8 h-8 text-accent mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Supported Games</h3>
            <p className="text-muted-foreground">PUBG, Fortnite, Valorant, League of Legends, Chess & more</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="w-full mt-20 pt-20 border-t border-border">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Link Account</h3>
              <p className="text-sm text-muted-foreground">Connect your game account for verification</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Create Wager</h3>
              <p className="text-sm text-muted-foreground">Set the amount and challenge another player</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Play Match</h3>
              <p className="text-sm text-muted-foreground">Play the game with your opponent</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Get Paid</h3>
              <p className="text-sm text-muted-foreground">Winner receives payout automatically</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full mt-20 py-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Wagering?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of gamers earning real money</p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary text-primary-foreground gap-2">
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Create Wager Section */}
        <div className="w-full mt-20 py-16 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl border border-accent/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Already Playing?</h2>
          <p className="text-muted-foreground mb-8">Start creating wagers and competing for real earnings</p>
          <Link href="/wager/create">
            <Button size="lg" className="bg-primary text-primary-foreground gap-2">
              Create Your First Wager
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 mt-20 py-8 w-full">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 SkillWager. All rights reserved.</p>
          </div>
        </footer>
      </section>
    </div>
  )
}
