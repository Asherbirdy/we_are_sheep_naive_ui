import useRequest from './http'
import type { ShowUserResponse, UpdatePasswordPayload } from '@/types'

export const useUserApi = {
  showMe: async (): Promise<ShowUserResponse> => await useRequest.get({
    url: '/users/showMe'
  }),
  updatePassword: async (payload: UpdatePasswordPayload) => await useRequest.patch({
    url: '/users/updateUserPassword',
    data: payload
  })
}
