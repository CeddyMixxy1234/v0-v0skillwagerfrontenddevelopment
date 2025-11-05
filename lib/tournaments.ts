// Tournament management and bracket system

export type TournamentStatus = "draft" | "registration" | "in-progress" | "completed" | "cancelled"
export type TournamentFormat = "single-elimination" | "double-elimination" | "round-robin" | "swiss"

export interface Tournament {
  id: string
  name: string
  description: string
  format: TournamentFormat
  status: TournamentStatus
  game: string
  entryFee: number
  maxPlayers: number
  registeredPlayers: number
  prizePool: number
  startDate: string
  endDate?: string
  createdBy: string
  createdAt: string
  rounds: TournamentRound[]
}

export interface TournamentRound {
  id: string
  roundNumber: number
  matches: TournamentMatch[]
  startDate: string
  endDate?: string
  status: "pending" | "in-progress" | "completed"
}

export interface TournamentMatch {
  id: string
  roundId: string
  player1Id: string
  player2Id: string
  winnerId?: string
  wagerAmount: number
  status: "pending" | "in-progress" | "completed"
  createdAt: string
}

export interface TournamentParticipant {
  id: string
  tournamentId: string
  userId: string
  username: string
  registeredAt: string
  wins: number
  losses: number
  position?: number
  eliminated: boolean
}

export const POPULAR_TOURNAMENTS = [
  {
    id: "esports-global-2025",
    name: "Global ESports Championship 2025",
    game: "Valorant",
    format: "single-elimination",
    prizePool: 50000,
    players: 256,
    startDate: "2025-12-01",
  },
  {
    id: "chess-blitz-monthly",
    name: "Monthly Blitz Championship",
    game: "Chess.com",
    format: "round-robin",
    prizePool: 5000,
    players: 64,
    startDate: "2025-11-20",
  },
  {
    id: "pubg-squad-wars",
    name: "PUBG Squad Wars",
    game: "PUBG",
    format: "double-elimination",
    prizePool: 25000,
    players: 128,
    startDate: "2025-11-25",
  },
]
