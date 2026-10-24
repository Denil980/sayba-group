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
          dark: '#141515',
          'dark-surface': '#1C1E1E',
          'dark-card': '#232626',
          'dark-border': '#323635',
          'dark-muted': '#8E9695',
          cream: '#F7FAFA',
          'cream-surface': '#EFF3F2',
          'cream-card': '#FFFFFF',
          'cream-border': '#DCE1DF',
          'cream-muted': '#68706F',
          teal: '#80B3AD',
          'teal-light': '#CBE5E1',
          'teal-hover': '#609A93',
          'teal-dark': '#366D67',
          'teal-soft': '#EDF6F5',
          gray: '#B3B3B3',
          'gray-light': '#E2E5E4',
          'gray-dark': '#7A807F',
          gold: '#80B3AD',
          'gold-light': '#CBE5E1',
          'gold-hover': '#609A93',
          'gold-dark': '#366D67',
          'gold-soft': '#EDF6F5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(20, 21, 21, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(20, 21, 21, 0.16)',
        'teal-glow': '0 0 25px rgba(128, 179, 173, 0.35)',
        'gold-glow': '0 0 25px rgba(128, 179, 173, 0.35)',
      }
    },
  },
  plugins: [],
}
