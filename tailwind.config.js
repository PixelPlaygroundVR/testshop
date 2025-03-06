/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        quantum: {
          blue: "#4F46E5",
          purple: "#7E22CE",
          cyan: "#06B6D4",
          pink: "#DB2777",
          green: "#10B981",
          yellow: "#FBBF24",
          red: "#EF4444",
          dark: "#0F172A",
        },
        neon: {
          blue: "#00F0FF",
          purple: "#8A2BE2",
          pink: "#FF00FF",
          green: "#39FF14",
          yellow: "#FFFF00",
        },
        cyber: {
          dark: "#0c0c14",
          light: "#1a1a2e",
          accent: "#2a2a4e",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "hologram": {
          "0%": { opacity: "0.5", filter: "hue-rotate(0deg)" },
          "25%": { opacity: "0.7", filter: "hue-rotate(90deg)" },
          "50%": { opacity: "0.9", filter: "hue-rotate(180deg)" },
          "75%": { opacity: "0.7", filter: "hue-rotate(270deg)" },
          "100%": { opacity: "0.5", filter: "hue-rotate(360deg)" },
        },
        "quantum-flicker": {
          "0%, 100%": { opacity: 1 },
          "33%": { opacity: 0.7 },
          "66%": { opacity: 0.9 },
          "77%": { opacity: 0.2 },
          "88%": { opacity: 0.8 },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "data-glitch": {
          "0%, 100%": { transform: "translateX(0)" },
          "5%, 15%, 25%, 35%, 45%": { transform: "translateX(-2px)" },
          "10%, 20%, 30%, 40%": { transform: "translateX(2px)" },
          "50%, 55%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%": { transform: "translateX(0)" },
        },
        "neon-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px #00f3ff, 0 0 10px #00f3ff, 0 0 15px #00f3ff, 0 0 20px #00f3ff"
          },
          "50%": {
            boxShadow: "0 0 10px #00f3ff, 0 0 20px #00f3ff, 0 0 30px #00f3ff, 0 0 40px #00f3ff"
          }
        },
        "cyber-float": {
          "0%, 100%": {
            transform: "translateY(0) rotate(0deg)"
          },
          "25%": {
            transform: "translateY(-5px) rotate(1deg)"
          },
          "50%": {
            transform: "translateY(0) rotate(0deg)"
          },
          "75%": {
            transform: "translateY(5px) rotate(-1deg)"
          }
        },
        "deal-flash": {
          "0%, 100%": {
            backgroundColor: "transparent"
          },
          "50%": {
            backgroundColor: "rgba(0, 255, 102, 0.1)"
          }
        },
        "upvote-bounce": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-5px)"
          }
        },
        "price-drop": {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg)" },
          "50%": { transform: "translateY(2px) rotate(5deg)" },
        },
        "radar-scan": {
          "0%": {
            transform: "rotate(0deg)",
            opacity: 0.3
          },
          "100%": {
            transform: "rotate(360deg)",
            opacity: 0.1
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "quantum-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px 2px rgba(79, 70, 229, 0.3)" },
          "50%": { boxShadow: "0 0 20px 5px rgba(79, 70, 229, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 4s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "hologram": "hologram 5s linear infinite",
        "quantum-flicker": "quantum-flicker 3s ease-in-out infinite",
        "scan": "scan 2s ease-in-out infinite",
        "data-glitch": "data-glitch 1s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "cyber-float": "cyber-float 6s ease-in-out infinite",
        "deal-flash": "deal-flash 3s ease-in-out infinite",
        "upvote-bounce": "upvote-bounce 0.5s ease-in-out",
        "price-drop": "price-drop 1s ease-in-out infinite",
        "radar-scan": "radar-scan 4s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "quantum-pulse": "quantum-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        'cyber-grid': "url('/images/cyber-grid.svg')",
        'circuit': "url('/images/circuit-pattern.svg')",
        'scan-lines': "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 2px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 