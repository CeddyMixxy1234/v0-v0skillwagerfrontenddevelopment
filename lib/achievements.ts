// Achievement badges and gamification system

export type AchievementCategory = "wager" | "social" | "skill" | "special"

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: AchievementCategory
  requirement: {
    type: "wagers" | "wins" | "streak" | "followers" | "tournament" | "collection"
    target: number
  }
  rarity: "common" | "rare" | "epic" | "legendary"
  points: number
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-wager",
    name: "First Blood",
    description: "Complete your first wager",
    icon: "⚔️",
    category: "wager",
    requirement: { type: "wagers", target: 1 },
    rarity: "common",
    points: 10,
  },
  {
    id: "winning-streak-5",
    name: "On Fire",
    description: "Win 5 wagers in a row",
    icon: "🔥",
    category: "skill",
    requirement: { type: "streak", target: 5 },
    rarity: "rare",
    points: 50,
  },
  {
    id: "win-100",
    name: "Century Club",
    description: "Reach 100 wins",
    icon: "💯",
    category: "skill",
    requirement: { type: "wins", target: 100 },
    rarity: "epic",
    points: 100,
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Gain 100 followers",
    icon: "🦋",
    category: "social",
    requirement: { type: "followers", target: 100 },
    rarity: "rare",
    points: 40,
  },
  {
    id: "tournament-champion",
    name: "Tournament Champion",
    description: "Win a tournament",
    icon: "👑",
    category: "special",
    requirement: { type: "tournament", target: 1 },
    rarity: "legendary",
    points: 200,
  },
  {
    id: "high-roller",
    name: "High Roller",
    description: "Wager $1000+ in total",
    icon: "💰",
    category: "wager",
    requirement: { type: "wagers", target: 1000 },
    rarity: "epic",
    points: 75,
  },
  {
    id: "perfect-day",
    name: "Perfect Day",
    description: "Win 10 wagers in one day",
    icon: "⭐",
    category: "skill",
    requirement: { type: "wagers", target: 10 },
    rarity: "rare",
    points: 60,
  },
]

export interface UserAchievements {
  unlockedIds: string[]
  totalPoints: number
  lastUnlocked?: string
}
