module.exports = {
  // add this section
  purge: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '1em'
    },
    extend: {
      height: {
        'items': 'calc(100vh - 252px)',
      }
    },
    colors: {
      blue: {
        DEFAULT: '#b5d5ff',
      },
      gray: {
        DEFAULT: '#fbfbfb',
        dark: '#ededed',
        darkest: '#ccc'
      }
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1000px',
    },
    fontFamily: {
      sans: ['Helvetica Neue','helvetica','arial','sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}