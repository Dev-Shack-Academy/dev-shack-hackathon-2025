import express from 'express';
import { ItemService } from '../services/ItemService.js';
import { logger } from '../lib/logger.js';

const itemRouter = express.Router();

export const itemRoutes = (router) => {
  router.use('/items', itemRouter);

  // GET all items
  itemRouter.get('/', async (req, res) => {
    try {
      const items = await ItemService.getAll();
      res.status(200).json(items);
    } catch (err) {
      logger.error('Failed to get items:', err);
      res.status(500).json({
        error: 'Failed to get items',
        message: err.message,
      });
    }
  });

  // GET item by ID
  itemRouter.get('/:id', async (req, res) => {
    try {
      const item = await ItemService.get(req.params.id);
      res.status(200).json(item);
    } catch (err) {
      logger.error(`Failed to get item ${req.params.id}:`, err);
      res.status(err.message === 'Item not found' ? 404 : 500).json({
        error: 'Failed to get item',
        message: err.message,
      });
    }
  });

  // POST new item
  itemRouter.post('/', async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name || !description) {
        return res.status(400).json({
          error: 'Validation error',
          message: 'Name and description are required',
        });
      }

      const item = await ItemService.create({ name, description });
      res.status(201).json(item);
    } catch (err) {
      logger.error('Failed to create item:', err);
      res.status(500).json({
        error: 'Failed to create item',
        message: err.message,
      });
    }
  });

  // PUT update item
  itemRouter.put('/:id', async (req, res) => {
    try {
      const { name, description } = req.body;
      const item = await ItemService.update(req.params.id, {
        name,
        description,
      });
      res.status(200).json(item);
    } catch (err) {
      logger.error(`Failed to update item ${req.params.id}:`, err);
      res.status(err.message === 'Item not found' ? 404 : 500).json({
        error: 'Failed to update item',
        message: err.message,
      });
    }
  });

  // DELETE item
  itemRouter.delete('/:id', async (req, res) => {
    try {
      await ItemService.delete(req.params.id);
      res.status(200).json({
        message: `Item ${req.params.id} deleted successfully`,
      });
    } catch (err) {
      logger.error(`Failed to delete item ${req.params.id}:`, err);
      res.status(err.message === 'Item not found' ? 404 : 500).json({
        error: 'Failed to delete item',
        message: err.message,
      });
    }
  });
};
