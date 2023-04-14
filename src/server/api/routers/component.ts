import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// TODO: Add user same-user authentication
export const componentRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.component.findMany({
        where: {
          id: input.id,
        },
      });
    }),

  getAllForDocument: publicProcedure
    .input(z.object({ documentId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.component.findMany({
        where: {
          documentId: input.documentId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        documentId: z.number(),
        header: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.component.create({
        data: {
          documentId: input.documentId,
          header: input.header,
          content: input.content,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        header: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.component.update({
        where: {
          id: input.id,
        },
        data: {
          header: input.header,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.component.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
