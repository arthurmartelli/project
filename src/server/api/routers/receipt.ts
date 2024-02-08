import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ReceiptModel } from "~/server/zod";


export const receiptRouter = createTRPCRouter({
    create: publicProcedure
        .input(ReceiptModel.omit({
            id: true,
            updatedAt: true,
            createdAt: true,

            clientId: true,
            clientPhone: true
        }))
        .mutation(async ({ ctx, input }) => {
            const client = await ctx.db.client.findFirst({
                where: { email: input.clientEmail },
            })

            if (client == null) return undefined

            return ctx.db.receipt.create({
                data: {
                    ...input,
                    clientId: client.id,
                    clientEmail: client.email,
                }
            })
        }),

    getAll: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.receipt.findMany();
        }),

    getFromClientEmail: publicProcedure
        .input(ReceiptModel.pick({ clientEmail: true }))
        .query(({ ctx, input }) => {
            return ctx.db.receipt.findMany({
                where: { clientEmail: input.clientEmail },
            });
        }),
});
