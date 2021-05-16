import { Request, Response, NextFunction } from 'express';

function invalidMethod(req: Request, _res: Response, next: NextFunction) {
  if (!/^(GET)$/.test(req.method)) {
    next(new Error('Bad Request'));
  }
  next();
}

export default invalidMethod;
