import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN_SECRET'
const REFRESH_TOKEN_SECRET = 'REFRESH_TOKEN_SECRET'

const ACCESS_TOKEN_EXPIRES_IN = 60 * 5 // 5 mins
const REFRESH_TOKEN_EXPIRES_IN = '7d' // 7 days

const sessions: { [key: string]: string } = {}

export const removeSession = (session: string) => {
  delete sessions[session]
}

export const createJWTToken = (userId: string, userName: string) => {
  const session = uuidv4()
  const accessToken = jwt.sign(
    { id: userId, userName, session },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN
    }
  )
  const refreshToken = jwt.sign(
    { id: userId, userName, session },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN
    }
  )

  sessions[session] = userId
  return {
    accessToken,
    refreshToken
  }
}

export const validRefreshToken = (
  token: string
): Promise<{ userId: string | null; code: number; session: string | null }> =>
  new Promise((res, rej) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err?.name === 'TokenExpiredError')
        res({
          code: 403,
          userId: null,
          session: null
        })

      if (!decoded)
        res({
          code: 401,
          userId: null,
          session: null
        })

      const session = (decoded as JWTToken).session
      const userId = (decoded as JWTToken).id

      if (!sessions[session])
        res({
          code: 401,
          userId: null,
          session: null
        })

      res({ code: 200, userId, session })
    })
  })

export const decodeToken = (token: string) => {
  return jwt.decode(token) as JWTToken
}

export const validateAccessToken = (
  token: string
): Promise<{ userId: string | null; code: number; session: string | null }> =>
  new Promise((res, rej) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err?.name === 'TokenExpiredError')
        res({
          code: 403,
          userId: null,
          session: null
        })
      if (!decoded)
        res({
          code: 401,
          userId: null,
          session: null
        })
      const userId = (decoded as JWTToken).id
      const session = (decoded as JWTToken).session

      res({ code: 200, userId, session })
    })
  })
