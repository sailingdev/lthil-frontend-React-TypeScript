const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}
const generateFont = (variable) => {
  return [`var(--fontsize-${variable})`, `var(--lineheight-${variable})`]
}

module.exports = {
  purge: [],
  darkMode: 'media', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'],
    },
    fontSize: {
      'mobile-medium': generateFont('caption-medium'),
      'caption-medium': generateFont('caption-medium'),
      'body2-regular': generateFont('body2-regular'),
      'body2-bold': generateFont('body2-bold'),
      'body1-regular': generateFont('body1-regular'),
      'button-medium': generateFont('button-medium'),
      'body1-bold': generateFont('body1-bold'),
      'input-text': generateFont('input-text'),
      'heading2': generateFont('heading2'),
      'heading1': generateFont('heading1'),
    },
    colors: {
      primary: {
        DEFAULT: generateColorClass('primary'),
        100: generateColorClass('primary-100'),
        200: generateColorClass('primary-200'),
        300: generateColorClass('primary-300'),
        400: generateColorClass('primary-400'),
      },
      secondary: {
        DEFAULT: generateColorClass('secondary'),
        100: generateColorClass('secondary-100'),
        200: generateColorClass('secondary-200'),
        300: generateColorClass('secondary-300'),
        400: generateColorClass('secondary-400'),
      },
      font: {
        DEFAULT: generateColorClass('font'),
        100: generateColorClass('font-100'),
        200: generateColorClass('font-200'),
      },
      error: {
        DEFAULT:  generateColorClass('primary-error'),
      },
      success: {
        DEFAULT:  generateColorClass('primary-success'),
      },
      action: {
        DEFAULT:  generateColorClass('primary-action'),
      },
      warning: {
        DEFAULT:  generateColorClass('primary-warning'),
      },
      'warning-light': {
        DEFAULT:  generateColorClass('primary-warning-light'),
      },
      white: {
        DEFAULT:  '#FFFFFF',
        100: '#F2F5F6',
        200: '#E7EAEB',
        300: '#E2E5E5',
        400: '#4E5F71'
      },
      // TODO ADD BLACK
      // black: {
      //   DEFAULT: 
      // }
    },
    extend: {
      maxWidth: {
        1920: '1920px'
      },
      screens: {
        'tablet': '480px',
        'desktop': '1024px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}