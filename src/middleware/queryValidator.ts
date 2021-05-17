import { Request, Response, NextFunction } from 'express';

function queryValidator(req: Request, _res: Response, next: NextFunction) {
  const { page, query, index } = req.query;
  if (page && (typeof page !== 'string' || isNaN(+page))) next(new Error('Invalid page'));
  if (query && typeof query !== 'string') next(new Error('Invalid query'));
  if (index && typeof index !== 'string' && index.length === 1) next(new Error('Invalid index'));
  next();
}

export default queryValidator;
