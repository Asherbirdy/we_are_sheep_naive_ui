import useRequest from './http'
import type { CreateSheepPayload, GetSheepListResponse, EditSheepPayload, RequestSchema } from '@/types'

export interface GetUserDistrictSheepResponse {
  msg: string
  data: Data
}

export interface Data {
  male: Male[]
  female: any[]
}

export interface Male {
  _id: string
  name: string
  ageRange: string
  tags?: string[]
  focusPerson: string
  userId: UserId
  personStatus: string
  note: string
  createdAt: string
  updatedAt: string
  __v: number
  district: string
  weekInviteTag: string[]
  identity: string
}

export interface UserId {
  _id: string
  name: string
}

enum SheepRequestURL {
  createSheep = '/sheep/create',
  getSheepList = '/sheep/list',
  editSheep = '/sheep/edit',
  deleteSheep = '/sheep/delete',
  getUserDistrictSheep = '/sheep/user-district-sheep'
}

export const useSheepApi: RequestSchema = {
  /*
    * Create Sheep
  */
  createSheep: {
    api: async (payload: CreateSheepPayload) => await useRequest.post({
      url: SheepRequestURL.createSheep,
      data: payload
    })
  },
  /*
    * Get Sheep List
  */
  getSheepList: {
    api: async (): Promise<GetSheepListResponse> => await useRequest.get({
      url: SheepRequestURL.getSheepList
    })
  },
  /*
    * Edit Sheep
  */
  editSheep: {
    api: async (payload: EditSheepPayload) => await useRequest.patch({
      url: `${SheepRequestURL.editSheep}?sheepId=${payload.sheepId}`,
      data: payload.data
    })
  },
  /*
    * Delete Sheep
  */
  deleteSheep: {
    api: async (sheepId: string) => await useRequest.delete({
      url: `${SheepRequestURL.deleteSheep}?sheepId=${sheepId}`
    })
  },
  /*
    * Get Sheep Detail
  */
  getUserDistrictSheep: {
    api: async (): Promise<GetUserDistrictSheepResponse> => await useRequest.get({
      url: SheepRequestURL.getUserDistrictSheep
    }),
    queryKey: SheepRequestURL.getUserDistrictSheep
  }
}
