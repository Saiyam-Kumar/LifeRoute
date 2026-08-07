/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D12",
        "ink-soft": "#454A52",
        "ink-faint": "#8A8F98",

        canvas: "#FAFAF8",
        "canvas-dim": "#F1EFE8",

        panel: "#0F1218",
        "panel-raised": "#161A22",

        line: "#22252E",
        "line-soft": "rgba(255,255,255,0.08)",

        route: "#FF5A36",
        "route-dim": "#5A2317",

        signal: "#7C8CF5",
      },

      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },

      letterSpacing: {
        tightest: "-0.04em",
      },

      keyframes: {
        travel: {
          "0%": { offsetDistance: "0%", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { offsetDistance: "100%", opacity: "0" },
        },

        "pulse-soft": {
          "0%,100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.55",
            transform: "scale(0.85)",
          },
        },

        "drift-grid": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" },
        },

        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },
      },

      animation: {
        travel: "travel 3.6s linear infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "drift-grid": "drift-grid 6s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

