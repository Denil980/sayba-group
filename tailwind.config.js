/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A1715',
          'dark-surface': '#0F211E',
          'dark-card': '#142925',
          'dark-border': '#1F3A35',
          'dark-muted': '#8E9C99',
          cream: '#FAF7F2',
          'cream-surface': '#F4EFE6',
          'cream-card': '#FFFFFF',
          'cream-border': '#E4DDD2',
          'cream-muted': '#7A766F',
          gold: '#C5A467',
          'gold-light': '#DFCA95',
          'gold-hover': '#B59353',
          'gold-dark': '#927339',
          'gold-soft': '#F5EFE3',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(10, 23, 21, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(10, 23, 21, 0.16)',
        'gold-glow': '0 0 25px rgba(197, 164, 103, 0.35)',
      }
    },
  },
  plugins: [],
}
