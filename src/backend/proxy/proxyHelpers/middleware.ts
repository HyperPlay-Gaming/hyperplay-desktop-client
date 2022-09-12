import { NextFunction, Request, Response } from 'express'
import { provider } from '../providerHelper'

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

export const isProviderConnected = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!provider.isConnected())
    res.status(503).send({ message: 'Wallet not connected' })
  next()
}

export const unless = function (
  path: string,
  middleware: (req: Request, res: Response, next: NextFunction) => void
): (req: Request, res: Response, next: NextFunction) => void {
  return function (req, res, next) {
    if (path === req.path) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}
