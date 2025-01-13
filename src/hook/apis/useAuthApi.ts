import useRequest from '../http'
import type { LoginPayload, LoginResponse } from '@/types'

interface UserRegisterPayload {
  name: string
  email: string
  password: string
  serialNumber: string
}

export const useAuthApi = {
  /*
    * Login
  */
  login: async (payload: LoginPayload): Promise<LoginResponse> => await useRequest.post({
    url: '/auth/login',
    data: payload
  }),
  /*
  * Register
*/
  userRegister: async (payload: UserRegisterPayload): Promise<any> => await useRequest.post({
    url: '/auth/userRegister',
    data: payload
  })
}
