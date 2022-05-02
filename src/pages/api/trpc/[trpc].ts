import { createContext } from "@app/server/context";
import { appRouter } from "@app/server/routers";
import * as trpcNext from "@trpc/server/adapters/next";

// export API handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: createContext,
});
