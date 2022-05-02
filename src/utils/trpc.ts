import { AppRouter } from "@app/server/routers";
import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryOutput<TRouteKey extends keyof AppRouter["_def"]["queries"]> =
	inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
