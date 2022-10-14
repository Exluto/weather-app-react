/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderColor: theme => ({
        DEFAULT: theme('colors.gray.300', 'currentColor'), 'neon' : '#ccff00'
      }),
      backgroundColor: theme => ({
        'neon' : '#ccff00'
      })
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar')
  ]
}