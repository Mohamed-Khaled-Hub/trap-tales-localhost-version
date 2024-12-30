import { Router } from 'express'
// Controllers
import {
    getAlbum,
    getArtist,
    getTrack,
    searchResults,
} from '../controllers/SpotifyController'

export const spotifyRouter = Router()

spotifyRouter.get('/searchResults/:q', searchResults)

spotifyRouter.get('/getArtist/:id', getArtist)

spotifyRouter.get('/getAlbum/:id', getAlbum)

spotifyRouter.get('/getTrack/:id', getTrack)
