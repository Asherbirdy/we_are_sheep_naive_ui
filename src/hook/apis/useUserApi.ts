import useRequest from '../http'

export interface ShowUserResponse {
  msg: string
  user: User
}

export interface User {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  role: string
}

export const useUserApi = {
  show: async (): Promise<ShowUserResponse> => await useRequest.get({
    url: '/users/showMe'
  })
}
