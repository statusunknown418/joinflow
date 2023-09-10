import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { eq } from "drizzle-orm";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  updateOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    await db
      .update(users)
      .set({
        isOnboard: true,
      })
      .where(eq(users.id, ctx.session.user.id));

    return {
      success: true,
    };
  }),
});
