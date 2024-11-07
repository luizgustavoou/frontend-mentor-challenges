/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        red: 'hsl(14, 86%, 42%)',
        'red-200': 'hsl(14, 86%, 62%)',
        'red-300': 'hsl(14, 86%, 72%)',
        green: 'hsl(159, 69%, 38%)',
        'rose-50': 'hsl(20, 50%, 98%)',
        'rose-100': 'hsl(13, 31%, 94%)',
        'rose-300': 'hsl(14, 25%, 72%)',
        'rose-400': 'hsl(7, 20%, 60%)',
        'rose-500': 'hsl(12, 20%, 44%)',
        'rose-900': 'hsl(14, 65%, 9%)',
      },
    },
  },
  plugins: [],
}
