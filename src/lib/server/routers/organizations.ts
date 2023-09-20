import { db } from "@/lib/db";
import {
  addMemberSchema,
  createOrganizationSchema,
  organizationToUsers,
  organizations,
} from "@/lib/db/schema/organizations";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const organizationsRouter = router({
  new: protectedProcedure
    .input(createOrganizationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { session } = ctx;

        const insertIntoTable = await db.insert(organizations).values({
          ...input,
          approxSizeUpTo: Number(input.approxSizeUpTo),
          ownerId: session.user.id,
        });

        const createRelation = await db.insert(organizationToUsers).values({
          organizationId: Number(insertIntoTable.insertId),
          userId: session.user.id,
          accessLevel: "admin",
        });

        return {
          organization: insertIntoTable,
          relation: createRelation,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error creating your organization",
        });
      }
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    const allOrgs = await db.query.organizations.findMany({
      where: (o, { eq }) => eq(o.ownerId, session.user.id),
    });

    return allOrgs;
  }),
  addMember: protectedProcedure
    .input(addMemberSchema)
    .mutation(async ({ input }) => {
      try {
        const createRelation = await db
          .insert(organizationToUsers)
          .values(input);

        return {
          success: true,
          added: createRelation,
        };
      } catch (error) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "This user is already a member of this organization",
        });
      }
    }),
  updateMemberAccessLevel: protectedProcedure
    .input(addMemberSchema)
    .mutation(async ({ input }) => {
      const updateRelation = await db
        .update(organizationToUsers)
        .set({
          accessLevel: input.accessLevel,
        })
        .where(eq(organizationToUsers.organizationId, input.organizationId))
        .where(eq(organizationToUsers.userId, input.userId));

      return {
        success: true,
        updated: updateRelation,
      };
    }),

  checkSlug: protectedProcedure.input(z.string()).query(async ({ input }) => {
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
