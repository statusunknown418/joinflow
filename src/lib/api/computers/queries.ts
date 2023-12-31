import { db } from "@/lib/db";
import {
  ComputerId,
  computerIdSchema,
  computers,
} from "@/lib/db/schema/computers";
import { desc, eq } from "drizzle-orm";

export const getComputers = async () => {
  const c = await db
    .select()
    .from(computers)
    .orderBy(desc(computers.createdAt));
  return c;
};

export const getComputerById = async (id: ComputerId) => {
  const { id: computerId } = computerIdSchema.parse({ id });
  const [c] = await db
    .select()
    .from(computers)
    .where(eq(computers.id, computerId));

  return { computer: c };
};
