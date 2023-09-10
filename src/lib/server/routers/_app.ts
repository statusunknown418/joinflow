import { router } from "../trpc";
import { computersRouter } from "./computers";
import { userRouter } from "./user";

export const appRouter = router({
  computers: computersRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
