import { createComputer } from "@/lib/api/computers/mutations";
import { getComputers } from "@/lib/api/computers/queries";
import { insertComputerSchema } from "@/lib/db/schema/computers";
import { publicProcedure, router } from "../trpc";

export const computersRouter = router({
  getComputers: publicProcedure.query(async () => {
    return getComputers();
  }),
  new: publicProcedure
    .input(insertComputerSchema)
    .mutation(async ({ input }) => {
      return await createComputer(input);
    }),
});
