import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const gamesTable = pgTable("games", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  players: varchar("players", { length: 100 }),
  duration: varchar("duration", { length: 100 }),
  difficulty: varchar("difficulty", { length: 50 }),
  materials: text("materials"),
  steps: text("steps"),
  tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
