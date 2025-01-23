import useRequest from './http'
import type { RequestSchema } from '@/types'

export const useDevApi: RequestSchema = {
  showMe: {
    api: async () => await useRequest.get({
      url: '/user/showMe'
    })
  }
}
