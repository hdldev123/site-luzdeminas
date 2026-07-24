import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Verde institucional + variações do degradê do hero.
          // Amostrado das telas reais do app (header #153727, cards #24533F).
          green: "#24533F",
          dark: "#153727",
          darker: "#0C2118",
          // Verde claro para acentos sobre fundo escuro (modo dark)
          leaf: "#6FD69B",
          // Laranja de destaque / CTA
          orange: "#FF6B35",
          "orange-dark": "#E85A28",
        },
        surface: "#F9FAFB",
        ink: "#1F2937",
        // Paleta do modo escuro (verde profundo alinhado à marca)
        night: {
          DEFAULT: "#0A1712",
          card: "#13291F",
          soft: "#0F1F17",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(21, 55, 39, 0.22)",
        card: "0 4px 24px -8px rgba(21, 55, 39, 0.16)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
