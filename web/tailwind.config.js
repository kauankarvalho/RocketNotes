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
      "gray-950": "#131319",
      "gray-900": "#232129",
      "gray-800": "#312E38",
      "gray-700": "#3E3B47",
      "gray-600": "#666360",
      "gray-500": "#999591",
    },
    extend: {
      keyframes: {
        bgModalOpen: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        modalOpen: {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        bgModalOpen: "bgModalOpen 0.4s",
        modalOpen: "modalOpen 0.4s",
      },
    },
  },
  plugins: [],
}
