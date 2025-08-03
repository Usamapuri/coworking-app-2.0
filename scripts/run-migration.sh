#!/bin/bash

# Ensure we have the required environment variables
if [ -z "$SOURCE_DATABASE_URL" ]; then
    echo "Error: SOURCE_DATABASE_URL is not set"
    exit 1
fi

if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set"
    exit 1
fi

# Run the migration script
echo "Starting data migration..."
npx tsx scripts/migrate-data.ts

# Check if migration was successful
if [ $? -eq 0 ]; then
    echo "Migration completed successfully!"
else
    echo "Migration failed!"
    exit 1
fi