import useRequest from './http'

export const useTeenMeetingAttendApi = {
  get: async (payload: {
    password: string
  }) => await useRequest.post({
    url: '/teenMeetingAttend/get',
    data: payload.password
  })
}
