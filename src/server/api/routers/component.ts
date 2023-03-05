import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ComponentType } from "@prisma/client";

export const componentRoute = createTRPCRouter({
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
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        documentId: z.number(),
        type: z.nativeEnum(ComponentType),
        data: z.union([
          z.object({ title: z.string(), text: z.string() }),
          z.object({
            title: z.string(),
            video: z.string(),
          }),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.component.create({
        data: {
          documentId: input.documentId,
          type: input.type,
          data: input.data,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.nativeEnum(ComponentType),
        data: z.union([
          z.object({ title: z.string(), text: z.string() }),
          z.object({
            title: z.string(),
            video: z.string(),
          }),
        ]),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.component.update({
        where: {
          id: input.id,
        },
        data: {
          type: input.type,
          data: input.data,
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
