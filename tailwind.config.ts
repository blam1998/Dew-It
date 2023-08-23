import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
      colors:{
        "primary": "#FFB620",
        "black": "#000000",
        "white": "#FFFFFF",
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
