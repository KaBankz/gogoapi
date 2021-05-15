import { Router } from 'express';
import { recent } from '../../scrapers';

const router = Router();

interface queries {
  page: number;
}

router.get('/', async (req, res, next) => {
  try {
    const obj: any = req.query;
    const { page }: queries = obj;
    const data = await recent(page);
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
