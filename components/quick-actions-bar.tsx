"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export function QuickActionsBar() {
  return (
    <Card className="p-4 border-border bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="flex flex-wrap gap-3">
        <Link href="/wager/create" className="flex-1 min-w-fit">
          <Button className="w-full gap-2 bg-primary text-primary-foreground">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create Wager</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </Link>

        <Link href="/wager/browse" className="flex-1 min-w-fit">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Browse Wagers</span>
            <span className="sm:hidden">Browse</span>
          </Button>
        </Link>

        <Link href="/leaderboard" className="flex-1 min-w-fit">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Leaderboard</span>
            <span className="sm:hidden">Leaders</span>
          </Button>
        </Link>

        <Link href="/dashboard" className="flex-1 min-w-fit">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">Stats</span>
          </Button>
        </Link>
      </div>
    </Card>
  )
}
