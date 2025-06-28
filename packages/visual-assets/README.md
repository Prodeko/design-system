# Prodeko visual asset library

**This package is still experimental**

## Usage

```bash
npm install @prodeko/visual-assets

# If you want to use favicons, run the installation step. 
# This will copy favicons to public/favicons folder in your project.
# Alternatively, you can set the favicons via javascript with no copying.
npx prodeko-install-favicons
```

```tsx
// import the logo
import { logos } from "@prodeko/visual-assets"

// select the logo you want using #

function Logo() {
    return (
        <svg className="w-64 h-64 text-white">
          <use href={`${logos}#logo`} />
        </svg>
    )
}
function LogoWithText() {
    return (
        <svg className="w-64 h-64 text-white">
          <use href={`${logos}#logo-text`} />
        </svg>
        )
    }
function ProdekoBlueLogo() {
    return (
        <svg className="w-64 h-64 text-[#002e7d]">
          <use href={`${logos}#logo-text`} />
        </svg>
        )
    }
```