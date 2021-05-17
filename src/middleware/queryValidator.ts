import { Request, Response, NextFunction } from 'express';

function queryValidator(req: Request, _res: Response, next: NextFunction) {
  const { page, query } = req.query;
  if (page && (typeof page !== 'string' || isNaN(+page))) next(new Error('Invalid page'));
  if (query && typeof query !== 'string') next(new Error('Invalid query'));
  next();
}

export default queryValidator;
