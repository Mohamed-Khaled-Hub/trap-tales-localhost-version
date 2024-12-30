import axios from 'axios'
import dotenv from 'dotenv'

// Load .env file
dotenv.config()

export const getTokenGenius = async () => {
    return await axios
        .post(
            'https://api.genius.com/oauth/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.GENIUS_CLIENT_ID!,
                client_secret: process.env.GENIUS_CLIENT_SECRET!,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then((result) => result.data.access_token)
        .catch((err) => err)
}

export const getTokenSpotify = async () => {
    return await axios
        .post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: process.env.SPOTIFY_CLIENT_ID!,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        .then((result) => result.data.access_token)
        .catch((err) => console.log(err))
}
