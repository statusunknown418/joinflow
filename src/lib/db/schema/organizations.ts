import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const organizations = mysqlTable("organizations", {
  id: varchar("id", { length: 36 }).notNull().$defaultFn(createId).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  handle: varchar("handle", { length: 255 }).notNull().unique(),
  plan: mysqlEnum("plan", ["free", "scaler", "enterprise", "custom"])
    .notNull()
    .default("free"),
  ownerId: varchar("admin_id", { length: 36 }).notNull().unique(),
  avatarURL: varchar("avatar", { length: 255 }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const organizationToUsers = mysqlTable(
  "organization_to_users",
  {
    organizationId: varchar("organization_id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.organizationId, t.userId),
  })
);

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
  })
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
  })
);
