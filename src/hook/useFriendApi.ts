import useRequest from './http'
import type { RequestSchema } from '@/types'

enum FriendRequestURL {
  friendList = '/friend/getFriendList',
  addFriend = '/friend/request',
  youAddFriendList = '/friend/getSendFriendRequest',
  friendAddYouList = '/friend/getYourFriendRequest'
}

export const useFriendApi: RequestSchema = {
  friendList: {
    api: async () => await useRequest.get({
      url: FriendRequestURL.friendList
    })
  },
  addFriend: {
    api: async () => await useRequest.post({
      url: FriendRequestURL.addFriend,
      data: {
        friendId: '123'
      }
    })
  },
  youAddFriendList: {
    api: async () => await useRequest.get({
      url: FriendRequestURL.youAddFriendList
    })
  },
  friendAddYouList: {
    api: async () => await useRequest.get({
      url: FriendRequestURL.friendAddYouList
    })
  }
}
