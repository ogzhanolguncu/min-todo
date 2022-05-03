import React from "react";
import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "@app/server/routers";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "@app/styles";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== "undefined") {
      return {
        url: "/api/trpc",
      };
    }

    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      "Cache-Control",
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );

    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      headers: {
        "x-ssr": "1",
      },
    };
  },
  ssr: false,
})(MyApp);
