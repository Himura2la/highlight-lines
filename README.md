# Code Lines Highlighter

A small Vanilla JS library used to highlight one or more lines of a code snippet in an HTML document.

## How to use

```js
import { highlightLines } from 'path/to/lib/highlight-lines'

const codeBlock = document.getElementsById('highlight-my-lines')
const ranges = [1,[3,5]]
codeBlock.innerHTML = highlightLines(codeBlock.innerHTML, ranges)
```

This will highlight the following lines: 1, 3, 4, and 5.

## How to run example

```sh
npm run dev
```

[Open example on GitHub Pages](https://himura2la.github.io/highlight-lines/example/index.html)