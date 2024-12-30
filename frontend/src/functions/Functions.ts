// Types
import { SpotifyAlbum, SpotifyTrack } from '../types/Types.ts'

export function getFromAssets(src: string) {
    // Remember to change path before deployment
    const paths = {
        deploymentPath: '',
        localhostPath: '../../public/assets/',
    }

    return new URL(paths.localhostPath + src, import.meta.url).href
}

export function capitalize(word: string) {
    return word
        .split(' ')
        .map((word) => {
            return word[0].toUpperCase() + word.slice(1)
        })
        .join(' ')
}

export function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function getCssVar(name: string) {
    return getComputedStyle(
        document.querySelector(':root') as Element
    ).getPropertyValue(name)
}

export function getDiscs(album: SpotifyAlbum) {
    const discsMap = new Map<number, SpotifyTrack[]>()

    album!.tracks.items.forEach((track) => {
        const discNumber = track.disc_number
        discsMap.set(discNumber, (discsMap.get(discNumber) || []).concat(track))
    })

    return Object.values(Object.fromEntries(discsMap))
}
