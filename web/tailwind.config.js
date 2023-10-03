export default {
  content: ["./src/pages/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
  safelist: ["pl-[1.5rem]", "pl-[5.2rem]"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      roboto_slab: ["Roboto Slab", "serif"],
    },
    colors: {
      transparent: "transparent",
      white: "#F4EDE8",
      orange: "#FF9000",
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
