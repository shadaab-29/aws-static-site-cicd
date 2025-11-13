#!/bin/bash

# Start MEAN Stack Application Locally
# This script starts MongoDB, Backend, and Frontend in development mode

echo "🚀 Starting MEAN Stack Application..."
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB is not installed. Please install MongoDB first."
    echo "   Visit: https://www.mongodb.com/docs/manual/installation/"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Start MongoDB
echo "📊 Starting MongoDB..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is already running"
else
    mongod --dbpath ~/data/db --fork --logpath ~/data/mongodb.log
    echo "✅ MongoDB started"
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Seed database
echo ""
echo "🌱 Seeding database..."
node scripts/seed.js

# Start backend
echo ""
echo "⚙️  Starting backend server..."
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait for backend to be ready
echo ""
echo "⏳ Waiting for backend to be ready..."
sleep 5

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start frontend
echo ""
echo "🎨 Starting frontend server..."
npm start &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   ✅ MEAN Stack Application Started Successfully     ║"
echo "║                                                       ║"
echo "║   🌐 Frontend:  http://localhost:3001                ║"
echo "║   ⚙️  Backend:   http://localhost:3000                ║"
echo "║   📊 MongoDB:   mongodb://localhost:27017            ║"
echo "║                                                       ║"
echo "║   Press Ctrl+C to stop all services                  ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Wait for user interrupt
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
