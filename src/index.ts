import {
  createChatRoom,
  findChatRoomsByUserId,
  findChatRoomById,
  joinChatRoom
} from './tables/ChatRoomTable'
import { invalidRequest, successResponse } from './responses/index'
import express from 'express'
import http from 'http'
import { isAuthMiddleware } from './middlewares'
import {
  createUser,
  findUserByNamePwd,
  isUserExistByName,
  findUserById
} from './tables/UserTable'
import { createJWTToken } from './until/jwt'
import { createMessage, findMessagesByChatRoomId } from './tables/MessageTable'

export const API_FAKE_TIMEOUT = 1 * 1000
const PORT = 3001

const errorHandlerFunc: express.ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return res
      .status(err.statusCode)
      .send({ status: err.statusCode, message: 'Something error' })
  }
  next()
}

const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

/*
  Register
*/
app.post('/register', async (req, res) => {
  const input = req.body as RegistrationInput
  if (!input.name || !input.password) {
    return invalidRequest(res, 'Invalid input')
  }

  if (isUserExistByName(input.name)) {
    return invalidRequest(res, 'User already exist')
  }

  await createUser({
    name: input.name,
    password: input.password
  })
  successResponse(res)
})

/*
  Login
*/
app.post('/login', async (req, res) => {
  const input = req.body as LoginInput
  if (!input.name || !input.password) {
    return invalidRequest(res, 'Invalid input')
  }

  const user = findUserByNamePwd(input.name, input.password)
  if (!user) return res.status(401).json({ code: 401, message: 'fail' })
  const jwtToken = createJWTToken(user.id)
  successResponse(res, { accessToken: jwtToken })
})

/*
  Create ChatRoom
*/
app.get('/me', isAuthMiddleware, async (req, res) => {
  const user = findUserById(req.customUserId)
  if (user) successResponse(res, user)
  else res.status(500).json({ code: 500, message: 'Profile not find' })
})

/*
  Fetch ChatRoom
*/
app.get('/chatRoom', isAuthMiddleware, async (req, res) => {
  const chatRooms = findChatRoomsByUserId(req.customUserId)
  successResponse(res, chatRooms)
})

/*
  Create ChatRoom
*/
app.post('/chatRoom', isAuthMiddleware, async (req, res) => {
  const chatroom = await createChatRoom(req.customUserId)
  successResponse(res, chatroom)
})

/*
  Join ChatRoom
*/
app.post('/chatRoom/:chatRoomId/join', isAuthMiddleware, async (req, res) => {
  const chatRoomId = req.params.chatRoomId
  if (!chatRoomId) {
    return invalidRequest(res, 'Invalid chat room')
  }
  const chatRoom = findChatRoomById(chatRoomId)
  if (!chatRoom.userIds.includes(req.customUserId))
    joinChatRoom(req.customUserId, chatRoomId)
  successResponse(res)
})

/*
  Fetch Message in ChatRoom
*/
app.get(
  '/chatRoom/:chatRoomId/messages',
  isAuthMiddleware,
  async (req, res) => {
    const chatRoomId = req.params.chatRoomId
    if (!chatRoomId) {
      return invalidRequest(res, 'Invalid chat room')
    }
    const chatRoom = findChatRoomById(chatRoomId)
    if (!chatRoom) {
      return res.status(500).json({ code: 500, message: 'Internal error' })
    }
    if (!chatRoom.userIds.includes(req.customUserId))
      return res.status(403).json({ code: 403, message: 'No Permission' })

    const messages = findMessagesByChatRoomId(chatRoom)
    successResponse(res, messages)
  }
)

/*
  Create Message
*/
app.post('/message/:chatRoomId', isAuthMiddleware, async (req, res) => {
  const chatRoomId = req.params.chatRoomId
  if (!chatRoomId) {
    return invalidRequest(res, 'Invalid chat room')
  }
  const chatRoom = findChatRoomById(chatRoomId)
  if (!chatRoom) {
    return res.status(500).json({ code: 500, message: 'Internal error' })
  }

  if (!chatRoom.userIds.includes(req.customUserId)) {
    return res.status(403).json({ code: 403, message: 'No Permission' })
  }
  const input = req.body as MessageInput
  if (!input.text) {
    return invalidRequest(res, 'Invalid input')
  }

  const user = findUserById(req.customUserId)
  const message = await createMessage(user, chatRoomId, {
    text: input.text,
    type: input.type
  })
  successResponse(res, message)
})

app.use((_, res) => {
  res.status(404).end('Hello World, but 404')
})
app.use(errorHandlerFunc)

const server = http.createServer(app)
server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})
