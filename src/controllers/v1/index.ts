import { Router } from 'express';

import search from './search';
import popular from './popular';
import recent from './recent';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/search', search);
router.use('/popular', popular);
router.use('/recent', recent);

export default router;
