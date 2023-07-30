/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  extends: [
    'plugin:@next/next/recommended',
  ],
  theme: {
    fontFamily: {
      sans: ['sans-serif'],
      serif: ['Merriweather', 'serif'],
      euclid: ['euclid circular b', 'sans-serif'],
    },
    extend: {
      colors: {
        chatdetailmodal: "#F8F8F8"
      },  
      zIndex: {
        panel: "10",
        dropdown: "30",
        homenav: "100",
        modal: "200",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "lofi",
    ],
  },
}
