import { v4 as uuidv4 } from 'uuid'
import { API_FAKE_TIMEOUT } from '..'

const userTable: UserTable = {}

export const maskedUser = (user: User): MaskedUser => {
  return {
    id: user.id,
    name: user.name
  }
}

export const userJoinChatRoom = (userId: string, chatRoomId: string) => {
  userTable[userId].chatRoomIds.push(chatRoomId)
}

export const isUserExistByName = (name: string) => {
  return !!Object.values(userTable).some((user) => user.name === name)
}

export const findUserById = (id: string) => {
  return userTable[id]
}

export const findUserByNamePwd = (name: string, password: string) => {
  return Object.values(userTable).find((user) => {
    return user.name === name && user.password === password
  })
}

export const createUser = (input: RegistrationInput): Promise<User> =>
  new Promise((res) => {
    setTimeout(async () => {
      const { name, password } = input
      const id = uuidv4()
      const newUser: User = {
        id,
        createdDate: new Date().toISOString(),

        name,
        password,
        type: 'User',
        chatRoomIds: []
      }
      userTable[id] = newUser
      res(newUser)
    }, API_FAKE_TIMEOUT)
  })
