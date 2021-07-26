import { Router } from 'express';
import { Params } from '../../interfaces';
import { anime } from '../../scrapers';

const router = Router();

router.get('/:slug', async (req, res, next) => {
  try {
    const { slug }: Params = req.params;
    const data = await anime(slug);
    const override = data.map(({ ...keep }) => keep);
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
