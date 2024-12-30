import { Router } from 'express'
// Controllers
import { getArtist, getTrack } from '../controllers/GeniusController'

export const geniusRouter = Router()

geniusRouter.get('/getArtist/:q', getArtist)

geniusRouter.post('/getTrack', getTrack)
