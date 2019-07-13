# Lory Accessibility

Accessibility enhancements for [lory.js](http://loryjs.github.io/lory/) based on [W3 Carousels](https://www.w3.org/WAI/tutorials/carousels/).

- Reads Lory config from data attribute: `<div class="slider" data-lory='{ "infinite": 1 }'>`
- Support auto-play by passing an `"autoPlay": 5000` option (in milliseconds)
- Auto-play stops when the slider receives focus or the mouse enters
- Inactive slides have focus events disabled and `aria-hidden` set to `true`
- A Live Region is added to announce slide changes to screen readers (only when auto-play is disabled)

## Installation

- As an NPM package: `npm install @unplugstudio/lory-a11y`
- OR directly in the browser `<script src="https://unpkg.com/@unplugstudio/lory-a11y">`

## Usage

If installing via npm, you can consume as an ES6 or CommonJS package:

```js
// ES6 module
import { initLory } from 'lory-a11y'
initLory()

// CommonJS
loryA11y = require('lory-a11y')
loryA11y.initLory()
```

If using directly in the browser you can access the global object `loryA11y`.

After calling `initLory()` all elements with a `data-lory` attribute will be initialized. Each will have its configuration parsed as JSON directly from the data attribute.

You can also instantiate the `LoryA11y` class and pass a DOM element to initialize the sliders programmatically:

```js
import { LoryA11y } form 'lory-a11y'

new LoryA11y(document.querySelector('...'))
```
