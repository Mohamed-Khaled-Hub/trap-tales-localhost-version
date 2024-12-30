import axios from 'axios'
import { JSDOM } from 'jsdom'
import { countBy, maxBy } from 'lodash'
import { Request, Response } from 'express'
// Tokens
import { getTokenGenius } from './TokensController'
// Types
import {
    HitType,
    SongType,
    TrackIdAndUrlType,
    FrontendTrackType,
    PrimaryArtistType,
} from '../types/Types'
// Functions
import { artistFormatting, trackFormatting } from '../functions/Functions'

// Not Public Request
const getGeniusArtistID = async (q: string, token: string) => {
    return await axios
        .get(`https://api.genius.com/search?q=${q.split(' ').join('+')}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => {
            const qFormated = q.replace('$', '\\$')

            const artistsMatchedIds = result.data.response.hits.map(
                (hit: HitType) => {
                    const match = hit.result.primary_artist.name.match(
                        new RegExp(qFormated, 'i')
                    )

                    if (match === null) {
                        return null
                    }

                    return {
                        name: hit.result.primary_artist.name,
                        id: hit.result.primary_artist.id,
                    }
                }
            )

            const artistsIds = artistsMatchedIds
                .map((artist: PrimaryArtistType) => {
                    if (artist) {
                        return artist.id
                    }
                })
                .filter((artistId: number) => artistId !== undefined)

            if (artistsIds.length === 0) return null

            const idOccurrences = countBy(artistsIds)

            const mostFrequentId = maxBy(
                Object.keys(idOccurrences),
                (o) => idOccurrences[o]
            )

            return idOccurrences[mostFrequentId!.toString()] === 1
                ? null
                : mostFrequentId
        })
        .catch((err) => err)
}

const getTrackIdAndUrl = async (trackObject: FrontendTrackType, token: string) => {
    const { track, artists } = trackObject

    return await axios
        .get(
            `https://api.genius.com/search?q=${trackFormatting(track).split(' ')}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((result) => {
            let songsMatches = result.data.response.hits
                .map((hit: HitType) => {
                    const artistResult = artistFormatting(
                        hit.result.primary_artist.name
                    )
                    const artistsMatches = artists.map((artist: string) =>
                        artistResult.match(new RegExp(artistFormatting(artist)))
                    )

                    const trackResult = trackFormatting(hit.result.title)
                    const trackMatch = trackResult.match(
                        new RegExp(trackFormatting(track))
                    )

                    if (
                        trackMatch !== null &&
                        artistsMatches.some((artist) => artist !== null)
                    )
                        return hit
                })
                .filter((song: SongType) => song !== undefined)

            if (songsMatches.length === 0) return null

            songsMatches = songsMatches[0].result

            return {
                id: songsMatches.id,
                url: songsMatches.url,
            }
        })
        .catch((err) => err)
}

const getTrackLyrics = async (url: string) => {
    // Get Lyrics from track page
    return await axios
        .get(url)
        .then((result) => {
            const { document } = new JSDOM(result.data).window

            const lyricsContainer = document.querySelector(
                'div[data-lyrics-container]'
            )!

            let lyrics = ''

            lyricsContainer.childNodes.forEach((lyric) => {
                if (lyric.textContent!.match(/]/g)) {
                    lyrics += lyric.textContent!.replace(/]/g, ']\n')
                } else if (lyric.textContent!.match(/\)/g)) {
                    lyrics += lyric.textContent!.replace(/\)/g, ')\n')
                } else {
                    lyrics += lyric.textContent!
                }

                if (
                    lyric.nextSibling !== null &&
                    (lyric.nextSibling.nodeName as string) === 'BR'
                ) {
                    lyrics += '\n'
                }
            })

            return lyrics
        })
        .catch((err) => err)
}

// Public Requests
export const getArtist = async (req: Request, res: Response) => {
    const { q } = req.params

    try {
        // Get Access Token
        const token = await getTokenGenius()

        // Get Artist ID from searchResults
        const artistId = await getGeniusArtistID(q, token)

        // Get Artist
        await axios
            .get(
                `https://api.genius.com/artists/${artistId}?text_format=plain`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => res.send(result.data.response.artist))
    } catch (err) {
        res.status(404).send(err)
    }
}

export const getTrack = async (req: Request, res: Response) => {
    const { trackObject } = req.body

    // Get Access Token
    const token = await getTokenGenius()

    // Call Function to Get track object
    const track = await getTrackIdAndUrl(trackObject, token)

    try {
        // Get Track ID & URL
        const { id, url } = track as TrackIdAndUrlType

        // Get Track Lyrics
        const lyrics = await getTrackLyrics(url)

        // Get Artist
        await axios
            .get(`https://api.genius.com/songs/${id}?text_format=plain`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) =>
                res.send({
                    song: result.data.response.song,
                    lyrics: lyrics,
                })
            )
    } catch (err) {
        res.status(404).send(err)
    }
}
