import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";

export const todoRouter = createRouter()
  .query("get-all-todos", {
    async resolve() {
      return await prisma.todo.findMany();
    },
  })
  .mutation("add-todo", {
    input: z.object({
      content: z.string().min(1).max(100),
      priority: z.enum(["GREEN", "RED", "ORANGE"]),
    }),
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
  .mutation("delete-todo", {
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
  });
