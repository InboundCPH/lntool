#!/bin/bash

# Print commands as they are executed
set -x

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
npm install

# Start the development server
npm run dev
