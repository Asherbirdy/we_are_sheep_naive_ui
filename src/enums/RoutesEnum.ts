// 登入頁
const client = '/C'

export enum Routes {
  'login' = '/',
}

// Dashboard
export enum ClientRoutes {
  'home' = client,
  'sheep' = `${client}/sheep`,
  'friend' = `${client}/friend`,
  'profile' = `${client}/profile`,
  'profileEmailVerify' = `${client}/profile/emailVerify`,
}
