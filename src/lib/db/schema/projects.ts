import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  creatorID: varchar("creator_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),

  /**
   * TODO: whenever drizzle updates the `onUpdateNow` function change it here
   */
});
