import jwt from 'jsonwebtoken'

const TOKEN_SECRET = 'HelloWorld'

export const createJWTToken = (userId: string) => {
  const jwtToken = jwt.sign({ id: userId }, TOKEN_SECRET)
  return jwtToken
}

export const isValidToken = (token: string) =>
  new Promise((res, rej) => {
    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
      const userId = (decoded as JWTToken).id
      res(userId)
    })
  })
