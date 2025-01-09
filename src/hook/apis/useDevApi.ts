import useRequest from '../http'

export const useDevApi = {
  get: async () => await useRequest.get({
    url: '/dev/'
  })
}
