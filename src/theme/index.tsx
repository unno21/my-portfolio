const htmlFontSize: number = 16;
const colors = {
  white: '#FFFFFF',
  black: '#000000',
  accent: '#D73C2E',
  gray: {
    '1000': '#0c0a09',
    '900': '#1c1917',
    '800': '#292524',
    '700': '#44403c',
    '600': '#57534e',
    '500': '#78716c',
    '400': '#a8a29e',
    '300': '#d6d3d1',
    '200': '#e7e5e4',
    '100': '#f5f5f4',
    '50': '#fafaf9',
  },
};
const fontWeights = {
  light: '300',
  normal: '500',
  semibold: '600',
  bold: '700',
};
const spacing = {
  2: '2px',
  4: '.25rem',
  6: '.375rem',
  8: '.5rem',
  12: '.75rem',
  14: '.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  32: '2rem',
  36: '2.25rem',
  40: '2.5rem',
  48: '3rem',
  52: '3.25rem',
  56: '3.5rem',
  60: '3.75rem',
  64: '4rem',
  72: '4.5rem',
  80: '5rem',
  92: '5.75rem',
  96: '6rem',
  112: '7rem',
  120: '7.5rem',
  128: '8rem',
  160: '10rem',
};
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};
const theme = {
  htmlFontSize,
  colors,
  fontFamily: 'Inter, sans-serif',
  fontHeading: 'Acma',
  fontWeights,
  spacing,
  breakpoints,
  containerMaxWidth: '1440px',
  pxToRem: (px: number): string => `${px / htmlFontSize}rem`,
};

export type ThemeType = typeof theme;
export default theme;
