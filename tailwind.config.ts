
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom colors
        'soft-purple': '#E5DEFF',
        'primary-purple': '#9b87f5',
        'secondary-purple': '#7E69AB',
        'dark-purple': '#1A1F2C',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
