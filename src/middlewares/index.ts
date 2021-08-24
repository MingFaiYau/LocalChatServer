import { isValidToken } from './../until/jwt'
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
    const jwtToken = req.headers.authorization.replace('Bearer ', '')
    isValidToken(jwtToken).then((userId) => {
      if (userId) {
        req.customUserId = userId as string
        next()
      } else {
        res.status(403).json({ code: 403, message: 'Invalid call' })
      }
    })
  }
}
