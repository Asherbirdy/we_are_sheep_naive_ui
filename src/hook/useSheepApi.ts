import useRequest from './http'
import type { CreateSheepPayload, GetSheepListResponse, EditSheepPayload } from '@/types'

export const useSheepApi = {
  /*
    * Create Sheep
  */
  createSheep: async (payload: CreateSheepPayload) => await useRequest.post({
    url: '/sheep/create',
    data: payload
  }),
  /*
    * Get Sheep List
  */
  getSheepList: async (): Promise<GetSheepListResponse> => await useRequest.get({
    url: '/sheep/list'
  }),
  /*
    * Edit Sheep
  */
  editSheep: async (payload: EditSheepPayload) => await useRequest.post({
    url: `/sheep/edit?sheepId=${payload.sheepId}`,
    data: payload.data
  }),
  /*
    * Delete Sheep
  */
  deleteSheep: async (sheepId: string) => await useRequest.post({
    url: `/sheep/delete?sheepId=${sheepId}`
  })
}
