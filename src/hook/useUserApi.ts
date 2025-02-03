import useRequest from './http'
import type { RequestSchema, ShowUserResponse, UpdatePasswordPayload } from '@/types'

enum UserRequestURL {
  showMe = '/users/showMe',
  updatePassword = '/users/updateUserPassword',
  editUserInfo = '/users/editUserInfo'
}

export const useUserApi: RequestSchema = {
  showMe: {
    api: async (): Promise<ShowUserResponse> => await useRequest.get({
      url: UserRequestURL.showMe
    })
  },
  updatePassword: {
    api: async (payload: UpdatePasswordPayload) => await useRequest.patch({
      url: UserRequestURL.updatePassword,
      data: payload
    })
  },
  editUserInfo: {
    api: async (payload: {name: string}) => await useRequest.put({
      url: UserRequestURL.editUserInfo,
      data: payload
    })
  }
}
