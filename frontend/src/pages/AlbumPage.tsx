import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// Functions
import { getDiscs, getFromAssets } from '../functions/Functions.ts'
// Hooks
import { useSpotifyAlbum, useDominantColor, useTheme } from '../hooks/Hooks.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Loading from '../components/Loading.tsx'
import Container from '../components/Container.tsx'
import ObjectContainer from '../components/ObjectContainer.tsx'
import SomethingWentWrong from '../components/SomethingWentWrong.tsx'
// Styles
import '../styles/pages/AlbumPage.css'

const AlbumPage = () => {
    // Album ID
    const { id } = useParams()
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Fetching Album
    const {
        spotifyAlbum,
        isSpotifyError,
        isSpotifyLoading,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    } = useSpotifyAlbum(id!)
    // Dominant Color Style
    const { style: headerStyle } = useDominantColor(
        spotifyAlbum!,
        isSpotifyFetched,
        isSpotifyRefetching,
        'album'
    )
    // Current Theme
    const theme = useTheme()

    useEffect(() => {
        if (isSpotifyFetched && !isSpotifyRefetching) {
            document.title = `${siteInfo.websiteName} | ${spotifyAlbum!.name}`
        }
    }, [isSpotifyFetched, isSpotifyRefetching])

    if (isSpotifyLoading || isSpotifyRefetching) {
        return (
            <Container id='loading-container'>
                <Loading />
            </Container>
        )
    }

    if (isSpotifyError) {
        return <SomethingWentWrong refetchFunc={spotifyRefetch} />
    }

    // Get Discs Format after Album is Fetched
    const discs = getDiscs(spotifyAlbum!)

    return (
        <div className='album-page'>
            {isSpotifyFetched && !isSpotifyRefetching ? (
                <ObjectContainer>
                    <div className='album-header' style={headerStyle}>
                        <div className='object-header-container'>
                            <div className='object-img'>
                                <img
                                    src={
                                        spotifyAlbum!.images.length > 0
                                            ? spotifyAlbum!.images[0].url
                                            : getFromAssets(
                                                  `placeholders/${theme}/TRACK.png`
                                              )
                                    }
                                    alt={spotifyAlbum!.name}
                                />
                            </div>
                            <div className='object-info'>
                                <h1 className='object-name' dir='auto'>
                                    {spotifyAlbum!.name}
                                </h1>
                                <div className='total-tracks'>
                                    {spotifyAlbum!.total_tracks === 1 ? (
                                        <h4>Single</h4>
                                    ) : (
                                        <>
                                            <h4>Tracks</h4>
                                            <h4>
                                                {spotifyAlbum!.total_tracks}
                                            </h4>
                                        </>
                                    )}
                                </div>
                                <div className='by'>
                                    <h4>By</h4>
                                    {spotifyAlbum!.artists.map(
                                        (artist, artistIndex) => (
                                            <div
                                                className='by-link'
                                                key={'by' + artistIndex}
                                            >
                                                <Link
                                                    to={`/artists/${artist.id}`}
                                                    dir='auto'
                                                >
                                                    {artist.name}
                                                </Link>
                                                <p>
                                                    {artistIndex !==
                                                        spotifyAlbum!.artists
                                                            .length -
                                                            1 && ', '}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className='release-date'>
                                    <h4>Released</h4>
                                    <h4>
                                        {new Date(
                                            spotifyAlbum!.release_date
                                        ).toDateString()}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='album-main'>
                        <div className='object-main-container'>
                            <h1 className='section-title'>Tracks</h1>
                            <div className='album-tracks'>
                                {discs!.map((disc, diskIndex) => {
                                    return (
                                        <div
                                            className='discs'
                                            key={'disc' + diskIndex}
                                        >
                                            {discs!.length > 1 && (
                                                <h1>Disc {diskIndex + 1}</h1>
                                            )}
                                            <ol>
                                                {disc.map((track) => (
                                                    <li
                                                        key={
                                                            'track-' + track.id
                                                        }
                                                    >
                                                        <Link
                                                            to={`/tracks/${track.id}`}
                                                        >
                                                            {track.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </ObjectContainer>
            ) : (
                <Container id='loading-container'>
                    <Loading />
                </Container>
            )}
        </div>
    )
}

export default AlbumPage
