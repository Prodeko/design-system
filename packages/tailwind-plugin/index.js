const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const faces = require('./font-faces.js')

module.exports = plugin.withOptions(
    () =>
        function ({ addBase, addUtilities, theme }) {
            const fontUtils = {
                // body: Raleway, normal case, normal spacing
                '.font-normal': {
                    fontFamily: theme('fontFamily.raleway'),
                    fontWeight: theme('fontWeight.normal'),
                    letterSpacing: '0em',
                },
                // headings: Raleway SemiBold, Kiikkilä Spacing ≈ 0.2em
                '.font-heading': {
                    fontFamily: theme('fontFamily.raleway'),
                    fontWeight: theme('fontWeight.semibold'),
                    letterSpacing: '0.2em',
                },
                // logos: uppercase, Raleway ExtraBold, Kiikkilä Spacing ≈ 0.5em
                '.font-logo': {
                    textTransform: 'uppercase',
                    fontFamily: theme('fontFamily.raleway'),
                    fontWeight: theme('fontWeight.bold'),
                    letterSpacing: '0.5em',
                },
            }

            addBase({
                '@font-face': faces,
                html: fontUtils['.font-normal'],
            })

            addUtilities(fontUtils, ['responsive', 'hover'])
        },
    () => ({
        theme: {
            extend: {
                fontFamily: {
                    raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
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
                    }
                }
            }
        }
    })
)
