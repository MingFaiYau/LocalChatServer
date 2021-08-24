import { v4 as uuidv4 } from 'uuid'
import { API_FAKE_TIMEOUT } from '..'

const messageTable: MessageTable = {}

export const findMessagesByChatRoomId = (chatRoomId: string) => {
  return Object.values(messageTable).filter(
    (msg) => msg.chatRoomId === chatRoomId
  )
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
        user,
        chatRoomId
      }
      messageTable[id] = newMessage
      res(newMessage)
    }, API_FAKE_TIMEOUT)
  })
