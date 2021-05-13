import { Router } from 'express';

import apiV1 from './v1';

const router = Router();

router.get('/', async (_req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

router.use('/api/v1', apiV1);

export default router;
