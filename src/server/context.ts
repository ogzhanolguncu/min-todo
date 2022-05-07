import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest } from "next/types";

export type optsWithAuth = Omit<trpcNext.CreateNextContextOptions, "req"> & {
  req: NextApiRequest & { auth?: { userId: string } };
};

export async function createContext(opts?: optsWithAuth) {
  return {
    req: opts?.req,
    res: opts?.res,
  };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;
