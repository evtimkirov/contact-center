#!/bin/sh
# Install dependencies if node_modules missing
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start webpack dev server
npm run start
