import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // "primary-background": "#EFEDE3",
        "primary-background": "#FFFFFF",
        "primary-text": "#3D3929",
        "primary-button": "#BA5B38",
        lavender: "#FEC5FB",

        // gsap color code
        "link-lime": "#0AE448",
        "link-orenge": "#FF8709",
        "primary-dark-text": "#FFFCE1",
        "paragraph-dark": "#BBBAA6",
        "primary-dart-background": "#0E100F",
      },
      fontFamily: {
        Copernicus: ["Copernicus"],
        Charter: ["Charter"],
        Mori: ["Mori-Regular"],
        MoriSemiBold: ["Mori-SemiBold"],
      },
    },
  },
  plugins: [],
};
export default config;
