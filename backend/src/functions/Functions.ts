export function trackFormatting(track: string) {
    return track
        .toLowerCase()
        .replace(/’/g, "'")
        .replace('$', '\\$')
        .replace(/[“”]/g, '"')
        .replace(/([\[()\]])/g, '')
        .replace(/[:/#?&@%+=]/g, '')
        .replace(/\s*-\s*/g, ' ')
        .split(/(feat|ft|with)/g)[0]
        .trim()
}

export function artistFormatting(artist: string) {
    return artist
        .toLowerCase()
        .replace('$', '\\$')
        .replace(/([\[()\]])/g, '')
        .replace(/[:/#?&@%+=]/g, '')
        .replace(/\s*-\s*/g, ' ')
        .trim()
}
