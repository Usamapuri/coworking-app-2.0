import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../shared/schema';

// Source (Replit) database connection
const sourceClient = postgres(process.env.SOURCE_DATABASE_URL!);
const sourceDb = drizzle(sourceClient, { schema });

// Destination (Railway) database connection
const destClient = postgres(process.env.DATABASE_URL!);
const destDb = drizzle(destClient, { schema });

async function migrateData() {
  try {
    // Migrate organizations first (no dependencies)
    const organizations = await sourceDb.select().from(schema.organizations);
    if (organizations.length > 0) {
      await destDb.insert(schema.organizations).values(organizations);
      console.log(`✓ Migrated ${organizations.length} organizations`);
    }

    // Migrate users (depends on organizations)
    const users = await sourceDb.select().from(schema.users);
    if (users.length > 0) {
      await destDb.insert(schema.users).values(users);
      console.log(`✓ Migrated ${users.length} users`);
    }

    // Migrate menu categories
    const menuCategories = await sourceDb.select().from(schema.menu_categories);
    if (menuCategories.length > 0) {
      await destDb.insert(schema.menu_categories).values(menuCategories);
      console.log(`✓ Migrated ${menuCategories.length} menu categories`);
    }

    // Migrate menu items (depends on menu categories)
    const menuItems = await sourceDb.select().from(schema.menu_items);
    if (menuItems.length > 0) {
      await destDb.insert(schema.menu_items).values(menuItems);
      console.log(`✓ Migrated ${menuItems.length} menu items`);
    }

    // Migrate meeting rooms
    const meetingRooms = await sourceDb.select().from(schema.meeting_rooms);
    if (meetingRooms.length > 0) {
      await destDb.insert(schema.meeting_rooms).values(meetingRooms);
      console.log(`✓ Migrated ${meetingRooms.length} meeting rooms`);
    }

    // Migrate meeting bookings (depends on users, meeting rooms, and organizations)
    const meetingBookings = await sourceDb.select().from(schema.meeting_bookings);
    if (meetingBookings.length > 0) {
      await destDb.insert(schema.meeting_bookings).values(meetingBookings);
      console.log(`✓ Migrated ${meetingBookings.length} meeting bookings`);
    }

    // Migrate cafe orders (depends on users and organizations)
    const cafeOrders = await sourceDb.select().from(schema.cafe_orders);
    if (cafeOrders.length > 0) {
      await destDb.insert(schema.cafe_orders).values(cafeOrders);
      console.log(`✓ Migrated ${cafeOrders.length} cafe orders`);
    }

    // Migrate cafe order items (depends on cafe orders and menu items)
    const cafeOrderItems = await sourceDb.select().from(schema.cafe_order_items);
    if (cafeOrderItems.length > 0) {
      await destDb.insert(schema.cafe_order_items).values(cafeOrderItems);
      console.log(`✓ Migrated ${cafeOrderItems.length} cafe order items`);
    }

    // Migrate announcements
    const announcements = await sourceDb.select().from(schema.announcements);
    if (announcements.length > 0) {
      await destDb.insert(schema.announcements).values(announcements);
      console.log(`✓ Migrated ${announcements.length} announcements`);
    }

    console.log('✓ Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    await sourceClient.end();
    await destClient.end();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData().catch(console.error);
}

export { migrateData };