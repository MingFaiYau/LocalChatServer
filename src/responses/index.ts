import express from 'express'

export const customResponse = () => {}

export const invalidRequest = (response: express.Response, message: string) => {
  return response.status(400).json({ code: 400, message })
}

export const successResponse = (
  response: express.Response,
  returnJson?: any
) => {
  return response
    .status(200)
    .json({ code: 200, message: 'success', body: returnJson })
}
