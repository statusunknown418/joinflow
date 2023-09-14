import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./auth";
import { projectToMembers, projects } from "./projects";

export const organizations = mysqlTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  handle: varchar("handle", { length: 255 }).notNull().unique(),
  plan: mysqlEnum("plan", ["free", "scaler", "enterprise", "custom"])
    .notNull()
    .default("free"),
  ownerId: varchar("admin_id", { length: 255 }).notNull().unique(),
  avatarURL: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export type OrganizationType = typeof organizations.$inferInsert;
export type CreateOrganizationType = z.infer<typeof createOrganizationSchema>;
export const createOrganizationSchema = createInsertSchema(organizations, {
  name: (s) =>
    s.name.min(3, {
      message: "The organization name needs to be at least 3 character long 💀",
    }),
  plan: (s) => s.plan.optional().default("free"),
})
  .omit({
    id: true,
    ownerId: true,
    createdAt: true,
  })
  .required();

export const organizationRelation = relations(
  organizations,
  ({ many, one }) => ({
    owner: one(users, {
      fields: [organizations.ownerId],
      references: [users.id],
    }),
    members: many(users),
    projects: many(projects),
  }),
);

export const usersRelation = relations(users, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [users.id],
    references: [organizations.ownerId],
  }),
  projects: many(projectToMembers),
}));
