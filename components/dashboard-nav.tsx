"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gamepad2, Home, Zap, Wallet, Trophy, Settings, LogOut, Menu, X, Award, BarChart3 } from "lucide-react"
import { useState } from "react"
import { NotificationsCenter } from "./notifications-center"

export function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Wagers", href: "/wagers", icon: Zap },
    { label: "Browse", href: "/wager/browse", icon: Trophy },
    { label: "Matches", href: "/matches", icon: Gamepad2 },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Achievements", href: "/achievements", icon: Award },
    { label: "Wallet", href: "/wallet", icon: Wallet },
    { label: "Settings", href: "/settings", icon: Settings },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("linkedAccounts")
    router.push("/")
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-base flex-shrink-0">
          <Gamepad2 className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">SkillWager</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 text-sm whitespace-nowrap ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <NotificationsCenter />
          <Link href="/subscription">
            <Button variant="ghost" size="sm" className="gap-2 text-sm text-accent hover:text-accent">
              <Zap className="w-4 h-4" />
              <span className="hidden lg:inline">Premium</span>
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="gap-2 text-sm">
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">Admin</span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2 text-sm text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={`w-full justify-start gap-2 text-sm ${isActive(item.href) ? "bg-primary text-primary-foreground" : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
            <div className="pt-2 border-t border-border space-y-1">
              <Link href="/subscription" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-sm text-accent hover:text-accent"
                >
                  <Zap className="w-4 h-4" />
                  Premium Plans
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-sm">
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-sm text-destructive hover:text-destructive"
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleLogout()
                }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
