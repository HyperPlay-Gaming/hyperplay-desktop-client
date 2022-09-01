import { NextFunction, Request, Response } from 'express'

export const isUserAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userIP = req.socket.remoteAddress
  const callerIsLocal = userIP?.includes('127.0.0.1')
  if (!callerIsLocal) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN'
    })
  }
  next()
  return
}
