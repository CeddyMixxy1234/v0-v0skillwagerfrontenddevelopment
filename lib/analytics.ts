// Advanced analytics and statistics

export interface PlayerAnalytics {
  totalWagers: number
  totalWins: number
  totalLosses: number
  winRate: number
  totalEarnings: number
  averageWagerAmount: number
  largestWin: number
  largestLoss: number
  currentStreak: number
  bestStreak: number
  gameStats: GameStatistic[]
  monthlyEarnings: DailyEarning[]
  opponentStats: {
    against: string
    wins: number
    losses: number
  }[]
}

export interface GameStatistic {
  game: string
  wagers: number
  wins: number
  winRate: number
  earnings: number
}

export interface DailyEarning {
  date: string
  amount: number
  wagers: number
}

export function calculateAnalytics(wagers: any[]): PlayerAnalytics {
  if (!wagers || wagers.length === 0) {
    return {
      totalWagers: 0,
      totalWins: 0,
      totalLosses: 0,
      winRate: 0,
      totalEarnings: 0,
      averageWagerAmount: 0,
      largestWin: 0,
      largestLoss: 0,
      currentStreak: 0,
      bestStreak: 0,
      gameStats: [],
      monthlyEarnings: [],
      opponentStats: [],
    }
  }

  const totalWins = wagers.filter((w) => w.status === "won").length
  const totalLosses = wagers.filter((w) => w.status === "lost").length
  const totalWagers = wagers.length
  const winRate = totalWagers > 0 ? (totalWins / totalWagers) * 100 : 0

  const totalEarnings = wagers.filter((w) => w.status === "won").reduce((sum, w) => sum + (w.amount || 0), 0)

  const averageWagerAmount = totalWagers > 0 ? wagers.reduce((sum, w) => sum + (w.amount || 0), 0) / totalWagers : 0

  const largestWin = wagers.filter((w) => w.status === "won").reduce((max, w) => Math.max(max, w.amount || 0), 0)

  const largestLoss = wagers.filter((w) => w.status === "lost").reduce((max, w) => Math.max(max, w.amount || 0), 0)

  // Calculate streaks
  let currentStreak = 0
  let bestStreak = 0
  let streak = 0

  for (const wager of wagers) {
    if (wager.status === "won") {
      streak++
      bestStreak = Math.max(bestStreak, streak)
    } else {
      streak = 0
    }
  }
  currentStreak = streak

  return {
    totalWagers,
    totalWins,
    totalLosses,
    winRate: Math.round(winRate * 100) / 100,
    totalEarnings: Math.round(totalEarnings * 100) / 100,
    averageWagerAmount: Math.round(averageWagerAmount * 100) / 100,
    largestWin,
    largestLoss,
    currentStreak,
    bestStreak,
    gameStats: [],
    monthlyEarnings: [],
    opponentStats: [],
  }
}
