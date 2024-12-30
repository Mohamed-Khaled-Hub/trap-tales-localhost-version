import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// Routers
import { spotifyRouter } from './routers/SpotifyRouter'
import { geniusRouter } from './routers/GeniusRouter'
// Middlewares
import { requestLog } from './middlewares/requestLog'

// Load .env file
dotenv.config()

// Initialize Express
const app = express()

// Convert request to JSON
app.use(express.json())

// Solving 'no-cors' request problem
app.use(
    cors({
        origin: [`${process.env.WEBSITE_URL}`],
        optionsSuccessStatus: 200,
    })
)

// Logging Middleware
app.use(requestLog)

// Using Routes
app.use('/spotify', spotifyRouter)
app.use('/genius', geniusRouter)

// Start listening
app.listen(process.env.PORT, () => {})
