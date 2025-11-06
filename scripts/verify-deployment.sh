#!/bin/bash
echo "🚀 Verifying deployment..."

# Kill any existing preview servers
pkill -f "vite preview" 2>/dev/null || true

# Check if build succeeds
echo "📦 Building project..."
if ! npm run build; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful"

# Start preview in background
echo "🌐 Starting preview server..."
npm run preview &

# Wait for server to start
echo "⏳ Waiting for server to start..."
sleep 8

# Test if server is responding
echo "🔍 Testing server response..."
if curl -f http://localhost:4173 > /dev/null 2>&1; then
    echo "✅ Preview server is running correctly"
    # Kill the preview server
    pkill -f "vite preview"
    exit 0
else
    echo "❌ Preview server failed to start"
    # Kill the preview server
    pkill -f "vite preview"
    exit 1
fi
