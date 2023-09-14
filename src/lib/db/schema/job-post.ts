import { relations } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./auth";

export const jobPost = mysqlTable("job_post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  compensation: int("budget"),
  showCompensation: boolean("show_compensation").default(true),
  compensationType: mysqlEnum("compensation_type", [
    "hourly",
    "monthly",
    "yearly",
  ]).default("yearly"),
  isNegotiable: boolean("is_negotiable").default(false),
  maximumNegotiableCompensation: int("maximum_negotiable_compensation"),
  state: mysqlEnum("state", ["draft", "published", "archived"]),
  hiringLeadID: varchar("assignee_id", { length: 255 }),
  projectID: int("project_id").notNull(),
  creatorID: varchar("creator_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const category = mysqlTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 255 }).default("#4f46e5"),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const jobPostRelations = relations(jobPost, ({ many, one }) => ({
  creator: one(users, {
    fields: [jobPost.creatorID],
    references: [users.id],
  }),
  hiringLead: one(users, {
    fields: [jobPost.hiringLeadID],
    references: [users.id],
  }),
  categories: many(jobPostToCategories),
}));

export const jobPostToCategories = mysqlTable(
  "job_post_on_categories",
  {
    jobPostID: int("job_post_id").notNull(),
    categoryID: int("category_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.categoryID, t.jobPostID),
  }),
);

export const jobPostsOnCategoriesRelations = relations(
  jobPostToCategories,
  ({ one }) => ({
    jobPost: one(jobPost, {
      fields: [jobPostToCategories.jobPostID],
      references: [jobPost.id],
    }),
    category: one(category, {
      fields: [jobPostToCategories.categoryID],
      references: [category.id],
    }),
  }),
);
