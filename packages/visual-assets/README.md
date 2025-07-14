# Prodeko visual asset library

**This package is still experimental**

This package provides the official visual assets of Prodeko, including logos, icons, and web favicons. It is designed to be consumed by Prodeko's internal web projects.

## Features

- SVG logos, icons
- React components generated from SVGs
- Favicons and web manifest files

The logos and icons are responsive to css styling e.g. size and color. Logo colors are most easily set using the prodeko tailwind theme package.

## Usage

### Installation 

To import the package from github package registry, see [instructions for setting up an access token](https://github.com/Prodeko/design-system?tab=readme-ov-file#usage)

```bash
npm install @prodeko/visual-assets
```

Alternatively, you can import any assets directly from cdn. (once it is implemented) #TODO

### Favicons

If you want to use favicons, run the installation step. 
This will copy favicons to public/favicons folder in your project. Then you can insert them into your html header.

```bash
npx prodeko-install-favicons
```

Alternatively, you could theoretically set the favicons via javascript without copying them to the public folder. This is very clunky however and not at all recommended.

### React logos and icons

Logos and icons are available as React components. Logos can be imported from `@prodeko/visual-assets/react/logos` and icons from `@prodeko/visual-assets/react/icons`.

```jsx
// Example usage in React
import { LogoText } from '@prodeko/visual-assets/react/logos'

export default function Header() {
  return (
    <header className="w-full flex">
      <LogoText className="w-40 h-auto text-[#002e7d]" />
    </header>
  )
}
```

### SVG sprites

Logos and icons are also available as SVG sprites.

```tsx
// import the logo
import { logos } from "@prodeko/visual-assets"

/** 
 * Select the logo you want using the #-selector.
*/

function Logo() {
    return (
        <svg className="w-64 h-64 text-white">
          <use href={`${logos}#logo`} />
        </svg>
    )
}
```

```html
<svg class="icon">
  <use href="@prodeko/visual-assets/dist/icons.svg#some-icon" />
</svg>
```

## Build and development

This package includes build scripts for generating:
- Symbol-mode SVG sprites `build:sprites`
- React components from individual SVGs `build:react`
- To run the full build script, run `pnpm build`

In order to test the package locally before creating a release, run 

```bash
# ./design-system/packages/visual-assets
pnpm pack --pack-destination ~

# In consuming project install the tarball and you can use it normally
pnpm add ~/prodeko-visual-assets-0.1.6.tgz
```
