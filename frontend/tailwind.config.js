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

        "ecg-scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-800px)",
          },
        },

        "heartbeat-glow": {
          "0%, 100%": {
            opacity: "0.58",
            transform: "scaleY(1)",
            filter:
              "drop-shadow(0 0 3px rgba(255,90,138,0.35)) drop-shadow(0 0 10px rgba(124,140,245,0.25))",
          },

          "48%": {
            opacity: "0.62",
            transform: "scaleY(1)",
          },

          "50%": {
            opacity: "1",
            transform: "scaleY(1.28)",
            filter:
              "drop-shadow(0 0 7px rgba(255,90,138,0.75)) drop-shadow(0 0 18px rgba(124,140,245,0.45))",
          },

          "53%": {
            opacity: "0.62",
            transform: "scaleY(1)",
          },
        },

        "heartbeat-ripple": {
          "0%": {
            transform: "scale(0.35)",
            opacity: "0",
          },

          "3%": {
            transform: "scale(0.7)",
            opacity: "0.35",
          },

          "8%": {
            transform: "scale(1.7)",
            opacity: "0",
          },

          "100%": {
            transform: "scale(0.35)",
            opacity: "0",
          },
        },



        "ecg-pulse": {
          "0%": {
            transform: "scaleY(1)",
          },

          "3%": {
            transform: "scaleY(1.35)",
          },

          "8%": {
            transform: "scaleY(1)",
          },

          "100%": {
            transform: "scaleY(1)",
          },
        },
        "center-heartbeat": {
          "0%, 92%, 100%": {
            transform: "scale(0.65)",
            opacity: "0",
          },
          "94%": {
            transform: "scale(0.8)",
            opacity: "0.35",
          },
          "97%": {
            transform: "scale(1.45)",
            opacity: "0",
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

