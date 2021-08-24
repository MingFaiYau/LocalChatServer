import { v4 as uuidv4 } from 'uuid'
import { API_FAKE_TIMEOUT } from '..'
import { maskedUser, findUserById } from './UserTable'

const messageTable: MessageTable = {}

export const findMessagesByChatRoomId = (chatRoom: ChatRoom) => {
  const chatRoomId = chatRoom.id
  const users: { [userId: string]: MaskedUser } = {}
  chatRoom.userIds.forEach((userId) => {
    const user = maskedUser(findUserById(userId))
    users[user.id] = user
  })
  return Object.values(messageTable)
    .filter((msg) => msg.chatRoomId === chatRoomId)
    .map((msg) => {
      return { ...msg, user: users[msg.userId] }
    })
}

export const createMessage = (
  user: User,
  chatRoomId: string,
  input: MessageInput
): Promise<Message> =>
  new Promise((res) => {
    setTimeout(async () => {
      const { text, type } = input
      const id = uuidv4()
      const newMessage: Message = {
        id,
        createdDate: new Date().toISOString(),

        text,
        type: type || 'Normal',
        userId: user.id,
        user: maskedUser(user),
        chatRoomId
      }
      messageTable[id] = newMessage
      res(newMessage)
    }, API_FAKE_TIMEOUT)
  })
