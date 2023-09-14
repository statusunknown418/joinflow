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
import { projects } from "./projects";

export const jobPosting = mysqlTable("job_posting", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  budget: int("budget"),
  showCompensation: boolean("show_compensation").default(true),
  compensationType: mysqlEnum("compensation_type", [
    "hourly",
    "fixed",
    "monthly",
    "yearly",
  ]),
  hasExtraBenefits: boolean("has_extra_benefits").default(false),
  extraBenefits: varchar("extra_benefits", { length: 255 }),
  isNegotiable: boolean("is_negotiable").default(true),
  maximumBudget: int("maximum_budget"),
  state: mysqlEnum("state", ["draft", "published", "archived"]),
  hiringLeadId: varchar("hiring_lead_id", { length: 255 }),
  creatorId: varchar("creator_id", { length: 255 }).notNull(),
  onProjectId: int("on_project_id").notNull(),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const jobPostingRelations = relations(jobPosting, ({ one, many }) => ({
  categories: many(jobPostingToCategories),
  creator: one(users, {
    fields: [jobPosting.creatorId],
    references: [users.id],
  }),
  hiringLead: one(users, {
    fields: [jobPosting.hiringLeadId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [jobPosting.onProjectId],
    references: [projects.id],
  }),
}));

export const category = mysqlTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  color: varchar("color", { length: 255 }).default("#4f46e5"),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const jobPostingToCategories = mysqlTable(
  "job_posting_on_categories",
  {
    jobPostingId: int("job_posting_id").notNull(),
    categoryId: int("category_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.jobPostingId, t.categoryId),
  }),
);

export const jobPostingToCategoriesRelations = relations(
  jobPostingToCategories,
  ({ one }) => ({
    jobPosting: one(jobPosting, {
      fields: [jobPostingToCategories.jobPostingId],
      references: [jobPosting.id],
    }),
    category: one(category, {
      fields: [jobPostingToCategories.categoryId],
      references: [category.id],
    }),
  }),
);
