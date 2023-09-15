import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  creatorId: varchar("creator_id", { length: 255 }).notNull(),
  startDate: timestamp("start_date", {
    fsp: 5,
  }),
  endDate: timestamp("end_date", {
    fsp: 5,
  }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),

  /**
   * TODO: whenever drizzle updates the `onUpdateNow` function change it here
   */
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
  creator: one(users, {
    fields: [projects.creatorId],
    references: [users.id],
  }),
  members: many(projectsToUsers),
}));

export const projectsToUsers = mysqlTable(
  "projects_to_users",
  {
    projectId: int("project_id").notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.projectId, t.userId),
  }),
);

export const projectToUsersRelations = relations(
  projectsToUsers,
  ({ one }) => ({
    user: one(users, {
      fields: [projectsToUsers.userId],
      references: [users.id],
    }),
    project: one(projects, {
      fields: [projectsToUsers.projectId],
      references: [projects.id],
    }),
  }),
);
