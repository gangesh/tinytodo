module.exports = {
  // add this section
  purge: [
    './src/**/*.html',
    './src/**/*.svelte'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    groupLevel: 10,
    groupScope: "scope",
    groupVariants: ["hover", "focus"],
    container: {
      center: true,
      padding: '1em'
    },
    extend: {
      height: {
        'items': 'calc(100vh - 230px)',
      }
    },
    colors: {
      white: {
        DEFAULT: '#fff'
      },
      black: {
        DEFAULT: '#000',
        lighter: '#2a2e37'
      },
      yellow: {
        DEFAULT: 'goldenrod'
      },
      orange: {
        DEFAULT: '#ff7700'
      },
      red: {
        DEFAULT: '#A52A2A',
        lighter: '#ff3333'
      },
      blue: {
        DEFAULT: '#b5d5ff',
        darker: '#3377ff'
      },
      gray: {
        DEFAULT: '#fbfbfb',
        dark: '#ededed',
        darkest: '#ccc'
      },
      green: {
       DEFAULT: '#008000',
      }
    },
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1000px',
    },
    fontFamily: {
      default: ['Arial','Helvetica Neue','helvetica','sans-serif'],
    }
  },
  variants: {
    extend: {
      'display': ['group-hover']
    },
  },
  plugins: [
    require("tailwindcss-nested-groups")
  ],
}