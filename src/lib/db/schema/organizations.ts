import { relations } from "drizzle-orm";
import {
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./auth";

export const organizations = mysqlTable("organizations", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  handle: varchar("handle", { length: 255 }).notNull().unique(),
  plan: mysqlEnum("plan", ["free", "scaler", "enterprise", "custom"])
    .notNull()
    .default("free"),
  ownerId: varchar("admin_id", { length: 255 }).notNull(),
  avatarURL: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const organizationToUsers = mysqlTable(
  "organization_to_users",
  {
    organizationId: int("organization_id").notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.organizationId, t.userId),
  }),
);

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

/**
 * ========== MANY-TO-MANY relations for organizations and users ==========
 */
export const organizationRelation = relations(
  organizations,
  ({ many, one }) => ({
    owner: one(users, {
      fields: [organizations.ownerId],
      references: [users.id],
    }),
    members: many(organizationToUsers),
  }),
);

export const usersRelation = relations(users, ({ many }) => ({
  organizations: many(organizationToUsers),
}));

export const organizationToUsersRelation = relations(
  organizationToUsers,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [organizationToUsers.organizationId],
      references: [organizations.id],
    }),
    user: one(users, {
      fields: [organizationToUsers.userId],
      references: [users.id],
    }),
  }),
);
