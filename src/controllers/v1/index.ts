import { Router } from 'express';

import emojis from './emojis';
import search from './search';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/search', search);

export default router;
