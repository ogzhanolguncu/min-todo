import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";
import { sharedAddValidation } from "../../shared/index";

export const todoRouter = createRouter()
  .query("get-all", {
    async resolve() {
      return await prisma.todo.findMany();
    },
  })
  .mutation("add", {
    input: sharedAddValidation,
    async resolve({ input }) {
      const post = await prisma.todo.create({
        data: {
          content: input.content,
          priority: input.priority,
        },
      });
      return post;
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ input }) {
      await prisma.todo.delete({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("complete", {
    input: z.object({
      id: z.string().nonempty(),
    }),
    async resolve({ input }) {
      await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: true,
        },
      });
    },
  });
