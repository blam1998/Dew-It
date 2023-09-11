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
    fontSize:{
      "heading1-bold":[
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],

      "heading1-semibold":[
        "36px",
        {
          lineHeight: "140%",
          fontWeight: "550",
        }
      ],

      "heading2-bold":[
        "28px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],

      "heading2-semibold":[
        "28px",
        {
          lineHeight: "140%",
          fontWeight: "550",
        }
      ],

      "heading3-bold":[
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],

      "heading3-semibold":[
        "20px",
        {
          lineHeight: "140%",
          fontWeight: "550",
        }
      ],

      "body-bold":[
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "700",
        }
      ],

      "body-semibold":[
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "550",
        }
      ],

      "body-medium":[
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        }
      ],

      "body-normal":[
        "16px",
        {
          lineHeight: "140%",
          fontWeight: "400",
        }
      ],


    },
    extend: {
      colors: {
        "primary": "#101012",
        "secondary": "#FFB620",
        "black": "#000000",
        "white": "#FFFFFF",
        "dark-blue": "#070747",
        "gray": "#808080",
        "dark-red": "#FF0000",
        "light-gray": "#faf5f5",
        "dark-green": "#04D213",
        "dark-1": "#000000",
        "dark-2": "#121417",
        "dark-3": "#101012",
        "dark-4": "#1F1F22",
        "primary-500": "#877EFF",
        glassmorphism: "rgba(16, 16, 18, 0.60)",
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
      },
      screens: {
        xsm: "600px",
        md: "1350px",
        sm: "1050px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}