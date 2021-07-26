import { Router } from 'express';

import search from './search';
import popular from './popular';
import recent from './recent';
import season from './season';
import movies from './movies';
import anime from './anime';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/search', search);
router.use('/popular', popular);
router.use('/recent', recent);
router.use('/season', season);
router.use('/movies', movies);
router.use('/anime', anime);

export default router;
