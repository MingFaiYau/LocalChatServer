import { userJoinChatRoom } from './UserTable'
import { v4 as uuidv4 } from 'uuid'
import { API_FAKE_TIMEOUT } from '..'

const chatRoomTable: ChatRoomTable = {}

export const joinChatRoom = (userId: string, chatRoomId: string) => {
  userJoinChatRoom(userId, chatRoomId)
  chatRoomTable[chatRoomId].userIds.push(userId)
}

export const findChatRoomsByUserId = (userId: string) => {
  return Object.values(chatRoomTable).filter((room) =>
    room.userIds.some((id) => id === userId)
  )
}

export const findChatRoomById = (id: string) => {
  return chatRoomTable[id]
}

export const createChatRoom = (userId: string): Promise<ChatRoom> =>
  new Promise((res) => {
    setTimeout(async () => {
      const id = uuidv4()
      const newChatRoom: ChatRoom = {
        id,
        createdDate: new Date().toISOString(),

        userIds: [userId],
      }
      chatRoomTable[id] = newChatRoom
      userJoinChatRoom(userId, id)
      res(newChatRoom)
    }, API_FAKE_TIMEOUT)
  })
