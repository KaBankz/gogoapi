import { Router } from 'express';
import { Paths, Queries } from '../../interfaces';
import { common } from '../../scrapers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { index, page }: Queries = req.query;
    const data = await common(Paths.Movies, page, undefined, index);
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
