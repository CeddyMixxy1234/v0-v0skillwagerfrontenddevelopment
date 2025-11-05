export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",

  // Auth routes
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },

  SUBSCRIPTION: "/subscription",
  ANALYTICS: "/analytics",
  ACHIEVEMENTS: "/achievements",
  SOCIAL: {
    FOLLOWERS: "/social/followers",
    FOLLOWING: "/social/following",
    LEADERBOARD: "/leaderboard",
  },

  // Wager routes
  WAGER: {
    BROWSE: "/wager/browse",
    CREATE: "/wager/create",
    DETAIL: (id: string) => `/wager/${id}`,
  },

  // Main feature routes
  WAGERS: "/wagers",
  MATCHES: "/matches",
  MATCH_DETAIL: (id: string) => `/matches/${id}`,
  LEADERBOARD: "/leaderboard",
  PROFILE: (username: string) => `/profile/${username}`,

  // Wallet routes
  WALLET: "/wallet",
  WALLET_DEPOSIT: "/wallet/deposit",
  WALLET_WITHDRAW: "/wallet/withdraw",

  // Settings and admin
  SETTINGS: "/settings",
  ADMIN: "/admin",

  // Legal/Info routes
  LEGAL: {
    TERMS: "/legal/terms",
    PRIVACY: "/legal/privacy",
  },
}
