"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bell, X, CheckCircle, Trophy, MessageCircle, Clock } from "lucide-react"

const iconMap: Record<string, any> = {
  trophy: Trophy,
  message_circle: MessageCircle,
  clock: Clock,
  check_circle: CheckCircle,
}

export function NotificationsCenter() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotifications = () => {
      const cached = localStorage.getItem("notifications")
      if (cached) {
        setNotifications(JSON.parse(cached))
      } else {
        const defaultNotifications = [
          {
            id: 1,
            type: "match_result",
            title: "You won!",
            message: "You defeated ProPlayer_123 in Valorant. +$50 earned",
            iconName: "trophy",
            read: false,
            timestamp: "5 min ago",
            color: "text-green-500",
          },
          {
            id: 2,
            type: "challenge",
            title: "New Challenge",
            message: "SkillSeeker challenged you to a Chess match for $75",
            iconName: "message_circle",
            read: false,
            timestamp: "15 min ago",
            color: "text-accent",
          },
          {
            id: 3,
            type: "match_live",
            title: "Match Starting",
            message: "Your match against GamingKing starts in 2 minutes",
            iconName: "clock",
            read: true,
            timestamp: "1 hour ago",
            color: "text-yellow-500",
          },
          {
            id: 4,
            type: "verification",
            title: "Account Verified",
            message: "Your Valorant account has been verified",
            iconName: "check_circle",
            read: true,
            timestamp: "1 day ago",
            color: "text-green-500",
          },
        ]
        localStorage.setItem("notifications", JSON.stringify(defaultNotifications))
        setNotifications(defaultNotifications)
      }
      setLoading(false)
    }

    loadNotifications()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }))
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  const deleteNotification = (id: number) => {
    const updated = notifications.filter((n) => n.id !== id)
    setNotifications(updated)
    localStorage.setItem("notifications", JSON.stringify(updated))
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-secondary/50 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {open && (
        <Card className="absolute right-0 top-full mt-2 w-96 border-border shadow-lg z-50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold">Notifications</h3>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-secondary/50 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-border">
                {notifications.map((notif) => {
                  const Icon = iconMap[notif.iconName] || Bell
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-secondary/30 transition-colors cursor-pointer ${!notif.read ? "bg-primary/5" : ""}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 ${notif.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.timestamp}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notif.id)
                          }}
                          className="flex-shrink-0 p-1 hover:bg-destructive/10 rounded"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border bg-secondary/20 flex gap-2">
              <Button size="sm" variant="ghost" onClick={markAllAsRead} className="flex-1 text-xs">
                Mark all as read
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
