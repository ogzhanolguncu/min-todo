import { z } from "zod";
import { createRouter } from "../createRouter";
import { prisma } from "../prisma";
import { sharedAddValidation } from "../../shared/index";
import { EmailScheduler } from "../../utils/scheduler";
import dayjs from "dayjs";

export const todoRouter = createRouter()
  .query("get-all", {
    input: z.object({
      sortBy: z.enum(["asc", "desc"]).default("asc"),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      return prisma.todo.findMany({
        where: {
          ownerId: userId,
        },
        orderBy: {
          priority: input.sortBy,
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      todoId: z.string().nonempty(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      return prisma.todo.findUnique({
        where: {
          id: input.todoId,
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
          isCompleted: !todo?.isCompleted,
        },
      });
    },
  })
  .mutation("set-reminder", {
    input: z.object({
      userEmail: z.string().email().nonempty(),
      todoId: z.string().nonempty(),
      reminderTime: z.enum(["30M", "1H", "2H", "3H", "4H"]),
    }),
    async resolve({ input }) {
      const todo = await prisma.todo.update({
        where: {
          id: input.todoId,
        },
        data: {
          reminderScheduled: true,
          reminderCreatedAt: dayjs().toDate(),
          reminderTime: dayjs()
            .add(Number(input.reminderTime.split("H")[0]), "hour")
            .toDate(),
        },
      });
      if (!todo) return;
      EmailScheduler(
        input.userEmail,
        todo?.content,
        input.reminderTime,
        todo.id
      );
      return {
        message: `Reminder will be sent ${input.reminderTime} later.`,
      };
    },
  })
  .mutation("delete-all", {
    async resolve({ ctx }) {
      const userId = ctx.req?.auth?.userId;
      if (!userId) return;

      await prisma.todo.deleteMany({
        where: {
          ownerId: userId,
        },
      });
    },
  });
