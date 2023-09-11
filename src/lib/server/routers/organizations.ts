import { db } from "@/lib/db";
import {
  createOrganizationSchema,
  organizationToUsers,
  organizations,
} from "@/lib/db/schema/organizations";
import { protectedProcedure, router } from "../trpc";

export const organizationsRouter = router({
  new: protectedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;

      const insertIntoTable = await db.insert(organizations).values({
        ...input,
        ownerId: session.user.id,
      });

      const createRelation = await db.insert(organizationToUsers).values({
        organizationId: Number(insertIntoTable.insertId),
        userId: session.user.id,
      });

      return {
        organization: insertIntoTable,
        relation: createRelation,
      };
    }),
});
