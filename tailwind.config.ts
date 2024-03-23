import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightSalmon: "#F0BB9B",
        rosyBrown: "#9E8172",
        lightBrown: "#D1C1B5",
        goldenRod: "#BF9848",
        maroon: "#8B4542",
        thistle: "#71606B",
      },
    },
  },
  plugins: [],
};
export default config;
