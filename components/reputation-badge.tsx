"use client"

import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { type ReputationLevel, getReputationColor } from "@/lib/reputation"

interface ReputationBadgeProps {
  level: ReputationLevel
  score: number
  compact?: boolean
}

export function ReputationBadge({ level, score, compact = false }: ReputationBadgeProps) {
  const getIcon = () => {
    switch (level) {
      case "trusted":
        return <CheckCircle className="w-4 h-4" />
      case "verified":
        return <Shield className="w-4 h-4" />
      case "flagged":
        return <AlertTriangle className="w-4 h-4" />
      case "banned":
        return <XCircle className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const getLabel = () => {
    const labels: Record<ReputationLevel, string> = {
      trusted: "Trusted Player",
      verified: "Verified Account",
      standard: "Standard Account",
      flagged: "Under Review",
      banned: "Banned",
    }
    return labels[level]
  }

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border ${getReputationColor(level)}`}>
        {getIcon()}
        <span className="text-xs font-semibold">{getLabel()}</span>
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg border-2 ${getReputationColor(level)} bg-background/50`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <p className="font-semibold">{getLabel()}</p>
            <p className="text-xs text-muted-foreground">Reputation Score: {score}/100</p>
          </div>
        </div>
        <div className="text-right">
          <div className="w-24 h-2 bg-background rounded-full overflow-hidden border border-border">
            <div
              className={`h-full transition-all ${
                score >= 80
                  ? "bg-green-500"
                  : score >= 60
                    ? "bg-blue-500"
                    : score >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
