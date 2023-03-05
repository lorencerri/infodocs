import { publicProcedure } from "./../trpc";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const documentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.document.findMany();
  }),

  getOwn: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.document.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        hidden: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.create({
        data: {
          title: input.title,
          description: input.description,
          hidden: input.hidden,
          userId: ctx.session.user.id,
        },
      });
    }),
});
