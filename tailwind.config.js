/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: 'Roboto_400Regular',
        title: 'Roboto_700Bold',
        alt: 'BaiJamjuree_700Bold',
      },
      colors: {
        gray: {
          50: '#EAEAEA',
          100: '#BEBEBF',
          200: '#9E9EA0',
          300: '#727275',
          400: '#56565A',
          500: '#2C2C31',
          600: '#28282D',
          700: '#1F1F23',
          800: '#18181B',
          900: '#121215',
        },
        purple: {
          50: '#F3EEFc',
          100: '#D8CBF7',
          200: '#C6B2F3',
          300: '#AB8EEE',
          400: '#9B79EA',
          500: '#8257E5',
          600: '#764FD0',
          700: '#5C3EA3',
          800: '#48307E',
          900: '#372560',
        },
        green: {
          50: '#e6fbef',
          100: '#b1f1ce',
          200: '#8cebb6',
          300: '#57e295',
          400: '#36dc81',
          500: '#04d361',
          600: '#04c058',
          700: '#039645',
          800: '#027435',
          900: '#025929',
        },
      },
    },
  },
  plugins: [],
}
