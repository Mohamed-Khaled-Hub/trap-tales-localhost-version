import { Link } from 'react-router-dom'
// Types
import {
    CardProps,
    SpotifyAlbum,
    SpotifyArtist,
    SpotifyTrack,
} from '../types/Types.ts'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useTheme } from '../hooks/Hooks.ts'
// Styles
import '../styles/components/Card.css'

const Card = ({ object }: CardProps) => {
    // Splitting object based on object.type
    const artist = object as SpotifyArtist
    const album = object as SpotifyAlbum
    const track = object as SpotifyTrack
    // Current Theme
    const theme = useTheme()

    // Features string
    const features =
        object.type === 'track' &&
        track.artists
            .map((artist) => artist.name)
            .join(track.artists.length == 2 ? ' & ' : ', ')

    return (
        <div className='card'>
            <Link to={`/${object.type}s/${object.id}`} className='card'>
                {object.type === 'artist' && (
                    <>
                        <img
                            className='card-object-img'
                            src={
                                artist.images.length > 0
                                    ? artist.images[0].url
                                    : getFromAssets(
                                          `placeholders/${theme}/TRACK.png`
                                      )
                            }
                            alt={artist.name}
                        />
                        <h1
                            className='object-name'
                            title={artist.name}
                            dir='auto'
                        >
                            {artist.name}
                        </h1>
                    </>
                )}
                {object.type === 'album' && (
                    <>
                        <img
                            className='card-object-img'
                            src={
                                album.images.length > 0
                                    ? album.images[0].url
                                    : getFromAssets(
                                          `placeholders/${theme}/TRACK.png`
                                      )
                            }
                            alt={album.name}
                        />
                        <h1
                            className='object-name'
                            title={album.name}
                            dir='auto'
                        >
                            {album.name}
                        </h1>
                        <h2
                            className='object-metadata'
                            title={
                                album.total_tracks == 1
                                    ? 'Single'
                                    : album.total_tracks.toString()
                            }
                        >
                            {album.total_tracks == 1 ? (
                                <p>Single</p>
                            ) : (
                                album.total_tracks
                            )}
                            {album.total_tracks > 1 && <p> Tracks</p>}
                        </h2>
                    </>
                )}
                {object.type === 'track' && (
                    <>
                        <img
                            className='card-object-img'
                            src={
                                track.album.images.length > 0
                                    ? track.album.images[0].url
                                    : getFromAssets(
                                          `placeholders/${theme}/TRACK.png`
                                      )
                            }
                            alt={track.name}
                        />
                        <h1
                            className='object-name'
                            title={track.name}
                            dir='auto'
                        >
                            {track.name}
                        </h1>
                        <h2
                            className='object-metadata'
                            title={features.toString()}
                            dir='auto'
                        >
                            <p>By </p>
                            {features}
                        </h2>
                    </>
                )}
            </Link>
        </div>
    )
}

export default Card
