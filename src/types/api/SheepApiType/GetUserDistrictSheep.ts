// * Get User District Sheep
export interface GetUserDistrictSheepResponse {
  msg: string
  data: {
    male: DistrictSheep[]
    female: DistrictSheep[]
    noFocus: DistrictSheep[]
  }
}

export interface DistrictSheep {
  _id: string
  name: string
  ageRange: string
  focusPerson: string
  userId: {
    _id: string
    name: string
  }
  personStatus: string
  note: string
  createdAt: string
  updatedAt: string
  __v: number
  district: string
  weekInviteTag: string[]
  identity: string
}