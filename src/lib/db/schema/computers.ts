import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const computers = mysqlTable("computers", {
  id: varchar("id", { length: 36 }).notNull().primaryKey(),
  brand: varchar("brand", { length: 256 }).notNull(),
  cores: int("cores").notNull(),
});

// Schema for CRUD - used to validate API requests
// NOTE: Create IDs either in the client or server
export const insertComputerSchema = createInsertSchema(computers).required();
export const selectComputerSchema = createSelectSchema(computers);
export const computerIdSchema = selectComputerSchema.pick({ id: true });
export const updateComputerSchema = selectComputerSchema;

export type NewComputer = z.infer<typeof insertComputerSchema>;
export type Computer = z.infer<typeof selectComputerSchema>;
export type ComputerId = z.infer<typeof computerIdSchema>["id"];
