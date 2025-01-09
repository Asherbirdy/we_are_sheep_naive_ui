import useRequest from '../http'
import type { LoginPayload, LoginResponse } from '@/types'

export const useAuthApi = {
  /*
    * Login
  */
  login: async (payload: LoginPayload): Promise<LoginResponse> => await useRequest.post({
    url: '/auth/login',
    data: payload
  })
}
