import { Router } from 'express';
import { Paths, Queries } from '../../interfaces';
import { common } from '../../scrapers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { query, page }: Queries = req.query;
    const data = await common(Paths.Search, page, query);
    const override = data.map(({ episode, ...keep }) => keep);
    const status = override.length ? 200 : 404;
    res.status(status).json({
      data: override,
      status,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
