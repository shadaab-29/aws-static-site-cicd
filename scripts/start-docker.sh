#!/bin/bash

# Start MEAN Stack Application with Docker Compose

echo "🐳 Starting MEAN Stack Application with Docker..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start containers
echo ""
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🏥 Checking service health..."

# Check MongoDB
if docker-compose ps | grep -q "mongodb.*Up"; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start"
fi

# Check Backend
if docker-compose ps | grep -q "backend.*Up"; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start"
fi

# Check Frontend
if docker-compose ps | grep -q "frontend.*Up"; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start"
fi

# Seed database
echo ""
echo "🌱 Seeding database..."
docker-compose exec -T backend node scripts/seed.js

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   ✅ MEAN Stack Application Started Successfully     ║"
echo "║                                                       ║"
echo "║   🌐 Frontend:  http://localhost:3001                ║"
echo "║   ⚙️  Backend:   http://localhost:3000                ║"
echo "║   📊 MongoDB:   mongodb://localhost:27017            ║"
echo "║                                                       ║"
echo "║   View logs:    docker-compose logs -f               ║"
echo "║   Stop:         docker-compose down                  ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
