# MEAN Stack Frontend

React.js frontend application for the three-tier MEAN stack architecture.

## Features

- Modern React.js application
- User management interface (CRUD operations)
- Analytics dashboard with real-time data
- Responsive design
- API integration with backend
- Error handling and loading states

## Prerequisites

- Node.js 18+ (Node.js 22 recommended)
- Backend API running on port 3000

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will start on http://localhost:3001

## Environment Variables

```
REACT_APP_API_URL=http://localhost:3000/api
PORT=3001
```

## Available Pages

- **Dashboard**: Overview of system status and analytics summary
- **Users**: User management with CRUD operations
- **Analytics**: Analytics metrics visualization and management

## API Integration

The frontend communicates with the backend API through the `services/api.js` module, which provides:

- User management endpoints
- Analytics data endpoints
- Health check endpoint
- Error handling

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.
