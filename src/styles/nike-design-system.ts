/**
 * Nike Training Club Design System
 * Professional color palette, typography, and spacing constants
 */

export const nikeColors = {
  // Primary Colors
  black: '#000000',
  white: '#FFFFFF',

  // Accent Colors (use sparingly for CTAs)
  accent: {
    orange: '#FF6B35',
    orangeHover: '#E55A20',
    blue: '#00D4FF',
    blueHover: '#00BADB',
    pink: '#FF006E',
    pinkHover: '#E60059',
  },

  // Neutrals
  neutral: {
    lightGray: '#F5F5F5',
    mediumGray: '#E5E5E5',
    darkGray: '#1A1A1A',
    charcoal: '#262626',
  },

  // Text
  text: {
    light: '#000000', // On light backgrounds
    dark: '#FFFFFF',  // On dark backgrounds
    secondary: '#999999',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

export const nikeTypography = {
  // Font stack - bold and powerful
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Courier New", monospace',
  },

  // Font sizes
  fontSize: {
    // Headings - BOLD and LARGE
    h1: { size: '48px', md: '64px', lg: '72px', weight: 900, lineHeight: 1.1 },
    h2: { size: '36px', md: '48px', lg: '56px', weight: 800, lineHeight: 1.2 },
    h3: { size: '24px', md: '32px', lg: '40px', weight: 700, lineHeight: 1.3 },
    h4: { size: '20px', md: '24px', lg: '28px', weight: 700, lineHeight: 1.4 },

    // Body text - never light
    body: { size: '16px', md: '18px', weight: 500, lineHeight: 1.6 },
    bodyLarge: { size: '18px', md: '20px', weight: 600, lineHeight: 1.6 },
    bodySm: { size: '14px', weight: 600, lineHeight: 1.5 },
    bodyXs: { size: '12px', weight: 600, lineHeight: 1.5 },

    // Buttons
    button: { size: '16px', weight: 700, lineHeight: 1.5 },
    buttonLg: { size: '18px', weight: 800, lineHeight: 1.5 },
    buttonSm: { size: '14px', weight: 700, lineHeight: 1.4 },
  },

  // Font weights - always bold
  fontWeight: {
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
};

export const nikeSpacing = {
  // Spacing grid (8px based)
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  '5xl': '96px',
};

export const nikeEffects = {
  // Shadows - minimal
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px 0 rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px 0 rgba(0, 0, 0, 0.15)',
  },

  // Transitions - quick and snappy
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },

  // Border radius - minimal rounding
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  // Blur effects
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(20px)',
  },
};

export const nikeBreakpoints = {
  mobile: '375px',
  mobileLg: '425px',
  tablet: '768px',
  desktop: '1024px',
  desktopLg: '1280px',
  desktopXl: '1536px',
};

// Utility function for responsive values
export const responsive = {
  padding: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
  gap: {
    mobile: '12px',
    tablet: '16px',
    desktop: '24px',
  },
};

// Export as Tailwind config compatible
export const tailwindConfig = {
  colors: {
    black: nikeColors.black,
    white: nikeColors.white,
    orange: nikeColors.accent.orange,
    blue: nikeColors.accent.blue,
    pink: nikeColors.accent.pink,
    gray: {
      100: nikeColors.neutral.lightGray,
      500: nikeColors.neutral.mediumGray,
      900: nikeColors.neutral.darkGray,
    },
  },
  fontSize: {
    h1: [nikeTypography.fontSize.h1.size, { fontWeight: nikeTypography.fontSize.h1.weight }],
    h2: [nikeTypography.fontSize.h2.size, { fontWeight: nikeTypography.fontSize.h2.weight }],
    h3: [nikeTypography.fontSize.h3.size, { fontWeight: nikeTypography.fontSize.h3.weight }],
    base: [nikeTypography.fontSize.body.size, { fontWeight: nikeTypography.fontSize.body.weight }],
  },
  spacing: nikeSpacing,
};
