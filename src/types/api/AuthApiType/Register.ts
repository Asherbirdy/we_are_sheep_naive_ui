/*
  * Register
*/
export interface UserRegisterPayload {
  name: string
  email: string
  password: string
  serialNumber: string
}

export interface UserRegisterResponse {
  user: UserRegisterResponseUser
  token: UserRegisterResponseToken
}

export interface UserRegisterResponseUser {
  name: string
  userId: string
  role: string
  districtId: string
  emailVerified: boolean
}

export interface UserRegisterResponseToken {
  accessTokenJWT: string
  refreshTokenJWT: string
}
