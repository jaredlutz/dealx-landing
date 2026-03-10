import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const contentBlocks = pgTable("content_blocks", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 100 }).notNull(),
  blockKey: varchar("block_key", { length: 100 }).notNull(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorSource: varchar("author_source", { length: 255 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
