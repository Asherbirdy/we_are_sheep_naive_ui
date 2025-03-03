import type { DistrictSheep } from './GetUserDistrictSheep'

// * Get User and District Sheep
export interface UserAndDistrictSheepResponse {
  msg: string
  data: {
    personal: DistrictSheep[]
    district: DistrictSheep[]
  }
}
