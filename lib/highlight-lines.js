const highlightTagName = 'span'
const highlightTagOpening = '<' + highlightTagName + ' class="highlight-block">'
const noHighlightTagOpening = '<' + highlightTagName + ' class="no-highlight-block">'

export function highlightLines(code, rawRanges) {
    if (!rawRanges || !rawRanges.length) {
        return code
    }
    const lines = code.trimEnd().split('\n')
    const ranges = rawRanges.map(function (range) {
        return parseRangeInput(range, lines.length)
    })

    let previousLineIsInHighlightedBlock = checkValueIsInAnyRange(1, ranges)
    let result = previousLineIsInHighlightedBlock ? highlightTagOpening : noHighlightTagOpening

    for (var lineNumber = 1; lineNumber <= lines.length; lineNumber++) {
        const currentLineIsInHighlightedBlock = checkValueIsInAnyRange(lineNumber, ranges)
        const highlightedRegionBegins = !previousLineIsInHighlightedBlock && currentLineIsInHighlightedBlock
        const nonHighlightedRegionBegins = previousLineIsInHighlightedBlock && !currentLineIsInHighlightedBlock

        if (highlightedRegionBegins) {
            result += highlightTagOpening
        }
        if (nonHighlightedRegionBegins) {
            result += noHighlightTagOpening
        }

        let currentLine = lines[lineNumber - 1]
        // Workaround for higlight blocks, ending on an empty line
        result += currentLine ? currentLine : '<span style="display: inline-block;"></span>'

        const nextLineIsInHighlightedBlock = checkValueIsInAnyRange(lineNumber + 1, ranges)
        const highlightedRegionEnds = currentLineIsInHighlightedBlock && !nextLineIsInHighlightedBlock
        const nonHighlightedRegionEnds = !currentLineIsInHighlightedBlock && nextLineIsInHighlightedBlock
        const eof = lineNumber === lines.length

        if (nonHighlightedRegionEnds || highlightedRegionEnds || eof) {
            result += '</' + highlightTagName + '>\n'
        } else {
            result += '\n'
        }

        previousLineIsInHighlightedBlock = currentLineIsInHighlightedBlock
    }
    return result
}

function parseRangeInput(range, lastLine) {
    if (typeof range === 'number') {
        range = [range, range]
    }
    if (range.length !== 2) {
        range = [range[0], range[0]]
    }
    if (lastLine < 1) {
        lastLine = 1
    }

    range[0] = range[0] <= 0 ? 1
             : range[0] > lastLine ? lastLine
             : range[0]

    range[1] = range[1] < 0 ? lastLine
             : range[1] === 0 ? 1
             : range[1] > lastLine ? lastLine
             : range[1]

    if (range[0] > range[1]) {
        range = [range[1], range[0]]
    }
    return range
}

function checkValueIsInAnyRange(value, ranges) {
    for (var i = 0; i < ranges.length; i++) {
        if (ranges[i][0] <= value && value <= ranges[i][1]) {
            return true
        }
    }
    return false
}
