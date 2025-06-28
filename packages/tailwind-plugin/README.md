# Tailwind theme for Prodeko

This tailwind plugin provides Prodeko brand colors and fonts.

## Installation

Install from Prodeko github package registry.

## Usage

Add the plugin to your `tailwind.config.js`. Notice that you have to invoke the plugin factory.

```js
//tailwind.config.js

const prodeko_tailwind = require('@prodeko/tailwind-theme')

export default {
  plugins: [
    prodeko_tailwind(),
  ],
}
```
