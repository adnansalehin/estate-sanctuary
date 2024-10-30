import type { Config } from "tailwindcss"
import { themeConfig } from "./lib/theme-config"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: themeConfig.colors.primary.light,
          dark: themeConfig.colors.primary.dark,
        },
        background: {
          DEFAULT: 'var(--background)',
          light: themeConfig.colors.background.light,
          dark: themeConfig.colors.background.dark,
        },
        card: {
          DEFAULT: 'var(--card)',
          light: themeConfig.colors.card.light,
          dark: themeConfig.colors.card.dark,
        },
        text: {
          DEFAULT: 'var(--text)',
          light: themeConfig.colors.text.light,
          dark: themeConfig.colors.text.dark,
        },
        border: {
          DEFAULT: 'var(--border)',
          light: themeConfig.colors.border.light,
          dark: themeConfig.colors.border.dark,
        },
      },
      transitionDuration: {
        DEFAULT: themeConfig.animation.timing.normal,
      },
      transitionTimingFunction: {
        DEFAULT: themeConfig.animation.easing.default,
      },
    },
  },
  plugins: [],
};

// Handle plugin import separately
import("tailwindcss-animate").then((plugin) => {
  config.plugins?.push(plugin.default);
});
export default config