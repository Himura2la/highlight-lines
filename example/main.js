import { highlightLines } from '../lib/highlight-lines'

document.addEventListener("DOMContentLoaded", () => {
    for (const code of document.getElementsByTagName('code')) {
        const highlightRanges = code.dataset.highlightLines
        if (highlightRanges) {
            code.innerHTML = highlightLines(code.innerHTML, JSON.parse(highlightRanges))
        }
    }
})
