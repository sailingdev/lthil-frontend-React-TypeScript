const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}
const generateFont = (variable) => {
  return () => [`var(--${variable})`]
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
      'caption-medium': generateFont('font-caption-medium')
    //   xs: ['12px', '16px'],
    //   sm: ['14px', '20px'],
    //   md: ['14px', '20px'],
    //   l: ['16px', '24px'],
    //  'xl': ['18px', '24px'],
    //  '2xl': ['24px', '32px'],
    //  '3xl': ['30px', '36px'],
    },
    // // TODO
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
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