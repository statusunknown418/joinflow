import { relations } from "drizzle-orm";
import {
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { jobPosting } from "./job-posting";

export const applicant = mysqlTable("applicant", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }),
  location: varchar("location", { length: 255 }),
  linkedin: varchar("linkedin", { length: 255 }),
  github: varchar("github", { length: 255 }),
  portfolio: varchar("portfolio", { length: 255 }),
  resume: varchar("resume", { length: 255 }),
  coverLetter: varchar("cover_letter", { length: 500 }),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

export const applicantRelations = relations(applicant, ({ many }) => ({
  jobsAppliedTo: many(applicantsToJobPostings),
}));

export const applicantsToJobPostings = mysqlTable(
  "applicant_to_job_posting",
  {
    applicantId: int("applicant_id").notNull(),
    jobPostingId: int("job_posting_id").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.applicantId, t.jobPostingId),
  }),
);

export const applicantsToJobPostingsRelations = relations(
  applicantsToJobPostings,
  ({ one }) => ({
    applicant: one(applicant, {
      fields: [applicantsToJobPostings.applicantId],
      references: [applicant.id],
    }),
    jobPosting: one(jobPosting, {
      fields: [applicantsToJobPostings.jobPostingId],
      references: [jobPosting.id],
    }),
  }),
);
