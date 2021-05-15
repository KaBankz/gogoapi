import { Router } from 'express';
import { search } from '../../scrapers';

const router = Router();

interface queries {
  query: string;
  page: number;
}

router.get('/', async (req, res, next) => {
  try {
    const obj: any = req.query;
    const { query, page }: queries = obj;
    if (!query) next(new Error('Missing Search Query'));
    const data = await search(query, page);
    const status = data.length ? 200 : 404;
    res.status(status).json({
      data: data.length ? data : null,
      status,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
