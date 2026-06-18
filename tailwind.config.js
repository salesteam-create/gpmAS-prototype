/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Performance-lab dark palette
        base: "#08090D",
        ink: {
          900: "#0B0D12",
          800: "#0F121A",
          700: "#141822",
          600: "#1A1F2B",
          500: "#232A38",
        },
        line: "rgba(255,255,255,0.07)",
        line2: "rgba(255,255,255,0.12)",
        fg: {
          DEFAULT: "#EDF0F5",
          muted: "#9AA2B4",
          dim: "#646B7D",
        },
        // Electric lime — energy / signature accent
        volt: {
          DEFAULT: "#C6F24E",
          400: "#D4F86F",
          500: "#C6F24E",
          600: "#A9D62E",
          glow: "rgba(198,242,78,0.45)",
        },
        // Secondary — cool plasma
        plasma: {
          DEFAULT: "#5B8CFF",
          500: "#5B8CFF",
          600: "#3F6FE6",
        },
        viol: "#9A7BFF",
        good: "#3FD79A",
        warn: "#FBBF3C",
        bad: "#FF5E6C",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(198,242,78,0.4), 0 0 32px -4px rgba(198,242,78,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.8)",
        float: "0 32px 64px -32px rgba(0,0,0,0.9)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        "radial-volt":
          "radial-gradient(60% 60% at 50% 0%, rgba(198,242,78,0.12) 0%, transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(198,242,78,0.5)" },
          "100%": { boxShadow: "0 0 0 12px rgba(198,242,78,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
