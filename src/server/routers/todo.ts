import { createRouter } from "../createRouter";

export const todoRouter = createRouter().query("hello", {
	async resolve({ ctx }) {
		return {
			greeting: `hello`,
		};
	},
});
