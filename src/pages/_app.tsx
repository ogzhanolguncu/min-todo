import { AppType } from "next/dist/shared/lib/utils";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import superjson from "superjson";

import { AppRouter } from "@app/server/routers/_app";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
};

function getBaseUrl() {
	if (process.browser) {
		return "";
	}

	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === "development" ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			transformer: superjson,
		};
	},
	ssr: true,

	responseMeta({ clientErrors }) {
		if (clientErrors.length) {
			return {
				status: clientErrors[0].data?.httpStatus ?? 500,
			};
		}

		return {};
	},
})(MyApp);
