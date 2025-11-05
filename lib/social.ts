// Social follow and player relationship system

export interface PlayerProfile {
  username: string
  email: string
  bio?: string
  avatar?: string
  level: number
  totalWins: number
  totalWagers: number
  winRate: number
  followers: number
  following: number
  badges: string[]
  createdAt: string
  lastActive: string
  subscriptionTier: "free" | "pro" | "elite"
}

export interface FollowRelationship {
  followerId: string
  followingId: string
  followedAt: string
  isBlocked?: boolean
}

export interface PlayerStats {
  totalEarnings: number
  currentStreak: number
  bestStreak: number
  favoriteGame: string
  averageWagerAmount: number
}

export class SocialManager {
  static addFollower(userId: string, targetUserId: string): FollowRelationship {
    return {
      followerId: userId,
      followingId: targetUserId,
      followedAt: new Date().toISOString(),
    }
  }

  static removeFollower(userId: string, targetUserId: string): boolean {
    // Implementation would remove the follow relationship
    return true
  }

  static getFollowers(userId: string): FollowRelationship[] {
    // Implementation would fetch from storage
    return []
  }

  static getFollowing(userId: string): FollowRelationship[] {
    // Implementation would fetch from storage
    return []
  }

  static isFollowing(userId: string, targetUserId: string): boolean {
    // Implementation would check storage
    return false
  }
}
