import { highlightLines } from '../lib/highlight-lines.js';

document.addEventListener("DOMContentLoaded", () => {
    for (const code of document.getElementsByTagName('code')) {
        const highlightRanges = code.dataset.highlightLines
        if (highlightRanges) {
            code.innerHTML = highlightLines(code.innerHTML, JSON.parse(highlightRanges))
        }
    }
})