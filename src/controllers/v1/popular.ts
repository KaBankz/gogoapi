import { Router } from 'express';
import { Paths, Queries } from '../../interfaces';
import { common } from '../../scrapers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page }: Queries = req.query;
    const data = await common(Paths.Popular, page);
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
