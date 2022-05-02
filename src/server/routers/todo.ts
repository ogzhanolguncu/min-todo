import { prisma } from "@app/db/client";
import { createRouter } from "../context";

export const todoRouter = createRouter().query("get-all-todos", {
	async resolve() {
		return await prisma.todo.findMany();
	},
});
