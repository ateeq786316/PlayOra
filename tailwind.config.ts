import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        // PlayOra Brand Colors mapped from CSS variables
        primary: {
          DEFAULT: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)"
        },
        textLight: "var(--color-text-light)",
        accentGold: "var(--color-accent-gold)",
        neutralDark: "var(--color-neutral-dark)",
        
        // Extended theme colors
        background: {
          DEFAULT: "var(--color-background)",
          secondary: "var(--color-background-secondary)"
        },
        text: {
          DEFAULT: "var(--color-text-primary)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)"
        },
        border: "var(--color-border)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        
        // Legacy shadcn colors for compatibility
        foreground: "var(--color-text-primary)",
        card: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-text-primary)",
        },
        popover: {
          DEFAULT: "var(--color-background)",
          foreground: "var(--color-text-primary)",
        },
        secondary: {
          DEFAULT: "var(--color-background-secondary)",
          foreground: "var(--color-text-primary)",
        },
        muted: {
          DEFAULT: "var(--color-background-secondary)",
          foreground: "var(--color-text-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-accent-gold)",
          foreground: "var(--color-text-primary)",
        },
        destructive: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-text-light)",
        },
        input: "var(--color-border)",
        ring: "var(--color-primary-light)",
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)', 
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'green': 'var(--shadow-green)',
        'gold': 'var(--shadow-gold)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'normal': 'var(--transition-normal)',
        'slow': 'var(--transition-slow)',
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "bounce-in": {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
      },
      screens: {
        'xs': '320px',
        'sm': '360px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
