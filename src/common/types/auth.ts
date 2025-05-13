export type AuthSession = {
  user: {
    name: string
    email: string
    image: string
    id: string
  }
  expires: string
  userId: string
  linkedAccounts: {
    provider: string
    providerAccountId: string
  }[]
  isAdmin: boolean
  role: string
}
