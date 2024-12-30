import axios from 'axios'
import { Request, Response } from 'express'
// Tokens
import { getTokenSpotify } from './TokensController'

// Not Public Request
const getSpotifyArtist = async (id: string, token: string) => {
    return await axios
        .get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => result.data)
        .catch((err) => err)
}

const getSpotifyArtistTopTracks = async (id: string, token: string) => {
    return await axios
        .get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => result.data.tracks)
        .catch((err) => err)
}

const getSpotifyArtistAlbums = async (id: string, token: string) => {
    return await axios
        .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((result) => result.data.items)
        .catch((err) => err)
}

// Public Requests
export const searchResults = async (req: Request, res: Response) => {
    const { q } = req.params

    try {
        // Get new Access Token
        const token = await getTokenSpotify()

        // Send Request
        await axios
            .get(
                `https://api.spotify.com/v1/search?q=${q.split(' ').join('+')}&type=artist,album,track`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((result) => res.send(result.data))
    } catch (err) {
        res.status(404).send(err)
    }
}

export const getArtist = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        // Get new Access Token
        const token = await getTokenSpotify()

        // Get Artist
        const artist = await getSpotifyArtist(id, token)

        // Get Artist's Albums
        const albums = await getSpotifyArtistAlbums(id, token)

        // Get Artist's Top Tracks
        const topTracks = await getSpotifyArtistTopTracks(id, token)

        res.send({
            artist: artist,
            albums: albums,
            topTracks: topTracks,
        })
    } catch (err) {
        res.status(404).send(err)
    }
}

export const getAlbum = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        // Get new Access Token
        const token = await getTokenSpotify()

        // Send Request
        await axios
            .get(`https://api.spotify.com/v1/albums/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => res.send(result.data))
    } catch (err) {
        res.status(404).send(err)
    }
}

export const getTrack = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        // Get new Access Token
        const token = await getTokenSpotify()

        // Send Request
        await axios
            .get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => res.send({ ...result.data, token: token }))
    } catch (err) {
        res.status(404).send(err)
    }
}
