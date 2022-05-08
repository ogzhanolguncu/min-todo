import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";
import { sharedAddValidation } from "../../shared/index";

export const todoRouter = createRouter()
  .query("get-all", {
    async resolve({ ctx }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      return await prisma.todo.findMany({
        where: {
          ownerId: userId,
        },
      });
    },
  })
  .mutation("add", {
    input: sharedAddValidation,
    async resolve({ ctx, input }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      const post = await prisma.todo.create({
        data: {
          content: input.content,
          priority: input.priority,
          ownerId: userId,
        },
      });
      return post;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      await prisma.todo.delete({
        where: {
          id_ownerId: {
            id: input.id,
            ownerId: userId,
          },
        },
      });
    },
  })
  .mutation("complete", {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      const todo = await prisma.todo.findUnique({
        where: {
          id_ownerId: {
            id: input.id,
            ownerId: userId,
          },
        },
      });
      await prisma.todo.update({
        where: {
          id_ownerId: {
            id: input.id,
            ownerId: userId,
          },
        },
        data: {
          isCompleted: !todo?.isCompleted
        }
      });
    },
  });
