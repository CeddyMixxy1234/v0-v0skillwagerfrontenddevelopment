// Player reputation scoring and anti-fraud system

export type ReputationLevel = "trusted" | "verified" | "standard" | "flagged" | "banned"
export type FraudFlag = "account-sharing" | "payment-dispute" | "collusion" | "match-fixing" | "chargeback"

export interface PlayerReputation {
  userId: string
  reputationScore: number // 0-100
  level: ReputationLevel
  verifiedAccounts: number
  matchHistory: number
  winRate: number
  accountAge: number // days
  paymentHistory: number // completed transactions
  disputes: number
  flags: FraudFlag[]
  lastReviewDate: string
  trustIndicators: TrustIndicator[]
}

export interface TrustIndicator {
  type:
    | "email-verified"
    | "phone-verified"
    | "id-verified"
    | "payment-verified"
    | "account-age"
    | "consistent-performance"
  verified: boolean
  verifiedAt?: string
}

export interface DisputeCase {
  id: string
  reporterId: string
  reportedUserId: string
  matchId: string
  reason: FraudFlag
  description: string
  evidence: string[]
  status: "open" | "investigating" | "resolved" | "dismissed"
  createdAt: string
  resolvedAt?: string
  resolution?: string
}

export function calculateReputationScore(reputation: Omit<PlayerReputation, "reputationScore" | "level">): {
  score: number
  level: ReputationLevel
} {
  let score = 50 // Base score

  // Account age (max +20)
  const accountDaysBonus = Math.min((reputation.accountAge / 365) * 20, 20)
  score += accountDaysBonus

  // Win rate consistency (max +15)
  if (reputation.winRate >= 40 && reputation.winRate <= 60) {
    score += 15 // Realistic win rate
  } else if (reputation.winRate > 20 && reputation.winRate < 80) {
    score += 10
  }

  // Payment history (max +10)
  score += Math.min(reputation.paymentHistory * 2, 10)

  // Penalties
  if (reputation.disputes > 0) score -= reputation.disputes * 5
  if (reputation.flags.length > 0) score -= reputation.flags.length * 10

  score = Math.max(0, Math.min(100, score))

  let level: ReputationLevel
  if (reputation.flags.includes("account-sharing") || reputation.flags.includes("chargeback")) {
    level = "banned"
  } else if (score < 30 || reputation.flags.length > 0) {
    level = "flagged"
  } else if (score >= 80 && reputation.verifiedAccounts >= 2) {
    level = "trusted"
  } else if (score >= 70) {
    level = "verified"
  } else {
    level = "standard"
  }

  return { score, level }
}

export function getReputationColor(level: ReputationLevel): string {
  const colors: Record<ReputationLevel, string> = {
    trusted: "text-green-500 border-green-500/30",
    verified: "text-blue-500 border-blue-500/30",
    standard: "text-gray-500 border-gray-500/30",
    flagged: "text-yellow-500 border-yellow-500/30",
    banned: "text-red-500 border-red-500/30",
  }
  return colors[level]
}
