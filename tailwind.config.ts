import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Azul institucional + variações do degradê do hero
          blue: "#00478F",
          dark: "#002D72",
          darker: "#001A44",
          // Azul mais claro para acentos sobre fundo escuro (modo dark)
          sky: "#4DA3FF",
          // Laranja de destaque / CTA
          orange: "#FF6B35",
          "orange-dark": "#E85A28",
        },
        surface: "#F9FAFB",
        ink: "#1F2937",
        // Paleta do modo escuro (navy alinhado à marca)
        night: {
          DEFAULT: "#0A1426",
          card: "#13213D",
          soft: "#0F1B33",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0, 45, 114, 0.18)",
        card: "0 4px 24px -8px rgba(0, 45, 114, 0.12)",
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
