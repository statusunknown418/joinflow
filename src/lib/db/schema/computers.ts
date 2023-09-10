import { createId } from "@paralleldrive/cuid2";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const computers = mysqlTable("computers", {
  id: varchar("id", { length: 36 }).notNull().$defaultFn(createId).primaryKey(),
  brand: varchar("brand", { length: 256 }).notNull(),
  cores: int("cores").notNull(),
  createdAt: timestamp("created_at", {
    fsp: 5,
  }).defaultNow(),
});

// Schema for CRUD - used to validate API requests
// NOTE: ONLY CREATE IDs IN THE SERVER
export const insertComputerSchema = createInsertSchema(computers)
  .omit({ createdAt: true, id: true })
  .required();
export const selectComputerSchema = createSelectSchema(computers);
export const computerIdSchema = selectComputerSchema.pick({ id: true });
export const updateComputerSchema = selectComputerSchema;

export type NewComputer = z.infer<typeof insertComputerSchema>;
export type Computer = z.infer<typeof selectComputerSchema>;
export type ComputerId = z.infer<typeof computerIdSchema>["id"];
