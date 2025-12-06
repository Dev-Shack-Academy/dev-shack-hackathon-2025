import express from 'express';
import config from '../lib/config.js';
import { itemRoutes } from './itemRoutes.js';
import { logger } from '../lib/logger.js';

export default () => {
  const router = express.Router();

  // Health check endpoint
  if (config.routes.health) {
    router.get('/health', (req, res) => {
      res.status(200).json({
        status: 'ok',
        message: 'pong',
        timestamp: new Date().toISOString(),
      });
    });
  }

  // Items routes
  if (config.routes.items) {
    logger.info('Loading items routes...');
    itemRoutes(router);
  }

  return router;
};
