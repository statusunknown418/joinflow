import { db } from "@/lib/db";
import {
  createOrganizationSchema,
  organizationToUsers,
  organizations,
} from "@/lib/db/schema/organizations";
import slugify from "slugify";
import { protectedProcedure, router } from "../trpc";

export const organizationsRouter = router({
  new: protectedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const { name } = input;

      const insertIntoTable = await db.insert(organizations).values({
        name,
        ownerId: session.user.id,
        handle: slugify(name),
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
