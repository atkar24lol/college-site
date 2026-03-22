/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratBlack: ['Montserrat', 'sans-serif'],
        montserratSemibold: ['Montserrat', 'sans-serif'],
        montserratTitle: ['Montserrat', 'Open Sans', 'sans-serif'],
      },
      fontWeight: {
        black: 800,
        semibold: 600,
        title: 900,
      },
      boxShadow: {
        soft: '0 2px 24px rgba(0, 0, 0, 0.06)',
        nav: '0 1px 0 rgba(0, 0, 0, 0.06), 0 4px 24px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
