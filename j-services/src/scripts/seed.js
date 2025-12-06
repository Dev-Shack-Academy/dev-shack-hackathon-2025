import mongoose from 'mongoose';
import { Item } from '../models/ItemSchema.js';
import config from '../lib/config.js';
import { logger } from '../lib/logger.js';

const sampleItems = [
  {
    name: 'Sample Item 1',
    description: 'This is the first sample item for testing the API',
  },
  {
    name: 'Sample Item 2',
    description: 'This is the second sample item with more details',
  },
  {
    name: 'Sample Item 3',
    description: 'This is the third sample item for demonstration purposes',
  },
  {
    name: 'Hackathon Project',
    description: 'A full-stack application built during the hackathon',
  },
  {
    name: 'API Integration',
    description: 'Example of frontend-backend communication',
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const { protocol, username, password, url, database } = config.mongo;
    let connectionString;
    if (username && password) {
      connectionString = `${protocol}://${username}:${password}@${url}/${database}`;
    } else {
      connectionString = `${protocol}://${url}/${database}`;
    }

    await mongoose.connect(connectionString);
    logger.info('Connected to MongoDB');

    // Clear existing items
    await Item.deleteMany({});
    logger.info('Cleared existing items');

    // Insert sample items
    const items = await Item.insertMany(sampleItems);
    logger.info(`Seeded ${items.length} items`);

    // Display created items
    items.forEach((item) => {
      logger.info(`- ${item.name} (ID: ${item._id})`);
    });

    logger.info('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
