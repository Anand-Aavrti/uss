/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--color-border)' /* slate-200 */,
        input: 'var(--color-input)' /* slate-200 */,
        ring: 'var(--color-ring)' /* sky-500 */,
        background: 'var(--color-background)' /* gray-50 */,
        foreground: 'var(--color-foreground)' /* slate-900 */,
        surface: 'var(--color-surface)' /* slate-100 */,
        primary: {
          DEFAULT: 'var(--color-primary)' /* deep-blue-900 */,
          foreground: 'var(--color-primary-foreground)' /* white */,
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)' /* blue-700 */,
          foreground: 'var(--color-secondary-foreground)' /* white */,
        },
        accent: {
          DEFAULT: 'var(--color-accent)' /* sky-500 */,
          foreground: 'var(--color-accent-foreground)' /* white */,
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)' /* red-600 */,
          foreground: 'var(--color-destructive-foreground)' /* white */,
        },
        success: {
          DEFAULT: 'var(--color-success)' /* emerald-600 */,
          foreground: 'var(--color-success-foreground)' /* white */,
        },
        warning: {
          DEFAULT: 'var(--color-warning)' /* amber-600 */,
          foreground: 'var(--color-warning-foreground)' /* white */,
        },
        error: {
          DEFAULT: 'var(--color-error)' /* red-600 */,
          foreground: 'var(--color-error-foreground)' /* white */,
        },
        muted: {
          DEFAULT: 'var(--color-muted)' /* slate-100 */,
          foreground: 'var(--color-muted-foreground)' /* slate-600 */,
        },
        card: {
          DEFAULT: 'var(--color-card)' /* white */,
          foreground: 'var(--color-card-foreground)' /* slate-900 */,
        },
        popover: {
          DEFAULT: 'var(--color-popover)' /* white */,
          foreground: 'var(--color-popover-foreground)' /* slate-900 */,
        },
        brand: {
          primary: 'var(--color-brand-primary)' /* slate-800 */,
          secondary: 'var(--color-brand-secondary)' /* slate-700 */,
        },
        conversion: {
          DEFAULT: 'var(--color-conversion-accent)' /* orange-600 */,
          foreground: 'var(--color-conversion-accent-foreground)' /* white */,
        },
        trust: {
          DEFAULT: 'var(--color-trust-builder)' /* green-600 */,
          foreground: 'var(--color-trust-builder-foreground)' /* white */,
        },
        cta: {
          DEFAULT: 'var(--color-cta)' /* orange-700 */,
          foreground: 'var(--color-cta-foreground)' /* white */,
        },
      },
      fontFamily: {
        sans: [
          'Source Sans 3',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        heading: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '300ms',
        slow: '600ms',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'slide-in-from-top': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-from-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
