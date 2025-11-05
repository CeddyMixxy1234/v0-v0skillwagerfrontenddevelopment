// Premium subscription tiers and management
export type SubscriptionTier = "free" | "pro" | "elite"

export interface SubscriptionPlan {
  tier: SubscriptionTier
  name: string
  price: number
  billingPeriod: "monthly" | "annual"
  features: string[]
  limits: {
    dailyWagers: number
    maxWagerAmount: number
    tournaments: boolean
    analytics: boolean
    followers: number
  }
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: "free",
    name: "Free",
    price: 0,
    billingPeriod: "monthly",
    features: ["Create wagers", "Browse matches", "Basic profile", "Leaderboard access", "Mobile responsive"],
    limits: {
      dailyWagers: 3,
      maxWagerAmount: 100,
      tournaments: false,
      analytics: false,
      followers: 50,
    },
  },
  pro: {
    tier: "pro",
    name: "Pro",
    price: 9.99,
    billingPeriod: "monthly",
    features: [
      "All Free features",
      "Unlimited daily wagers",
      "Advanced analytics",
      "Tournament access",
      "Custom profile badge",
      "Priority support",
      "Up to 500 followers",
      "Streaming integration",
    ],
    limits: {
      dailyWagers: 999,
      maxWagerAmount: 1000,
      tournaments: true,
      analytics: true,
      followers: 500,
    },
  },
  elite: {
    tier: "elite",
    name: "Elite",
    price: 24.99,
    billingPeriod: "monthly",
    features: [
      "All Pro features",
      "Unlimited wager amount",
      "Team management",
      "Custom branding",
      "Dedicated manager",
      "Priority payouts",
      "Unlimited followers",
      "API access",
      "Advanced fraud detection",
    ],
    limits: {
      dailyWagers: 999,
      maxWagerAmount: 999999,
      tournaments: true,
      analytics: true,
      followers: 999999,
    },
  },
}

export interface UserSubscription {
  tier: SubscriptionTier
  startDate: string
  renewalDate: string
  autoRenew: boolean
  paymentMethod: string
  cancellationDate?: string
}
