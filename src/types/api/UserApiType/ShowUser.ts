// 顯示用戶資料
export interface ShowUserResponse {
  msg: string
  user: UserInfoData
}

export interface UserInfoData {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  role: string
}
