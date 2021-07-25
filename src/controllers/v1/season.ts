import { Router } from 'express';
import { Paths, Queries } from '../../interfaces';
import { common, allSeasons } from '../../scrapers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page, season }: Queries = req.query;
    let data;
    if (season) {
      data = await common(season, page);
    } else {
      data = await common(Paths.CurrentSeason, page);
    }
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

router.get('/all', async (_req, res, next) => {
  try {
    const data = await allSeasons();
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
