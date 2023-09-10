import { router } from "../trpc";
import { computersRouter } from "./computers";
import { organizationsRouter } from "./organizations";
import { userRouter } from "./user";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
  organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;
