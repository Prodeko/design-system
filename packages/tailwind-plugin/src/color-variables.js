/**
 * These css color variables are meant to be compatible with shadcn theming.
 * https://ui.shadcn.com/docs/theming
 */
const cssColors = {
    ':root': {
        '--radius': '0.5rem',
        '--border-opacity': '1',
        '--outline-opacity': '0.5',

        '--background': '0 0% 100%;',
        '--foreground': '222.2 84% 4.9%',
        '--card': '0 0% 100%',
        '--card-foreground': '222.2 84% 4.9%;',
        '--popover': '0 0% 100%',
        '--popover-foreground': '222.2 84% 4.9%',
        '--primary': '218 100% 25%',
        '--primary-foreground': '210 40% 98%',
        '--secondary': '210 40% 96.1%',
        '--secondary-foreground': '222.2 47.4% 11.2%',
        '--muted': '210 40% 96.1%',
        '--muted-foreground': '215.4 16.3% 46.9%',
        '--accent': '210 40% 96.1%',
        '--accent-foreground': '222.2 47.4% 11.2%',
        '--destructive': '0 84.2% 60.2%',
        '--border': '214.3 31.8% 91.4%',
        '--input': '214.3 31.8% 91.4%',
        '--ring': '222.2 84% 4.9%',

        '--chart-1': '18.01 100% 48%',
        '--chart-2': '174.71 100% 29%',
        '--chart-3': '195.82 72% 23%',
        '--chart-4': '43.66 100% 50%',
        '--chart-5': '36.49 100% 50%',

        '--sidebar': '210 40% 98%',
        '--sidebar-foreground': '222.2 84% 4.9%',
        '--sidebar-primary': '218 100% 25%',
        '--sidebar-primary-foreground': '210 40% 98%',
        '--sidebar-accent': '210 40% 96.1%',
        '--sidebar-accent-foreground': '222.2 47.4% 11.2%',
        '--sidebar-border': '214.3 31.8% 91.4%',
        '--sidebar-ring': '222.2 84% 4.9%',
    },

    '.dark': {
        '--background': '222.2 84% 4.9%',
        '--foreground': '210 40% 98%',
        '--card': '222.2 84% 4.9%',
        '--card-foreground': '210 40% 98%',
        '--popover': '222.2 84% 4.9%',
        '--popover-foreground': '210 40% 98%',
        '--primary': '218 100% 25%',
        '--primary-foreground': '210 40% 98%',
        '--secondary': '217.2 32.6% 17.5%',
        '--secondary-foreground': '210 40% 98%',
        '--muted': '217.2 32.6% 17.5%',
        '--muted-foreground': '215 20.2% 65.1%',
        '--accent': '217.2 32.6% 17.5%',
        '--accent-foreground': '210 40% 98%',
        '--destructive': '0 62.8% 30.6%',
        '--border': '217.2 32.6% 17.5%',
        '--input': '217.2 32.6% 17.5%',
        '--ring': '212.7 26.8% 83.9%',

        '--chart-1': '18.01 100% 48%',
        '--chart-2': '174.71 100% 29%',
        '--chart-3': '195.82 72% 23%',
        '--chart-4': '43.66 100% 50%',
        '--chart-5': '36.49 100% 50%',

        '--sidebar': '222.2 84% 4.9%',
        '--sidebar-foreground': '210 40% 98%',
        '--sidebar-primary': '218 100% 25%',
        '--sidebar-primary-foreground': '222.2 84% 4.9%',
        '--sidebar-accent': '217.2 32.6% 17.5%',
        '--sidebar-accent-foreground': '210 40% 98%',
        '--sidebar-border': '217.2 32.6% 17.5%',
        '--sidebar-ring': '212.7 26.8% 83.9%',
    }
}

module.exports = cssColors