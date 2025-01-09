/*
  * Login
*/
export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: Token
}

export interface User {
  name: string
  userId: string
  role: string
  emailVerified: boolean
}

export interface Token {
  accessTokenJWT: string
  refreshTokenJWT: string
}
