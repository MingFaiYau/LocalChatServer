import {
  validateAccessToken,
  decodeToken,
  validRefreshToken,
  removeSession
} from './../until/jwt'
import express from 'express'

export type MiddlewareFunc = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => any

export const isAuthMiddleware: MiddlewareFunc = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const accessToken = req.headers.authorization.replace('Bearer ', '')
    if (!accessToken)
      res.status(403).json({ code: 403, message: 'No Permission' })

    validateAccessToken(accessToken).then(({ userId, session, code }) => {
      if (userId && session) {
        req.customUserId = userId as string
        req.customSession = session as string
        next()
      } else {
        res.status(code).json({ code, message: 'No Permission' })
      }
    })
  } else {
    res.status(403).json({ code: 403, message: 'No Permission' })
  }
}

export const isRefreshMiddleware: MiddlewareFunc = async (req, res, next) => {
  if (
    req.body.refreshToken &&
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    const accessToken = req.headers.authorization.replace('Bearer ', '')
    if (!accessToken)
      res.status(403).json({ code: 403, message: 'No Permission' })

    const { id } = decodeToken(accessToken)
    const refreshToken = req.body.refreshToken
    const { code, userId, session } = await validRefreshToken(refreshToken)

    if (session && userId && userId === id) {
      removeSession(session)
      req.customUserId = userId as string
      next()
    } else {
      res.status(code).json({ code, message: 'No Permission' })
    }
  } else {
    res.status(403).json({ code: 403, message: 'No Permission' })
  }
}
