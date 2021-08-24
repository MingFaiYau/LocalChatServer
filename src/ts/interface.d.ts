interface User {
  id: string
  name: string
  password: string
  type: UserType
  createdDate: string

  chatRoomIds: string[]
}

interface ChatRoom {
  id: string
  createdDate: string

  userIds: string[]
}

interface Message {
  id: string
  text: string
  type: MessageType
  createdDate: string
  user: User
  chatRoomId: string
}

interface UserTable {
  [id: string]: User
}

interface ChatRoomTable {
  [id: string]: ChatRoom
}

interface MessageTable {
  [id: string]: Message
}

interface JWTToken {
  id: string
}

type UserType = 'User' | 'Admin' | 'System'
type MessageType = 'Normal' | 'System' | 'Hidden'
