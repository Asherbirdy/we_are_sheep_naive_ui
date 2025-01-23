import useRequest from './http'
import type { CreateSheepPayload, GetSheepListResponse, EditSheepPayload, RequestSchema } from '@/types'

enum SheepRequestURL {
  createSheep = '/sheep/create',
  getSheepList = '/sheep/list',
  editSheep = '/sheep/edit',
  deleteSheep = '/sheep/delete'
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
  }
}
