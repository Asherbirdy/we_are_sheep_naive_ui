import useRequest from './http'
import type { LeaderCreateSerialNumberResponse, LeaderGetUserSerialNumberResponse, RequestSchema } from '@/types'

enum UserSerialNumberRequestURL {
  leaderCreateSerialNumber = '/userSerialNumber/districtLeaderCreateUserSerial',
  leaderGetUserSerialNumber = '/userSerialNumber/getLeaderSerialNumber'
}

export const useUserSerialNumberApi: RequestSchema = {
  /*
    * 區負責創建序列號
  */
  leaderCreateSerialNumber: {
    api: async (): Promise<LeaderCreateSerialNumberResponse> => await useRequest.post({
      url: UserSerialNumberRequestURL.leaderCreateSerialNumber
    }),
    queryKey: UserSerialNumberRequestURL.leaderCreateSerialNumber
  },
  /*
    * 區負責取得自己建立的序列號
  */
  leaderGetUserSerialNumber: {
    api: async (): Promise<LeaderGetUserSerialNumberResponse> => await useRequest.get({
      url: UserSerialNumberRequestURL.leaderGetUserSerialNumber
    }),
    queryKey: UserSerialNumberRequestURL.leaderGetUserSerialNumber
  }
}
