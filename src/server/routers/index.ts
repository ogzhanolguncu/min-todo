import superjson from "superjson";
import { createRouter } from "../context";
import { todoRouter } from "./todo";

export const appRouter = createRouter().transformer(superjson).merge(todoRouter);

export type AppRouter = typeof appRouter;
