import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (typeof req.headers.authorization !== 'undefined') {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(
      token,
      'MIIEpAIBAAKCAQEAyVTQ9QxfutaYXKBbYfZbH2vhIWoIPEjAFSbsy1PZoIcclUQ',
      { algorithms: 'HS256' },
      (err, user) => {
        if (err) {
          res.status(500).json({ error: 'Not Authorized' });
          throw new Error('Not Authorized');
        }
        return next();
      },
    );
  } else {
    res.status(500).json({ error: 'Not Authorized' });
    throw new Error('Not Authorized');
  }
};
