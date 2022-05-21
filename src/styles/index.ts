import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "hsl(10deg 33% 87%)",
      },
    },
  },
  fonts: {
    body: `Cabin, serif`,
    heading: `Cabin, serif`,
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
});

export default customTheme;
