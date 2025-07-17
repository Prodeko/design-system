const plugin = require('tailwindcss/plugin')
// const defaultTheme = require('tailwindcss/defaultTheme')
const faces = require('./src/font-faces.js')
const cssColors = require('./src/color-variables.js')

module.exports = plugin.withOptions(
    () =>
        function ({ addBase, addUtilities, addVariant, theme }) {
            const fontUtils = {
                // body: Raleway, normal case, normal spacing
                '.font-normal': {
                    'font-family': theme('fontFamily.raleway'),
                    'font-weight': theme('fontWeight.normal'),
                    'letter-spacing': '0em',
                },
                // headings: Raleway SemiBold, Kiikkilä Spacing ≈ 0.2em
                '.font-heading': {
                    'font-family': theme('fontFamily.raleway'),
                    'font-weight': theme('fontWeight.semibold'),
                    'letter-spacing': '0.2em',
                },
                // logos: uppercase, Raleway ExtraBold, Kiikkilä Spacing ≈ 0.5em
                '.font-logo': {
                    'text-transform': 'uppercase',
                    'font-family': theme('fontFamily.raleway'),
                    'font-weight': theme('fontWeight.bold'),
                    'letter-spacing': '0.5em',
                },
            }

            addBase({
                /**
                 * Set up default fonts
                 */
                '@font-face': faces,
                html: {
                    'font-family': theme('fontFamily.raleway'),
                    'font-weight': theme('fontWeight.normal'),
                    'letter-spacing': '0em',
                },
                /**
                 * Set default background-color and text color
                 */
                body: {
                    'background-color': 'hsl(var(--background))',
                    'color': 'hsl(var(--foreground))',
                },
                /**
                 * Makes sure all elements that have a border,
                 * have the correct border-color.
                 */
                '*': {
                    'border-color': 'hsl(var(--color-border) / var(--border-opacity))',
                    'outline-color': 'hsl(var(--color-ring) / var(--outline-opacity))'
                },
                /**
                 * Note that cssColors has keys :root and .dark 
                 * so don't accidentally override them here.
                 */
                ...cssColors,
            })

            /**
             * font utilities
             */
            addUtilities(fontUtils, ['responsive', 'hover'])

            /**
             * Defines the variant
             *   @custom-variant dark(&:is(.dark *));
             * as implemented in shadcn reference globals.css.
             * This helps tailwind with dark mode compilation.
             */
            addVariant('dark', '&:is(.dark *)')
        },
    () => ({
        theme: {
            extend: {
                fontFamily: {
                    raleway: "Raleway",
                },
                colors: {
                    prodeko: {
                        'white-50': '#f6f6f6',
                        'white-100': '#ececec',
                        light: '#0053a0',
                        medium: '#002e7d',
                        DEFAULT: '#002e7d',
                        dark: '#002851',
                        black: '#000A14'
                    },

                    background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    card: {
                        DEFAULT: 'hsl(var(--card))',
                        foreground: 'hsl(var(--card-foreground))',
                    },
                    popover: {
                        DEFAULT: 'hsl(var(--popover))',
                        foreground: 'hsl(var(--popover-foreground))',
                    },
                    primary: {
                        DEFAULT: 'hsl(var(--primary))',
                        foreground: 'hsl(var(--primary-foreground))',
                    },
                    secondary: {
                        DEFAULT: 'hsl(var(--secondary))',
                        foreground: 'hsl(var(--secondary-foreground))',
                    },
                    muted: {
                        DEFAULT: 'hsl(var(--muted))',
                        foreground: 'hsl(var(--muted-foreground))',
                    },
                    accent: {
                        DEFAULT: 'hsl(var(--accent))',
                        foreground: 'hsl(var(--accent-foreground))',
                    },
                    destructive: 'hsl(var(--destructive))',
                    border: 'hsl(var(--border))',
                    input: 'hsl(var(--input))',
                    ring: 'hsl(var(--ring))',

                    chart: {
                        1: 'hsl(var(--chart-1))',
                        2: 'hsl(var(--chart-2))',
                        3: 'hsl(var(--chart-3))',
                        4: 'hsl(var(--chart-4))',
                        5: 'hsl(var(--chart-5))',
                    },
                    sidebar: {
                        DEFAULT: 'hsl(var(--sidebar))',
                        foreground: 'hsl(var(--sidebar-foreground))',
                        primary: {
                            DEFAULT: 'hsl(var(--sidebar-primary))',
                            foreground: 'hsl(var(--sidebar-primary-foreground))',
                        },
                        accent: {
                            DEFAULT: 'hsl(var(--sidebar-accent))',
                            foreground: 'hsl(var(--sidebar-accent-foreground))',
                        },
                        border: 'hsl(var(--sidebar-border))',
                        ring: 'hsl(var(--sidebar-ring))',
                    }
                },
                borderRadius: {
                    xl: 'calc(var(--radius) + 4px)',
                    lg: 'var(--radius)',
                    md: 'calc(var(--radius) - 2px)',
                    sm: 'calc(var(--radius) - 4px)',
                }
            }
        }
    })
)