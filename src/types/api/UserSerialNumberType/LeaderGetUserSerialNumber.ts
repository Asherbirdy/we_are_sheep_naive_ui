import type { SerialNumber } from './LeaderCreateSerialNumber'
// * 區負責取得自己建立的序列號
export interface LeaderGetUserSerialNumberResponse {
  msg: string
  data: SerialNumber[]
}