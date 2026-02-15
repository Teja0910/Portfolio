#!/bin/bash

echo "🎬 Starting Netflix Portfolio - MERN Stack"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
echo "Checking MongoDB connection..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client && npm install && cd ..
fi

echo ""
echo "✅ All dependencies installed!"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Backend Server: http://localhost:5000"
echo "Frontend App: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend and frontend concurrently
trap 'kill 0' EXIT

npm start &
cd client && npm start &

wait
