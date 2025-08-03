#!/bin/bash

# Set environment variables
export SOURCE_DATABASE_URL="postgresql://neondb_owner:npg_wCFyWTu89lRS@ep-restless-sky-adhvsezj.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
export DATABASE_URL="postgresql://postgres:UlEaxEjpJevoZwyviUmjPSYLkWvrppvy@tramway.proxy.rlwy.net:20042/railway"

# Run database migration
echo "Running database schema migration..."
npm run db:push

# Run data migration
echo "Migrating data from Replit to Railway..."
npx tsx scripts/migrate-data.ts

# Verify migration
echo "Migration completed. Please verify the data in Railway."