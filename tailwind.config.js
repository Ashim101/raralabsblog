/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './node_modules/@raralabs/components/esm/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@raralabs/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-animate')],

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  presets: [require('@raralabs/components').base],
};