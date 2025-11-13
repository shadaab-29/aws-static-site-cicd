# MEAN Stack Backend API

Three-tier architecture backend API built with Node.js, Express.js, and MongoDB.

## Features

- RESTful API endpoints
- MongoDB integration with Mongoose ODM
- User management (CRUD operations)
- Analytics data management
- Error handling middleware
- CORS configuration
- Security headers with Helmet
- Request logging with Morgan
- Health check endpoint

## Prerequisites

- Node.js 18+ (Node.js 22 recommended)
- MongoDB (local installation or MongoDB Atlas)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your MongoDB URI
```

## Running the Application

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Seeding the Database

```bash
node scripts/seed.js
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Analytics
- `GET /api/analytics` - Get all analytics
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/type/:type` - Get analytics by type
- `POST /api/analytics` - Create analytics entry
- `DELETE /api/analytics/:id` - Delete analytics entry

## Environment Variables

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/meanstack
FRONTEND_URL=http://localhost:3001
API_VERSION=v1
```

## Testing with curl

```bash
# Health check
curl http://localhost:3000/api/health

# Get all users
curl http://localhost:3000/api/users

# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}'

# Get analytics
curl http://localhost:3000/api/analytics
```
