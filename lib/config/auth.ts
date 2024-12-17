export const AUTH_CONFIG = {
  providers: ['google', 'apple'] as const,
  redirects: {
    signIn: '/chat',
    signUp: '/chat',
    afterAuth: '/chat',
  },
} as const;