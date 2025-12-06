import { Item } from '../models/ItemSchema.js';
import { logger } from '../lib/logger.js';

export class ItemService {
  static async getAll() {
    try {
      const items = await Item.find().sort({ created_at: -1 });
      return items;
    } catch (error) {
      logger.error('Error getting all items:', error);
      throw error;
    }
  }

  static async get(id) {
    try {
      const item = await Item.findById(id);
      if (!item) {
        throw new Error('Item not found');
      }
      return item;
    } catch (error) {
      logger.error(`Error getting item ${id}:`, error);
      throw error;
    }
  }

  static async create(data) {
    try {
      const item = new Item(data);
      await item.save();
      logger.info(`Item created: ${item._id}`);
      return item;
    } catch (error) {
      logger.error('Error creating item:', error);
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const item = await Item.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        throw new Error('Item not found');
      }
      logger.info(`Item updated: ${item._id}`);
      return item;
    } catch (error) {
      logger.error(`Error updating item ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        throw new Error('Item not found');
      }
      logger.info(`Item deleted: ${id}`);
      return item;
    } catch (error) {
      logger.error(`Error deleting item ${id}:`, error);
      throw error;
    }
  }
}
