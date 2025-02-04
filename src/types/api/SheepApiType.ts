import type { Identity, PersonListKey } from '@/enums'

// * Create Sheep
export interface CreateSheepPayload {
  name: string
  ageRange: string
}

// * Get Sheep List
export interface GetSheepListResponse {
  msg: string
  list: SheepList
}

export interface SheepList {
  focusPersonList: PersonList[]
  nonFocusPersonList: PersonList[]
}

export interface PersonList {
  [PersonListKey.personStatus]: string
  [PersonListKey._id]: string
  [PersonListKey.name]: string
  [PersonListKey.ageRange]: string
  [PersonListKey.identity]: Identity
  [PersonListKey.weekInviteTag]: string[]
  [PersonListKey.focusPerson]: string
  [PersonListKey.userId]: string
  [PersonListKey.note]: string
  createdAt: string
  updatedAt: string
  __v: number
}

// * Edit Sheep
export interface EditSheepPayload {
  sheepId: string
  data: {
    ageRange: string
    weekInviteTag: string[]
    identity: string
    focusPerson: string
    personStatus: string
    note: string
  }
}

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
  tags?: string[]
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
