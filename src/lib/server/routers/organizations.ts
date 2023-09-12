import { db } from "@/lib/db";
import {
  createOrganizationSchema,
  organizationToUsers,
  organizations,
} from "@/lib/db/schema/organizations";
import { eq } from "drizzle-orm";
import { z } from "zod";
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
  checkSlug: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const slug = await db
        .select()
        .from(organizations)
        .where(eq(organizations.handle, input));

      if (slug.length > 0) {
        const generateRecommendedSlug = `${input}-${new Date().getTime()}`;

        return {
          available: false,
          recommended: generateRecommendedSlug,
        };
      }

      return {
        available: true,
        recommended: null,
      };
    }),
});
