const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')
const faces = require('./src/font-faces.js')

module.exports = plugin.withOptions(
    () =>
        function ({ addBase, addUtilities, theme }) {
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
                '@font-face': faces,
                html: {
                    'font-family': theme('fontFamily.raleway'),
                    'font-weight': theme('fontWeight.normal'),
                    'letter-spacing': '0em',
                },
            })

            addUtilities(fontUtils, ['responsive', 'hover'])
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
                    }
                }
            }
        }
    })
)