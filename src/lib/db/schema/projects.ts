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
import { organizations } from "./organizations";

export const projects = mysqlTable("projects", {
  id: serial("id").primaryKey(),
  identifier: varchar("identifier", { length: 30 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  creatorID: varchar("creator_id", { length: 255 }).notNull(),
  organizationID: int("organization_id"),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),

  /**
   * TODO: whenever drizzle updates the `onUpdateNow` function add it here
   */
});

export const projectToMembers = mysqlTable(
  "project_to_members",
  {
    projectId: int("project_id").notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.projectId, t.userId),
  }),
);

export const projectRelations = relations(projects, ({ many, one }) => ({
  members: many(users),
  organization: one(organizations, {
    fields: [projects.organizationID],
    references: [organizations.id],
  }),
  creator: one(users, {
    references: [users.id],
    fields: [projects.creatorID],
  }),
}));

export const projectToMembersRelations = relations(
  projectToMembers,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectToMembers.projectId],
      references: [projects.id],
    }),
    member: one(users, {
      fields: [projectToMembers.userId],
      references: [users.id],
    }),
  }),
);
