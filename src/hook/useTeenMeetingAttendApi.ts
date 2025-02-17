import useRequest from './http'
export interface TeenMeetingAttendApiGetResponse {
  message: string
  data: Data
}

export interface Data {
  ageRange: {
    nonSelected: Detail
    teenager: Detail
    college: Detail
    youth: Detail
    child1: Detail
    child2: Detail
    child3: Detail
  }
}

interface Detail {
  data: Daum[]
  count: number
}

export interface Daum {
  _id: string
  district: string
  name: string
  ageRange: string
  gender: string
  participation: string
  meetingStatus: string
  sheepherd: string
  inviteList: string
  createdAt: string
  updatedAt: string
  __v: number
}

export const useTeenMeetingAttendApi = {
  get: async (payload: {
    password: string
  }) => await useRequest.post({
    url: '/teemMeetingAttend/get',
    data: payload
  })
}
