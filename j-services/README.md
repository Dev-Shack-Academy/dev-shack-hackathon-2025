# Node.js Express Backend - Hackathon Scaffold

Modern Node.js backend with Express and MongoDB

##  Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (via Docker or local installation)

### 1. Start MongoDB

```bash
docker-compose up -d
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
```

### 4. Seed Database

```bash
npm run seed
```

### 5. Start Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:3000`

## Project Structure

```
backend-node/
├── src/
│   ├── index.js              # Entry point
│   ├── lib/
│   │   ├── server.js         # Server setup
│   │   ├── config.js         # Configuration
│   │   ├── logger.js         # Logging (Pino)
│   │   ├── mongodb.js        # Database connection
│   │   └── middleware.js     # Express middleware
│   ├── models/
│   │   └── ItemSchema.js     # Mongoose models
│   ├── services/
│   │   └── ItemService.js    # Business logic
│   ├── routes/
│   │   ├── index.js          # Route aggregator
│   │   └── itemRoutes.js     # Item endpoints
│   └── scripts/
│       └── seed.js           # Database seeding
├── package.json
├── docker-compose.yml
└── .env.example
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Items CRUD
```
GET    /api/items      # List all items
GET    /api/items/:id  # Get single item
POST   /api/items      # Create item
PUT    /api/items/:id  # Update item
DELETE /api/items/:id  # Delete item
```

### Example Request

```bash
# Create item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test description"}'

# Get all items
curl http://localhost:3000/api/items
```

## Architecture

### Based on Dev Shack Academy Patterns

This scaffold follows the same architecture as the Dev Shack app:

1. **Modular Routes** - Routes organized by feature
2. **Service Layer** - Business logic separated from routes
3. **Mongoose Models** - Schema-based data modeling
4. **Middleware Stack** - Security, CORS, rate limiting
5. **Structured Logging** - Pino logger with pretty printing
6. **Configuration Management** - Centralized config

### Key Features

- Express.js server
- MongoDB with Mongoose
- CORS configured for frontend
- Helmet security headers
- Rate limiting
- Request compression
- Structured logging (Pino)
- Auto-reload in development (Nodemon)
- Database seeding script

## Configuration

Edit `.env` file:

```env
PORT=3000
NODE_ENV=development

MONGO_PROTOCOL=mongodb
MONGO_URL=localhost:27017
MONGO_DB_NAME=hackathon_db

ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

LOG_LEVEL=info
RATE_LIMIT_WINDOW_MINS=1
RATE_LIMIT_MAX=1000
```

## Adding New Features

### 1. Create Model

```javascript
// src/models/YourSchema.js
import mongoose from 'mongoose';

const YourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ... your fields
});

export const YourModel = mongoose.model('YourModel', YourSchema);
```

### 2. Create Service

```javascript
// src/services/YourService.js
import { YourModel } from '../models/YourSchema.js';

export class YourService {
  static async getAll() {
    return await YourModel.find();
  }
  // ... your methods
}
```

### 3. Create Routes

```javascript
// src/routes/yourRoutes.js
import express from 'express';
import { YourService } from '../services/YourService.js';

const router = express.Router();

export const yourRoutes = (router) => {
  router.use('/your-resource', router);

  router.get('/', async (req, res) => {
    const data = await YourService.getAll();
    res.json(data);
  });
};
```

### 4. Register Routes

```javascript
// src/routes/index.js
import { yourRoutes } from './yourRoutes.js';

// Add to router
yourRoutes(router);
```

## Frontend Integration

This backend works seamlessly with the React frontend:

### Update Frontend API URL

```env
# frontend/.env
VITE_API_BASE_URL=http://localhost:3000
```

### Frontend Already Configured

The existing frontend `ItemService` will work with this backend:
- Same endpoint structure (`/api/items`)
- Same response format
- CORS already configured

## Testing

```bash
# Run tests
npm test

# Test health endpoint
curl http://localhost:3000/api/health
```

## Troubleshooting

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
docker-compose ps

# Restart MongoDB
docker-compose down
docker-compose up -d
```

### Port Already in Use

```bash
# Change port in .env
PORT=3001
```

### CORS Errors

Make sure `.env` has:
```env
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Pino** - Logging
- **Helmet** - Security
- **CORS** - Cross-origin support
- **Compression** - Response compression
- **Rate Limiting** - API protection

## Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Docs](https://www.mongodb.com/docs/)
- [Pino Logger](https://getpino.io/)

## Ready to Build!

This backend is production-ready for hackathon development. Focus on building features!

**Happy Hacking! **
