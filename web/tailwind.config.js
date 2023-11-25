export default {
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  safelist: [
    "pl-[1.5rem]",
    "pl-[5.2rem]",
    "border-dashed",
    "border-gray-600",
    "w-[48%]",
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      roboto_slab: ["Roboto Slab", "serif"],
    },
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#F4EDE8",
      orange: "#FF9000",
      red: "#FF002E",
      "gray-900": "#232129",
      "gray-800": "#312E38",
      "gray-700": "#3E3B47",
      "gray-600": "#666360",
      "gray-500": "#999591",
    },
    extend: {},
  },
  plugins: [],
}
