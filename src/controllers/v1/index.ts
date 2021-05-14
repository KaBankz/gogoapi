import { Router } from 'express';

import search from './search';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/search', search);

export default router;
