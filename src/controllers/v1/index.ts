import { Router } from 'express';

import search from './search';
import popular from './popular';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/search', search);
router.use('/popular', popular);

export default router;
