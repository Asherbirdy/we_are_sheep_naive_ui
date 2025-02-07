// * 區負責創建序列號
export interface LeaderCreateSerialNumberResponse {
  msg: string
  serialNumber: SerialNumber
}

export interface SerialNumber {
  serialNumber: string
  isUsed: boolean
  role: string
  districtId: string
  createByUser: string
  notes: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

// * 區負責取得自己建立的序列號
export interface LeaderGetUserSerialNumberResponse {
  msg: string
  data: SerialNumber[]
}