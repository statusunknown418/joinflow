import { relations } from "drizzle-orm";
import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { jobPosting } from "./job-posting";

export const department = mysqlTable("department", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  color: varchar("color", { length: 255 }).default("#4f46e5"),
  icon: varchar("icon", { length: 255 }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const departmentsRelations = relations(department, ({ many }) => ({
  jobPostings: many(jobPosting),
}));
