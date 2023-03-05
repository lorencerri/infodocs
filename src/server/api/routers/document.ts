import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const documentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.document.findMany();
  }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.document.findMany({
        where: {
          id: input.id,
        },
      });
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

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        hidden: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.document.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          hidden: input.hidden,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.document.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
