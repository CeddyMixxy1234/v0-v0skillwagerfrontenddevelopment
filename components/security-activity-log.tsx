"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Shield, Key, LogOut, Lock } from "lucide-react"

interface SecurityLog {
  type: "LOGIN" | "PASSWORD_CHANGED" | "DEVICE_ADDED" | "SESSION_ENDED" | "TWO_FACTOR_ENABLED"
  timestamp: string
  details: string
  ipAddress?: string
  device?: string
}

export function SecurityActivityLog() {
  const [logs, setLogs] = useState<SecurityLog[]>([])

  useEffect(() => {
    // Load security logs from localStorage
    const settings = JSON.parse(localStorage.getItem("securitySettings") || "{}")
    if (settings.securityLogs) {
      setLogs(settings.securityLogs)
    } else {
      // Initialize with default logs
      const defaultLogs: SecurityLog[] = [
        {
          type: "LOGIN",
          timestamp: new Date().toLocaleString(),
          details: "Successful login",
          device: "Chrome on Windows",
          ipAddress: "192.168.1.100",
        },
        {
          type: "DEVICE_ADDED",
          timestamp: new Date(Date.now() - 86400000).toLocaleString(),
          details: "New device linked to account",
          device: "Safari on MacOS",
        },
      ]
      setLogs(defaultLogs)
      settings.securityLogs = defaultLogs
      localStorage.setItem("securitySettings", JSON.stringify(settings))
    }
  }, [])

  const getIcon = (type: SecurityLog["type"]) => {
    switch (type) {
      case "LOGIN":
        return <Shield className="w-4 h-4 text-blue-500" />
      case "PASSWORD_CHANGED":
        return <Key className="w-4 h-4 text-green-500" />
      case "SESSION_ENDED":
        return <LogOut className="w-4 h-4 text-yellow-500" />
      case "TWO_FACTOR_ENABLED":
        return <Lock className="w-4 h-4 text-green-500" />
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <Card className="p-6 border-border">
      <h3 className="text-lg font-bold mb-4">Security Activity</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.length > 0 ? (
          logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg border border-border/50">
              <div className="mt-0.5">{getIcon(log.type)}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{log.details}</p>
                <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                {log.device && <p className="text-xs text-muted-foreground">{log.device}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">No security events yet</p>
        )}
      </div>
    </Card>
  )
}
