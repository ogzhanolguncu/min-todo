import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers";
import { createContext } from "../../../server/context";
import { withAuth } from "@clerk/nextjs/api";

export default withAuth(
  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    onError({ error }) {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error("Something went wrong", error);
      }
    },

    batching: {
      enabled: true,
    },
  })
);
