# Prodeko visual asset library

**This package is considered experimental until version 1.0.0! Any functionality may break in any release**

## Installation

Install from Prodeko github package registry.

## Usage

### Logos

You can add any css to the logos you want.

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
      <use href={`${logos}#logo`} />
    </svg>
  )
}
```

### Favicons

The plugin has a postinstall script that copies dist/favicons to your consuming apps public directory. Just run `npm install` and then you can use the icons normally. You can also choose to commit them to version control if you like.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="public/favicons/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vaaliplatta</title>
</head>
```