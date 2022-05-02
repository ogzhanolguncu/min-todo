import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
	return { res: opts?.res, req: opts?.req };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
	return trpc.router<Context>();
}
