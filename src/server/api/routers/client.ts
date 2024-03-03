import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ClientModel } from "~/server/zod";


export const clientsRouter = createTRPCRouter({
  create: publicProcedure
    .input(ClientModel.omit({
      id: true,
      updatedAt: true,
      createdAt: true
    })).mutation(({ ctx, input }) => {
      return ctx.db.client.create({ data: input })
    }),

  get: publicProcedure
    .input(ClientModel.partial())
    .query(({ ctx, input }) => {

      return ctx.db.client.findMany({
        where: { ...input },
      });
    }),
});
