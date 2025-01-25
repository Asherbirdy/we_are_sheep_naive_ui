import useRequest from './http'
import type { LoginPayload, LoginResponse, RequestSchema, UserRegisterPayload, UserRegisterResponse } from '@/types'

enum AuthRequestURL {
  login = '/auth/login',
  userRegister = '/auth/userRegister',
  sendOTP = '/auth/sendOTP',
  bindOTPEmail = '/auth/bindOTPEmail',
  checkValidToken = '/auth/checkValidToken'
}

export const useAuthApi: RequestSchema = {
  /*
    * Login
  */
  login: {
    api: async (payload: LoginPayload): Promise<LoginResponse> => await useRequest.post({
      url: AuthRequestURL.login,
      data: payload
    })
  },
  /*
    * Register
  */
  userRegister: {
    api: async (payload: UserRegisterPayload): Promise<UserRegisterResponse> => await useRequest.post({
      url: AuthRequestURL.userRegister,
      data: payload
    }),
    queryKey: AuthRequestURL.userRegister
  },
  /*
    * Send Verify Email
  */
  sendVerifyEmail: {
    api: async () => await useRequest.get({
      url: AuthRequestURL.sendOTP
    }),
    queryKey: AuthRequestURL.sendOTP
  },
  /*
    * Verify Email
  */
  verifyEmail: {
    api: async (payload: { OTP: string }) => await useRequest.post({
      url: AuthRequestURL.bindOTPEmail,
      data: payload
    }),
    queryKey: AuthRequestURL.bindOTPEmail
  },
  /*
    * Check valid Token
  */
  checkValidToken: {
    api: async () => await useRequest.get({
      url: AuthRequestURL.checkValidToken
    })
  }
}
