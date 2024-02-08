import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ClientModel } from "~/server/zod";

export const createClientInput = ClientModel.omit({ id: true, updatedAt: true, createdAt: true })

export const clientsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createClientInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.client.create({ data: input })
    }),

  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.db.client.findMany();
    }),

  getByPhone: publicProcedure
    .input(ClientModel.pick({ phone: true }))
    .query(({ ctx, input }) => {
      return ctx.db.client.findFirst({ where: { phone: input.phone } })
    }),

  getByEmail: publicProcedure
    .input(ClientModel.pick({ email: true }))
    .query(({ ctx, input }) => {
      return ctx.db.client.findFirst({ where: { email: input.email } })
    })
});
