import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// Functions
import { getFromAssets } from '../functions/Functions.ts'
// Hooks
import {
    useSpotifyTrack,
    useDominantColor,
    useTheme,
    useGeniusTrack,
} from '../hooks/Hooks.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Button from '../components/Button.tsx'
import Loading from '../components/Loading.tsx'
import Container from '../components/Container.tsx'
import YoutubeVideo from '../components/YoutubeVideo.tsx'
import ObjectContainer from '../components/ObjectContainer.tsx'
import SomethingWentWrong from '../components/SomethingWentWrong.tsx'
// Styles
import '../styles/pages/TrackPage.css'

const TrackPage = () => {
    // Track ID
    const { id } = useParams()
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Fetching Track from Spotify
    const {
        spotifyTrack,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    } = useSpotifyTrack(id!)
    // Fetching Track from Genius
    const {
        geniusTrack,
        isGeniusLoading,
        isGeniusError,
        isGeniusFetched,
        isGeniusRefetching,
        geniusRefetch,
    } = useGeniusTrack(spotifyTrack!)
    // Dominant Color Style
    const {
        style: headerStyle,
        color: posterColor,
        darkOrLight,
    } = useDominantColor(
        spotifyTrack!,
        isSpotifyFetched,
        isSpotifyRefetching,
        'track'
    )
    // Conditions
    const spotifyFetchedCondition = isSpotifyFetched && !isSpotifyRefetching
    const geniusFetchedCondition = isGeniusFetched && !isGeniusRefetching
    const renderGeniusComponent = (conditions?: boolean[]) => {
        if (conditions === undefined || conditions.length === 0) {
            return geniusFetchedCondition && !isGeniusError
        }

        return geniusFetchedCondition && !isGeniusError && conditions.length > 1
            ? conditions.reduce((c1, c2) => c1 && c2)
            : conditions[0]
    }
    // Current Theme
    const theme = useTheme()

    useEffect(() => {
        if (spotifyFetchedCondition) {
            geniusRefetch().then()
            document.title = `${siteInfo.websiteName} | ${spotifyTrack!.name}`
        }
    }, [isSpotifyFetched, isSpotifyRefetching])

    if (
        isSpotifyLoading ||
        isGeniusLoading ||
        isSpotifyRefetching ||
        isGeniusRefetching
    ) {
        return (
            <Container id='loading-container'>
                <Loading />
            </Container>
        )
    }

    if (isSpotifyError) {
        return <SomethingWentWrong refetchFunc={spotifyRefetch} />
    }

    return (
        <div className='track-page'>
            {spotifyFetchedCondition && geniusFetchedCondition ? (
                <ObjectContainer>
                    <div className='track-header' style={headerStyle}>
                        <div className='object-header-container'>
                            <div className='object-img'>
                                <img
                                    src={
                                        spotifyTrack!.album.images.length > 0
                                            ? spotifyTrack!.album.images[0].url
                                            : getFromAssets(
                                                  `placeholders/${theme}/TRACK.png`
                                              )
                                    }
                                    alt={spotifyTrack!.name}
                                />
                            </div>
                            <div className='object-info'>
                                <h1 className='object-name' dir='auto'>
                                    {spotifyTrack!.name}
                                </h1>
                                <div className='links'>
                                    <h4>Listen on</h4>
                                    <Button
                                        type='link'
                                        to={spotifyTrack!.external_urls.spotify}
                                        target='_blank'
                                        noBg={true}
                                    >
                                        <img
                                            src={getFromAssets(
                                                `svg/${darkOrLight}/SPOTIFY.svg`
                                            )}
                                            alt='Spotify'
                                            className='svg-standard'
                                        />
                                    </Button>
                                    {renderGeniusComponent([
                                        geniusTrack !== undefined,
                                    ]) &&
                                        geniusTrack!.song.media.length !== 0 &&
                                        geniusTrack!.song.media.filter(
                                            (media) =>
                                                media.provider === 'soundcloud'
                                        ).length !== 0 && (
                                            <Button
                                                type='link'
                                                to={
                                                    geniusTrack!.song.media.filter(
                                                        (media) =>
                                                            media.provider ===
                                                            'soundcloud'
                                                    )[0].url
                                                }
                                                target='_blank'
                                                noBg={true}
                                            >
                                                <img
                                                    src={getFromAssets(
                                                        `svg/${darkOrLight}/SOUNDCLOUD.svg`
                                                    )}
                                                    alt='Soundcloud'
                                                    className='svg-standard'
                                                />
                                            </Button>
                                        )}
                                </div>
                                {spotifyTrack!.album.total_tracks !== 1 && (
                                    <div className='track-number'>
                                        {spotifyTrack!.disc_number !== 1 && (
                                            <>
                                                <h4>Disc</h4>
                                                {spotifyTrack!.disc_number}
                                                <p>, </p>
                                            </>
                                        )}
                                        <h4>Track</h4>
                                        {spotifyTrack!.track_number}
                                        <h4>on</h4>
                                        <Link
                                            to={`/albums/${spotifyTrack!.album.id}`}
                                            dir='auto'
                                        >
                                            {spotifyTrack!.album.name}
                                        </Link>
                                    </div>
                                )}
                                <div className='by'>
                                    <h4>By</h4>
                                    {spotifyTrack!.artists.map(
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
                                                        spotifyTrack!.artists
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
                                            spotifyTrack!.album.release_date
                                        ).toDateString()}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='track-main'>
                        <div className='object-main-container'>
                            {renderGeniusComponent([
                                geniusTrack !== undefined,
                            ]) &&
                                geniusTrack!.song.media.length !== 0 && (
                                    <YoutubeVideo
                                        videoId={
                                            geniusTrack!.song.media
                                                .filter(
                                                    (media) =>
                                                        media.provider ===
                                                        'youtube'
                                                )[0]
                                                .url.split('v=')[1]
                                        }
                                    />
                                )}
                            {renderGeniusComponent() ? (
                                <>
                                    <h1 className='section-title'>Lyrics</h1>
                                    <Container
                                        style={{
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div className='lyrics-container'>
                                            {geniusTrack!.lyrics
                                                .split('\n')
                                                .map((line, lineIndex) =>
                                                    line.match(/[\[\]]/g) ? (
                                                        <h3
                                                            key={
                                                                'line' +
                                                                lineIndex
                                                            }
                                                            dir='auto'
                                                            className='verse-chorus-title'
                                                            style={{
                                                                textShadow: `0px 0px 5px ${posterColor}`,
                                                            }}
                                                        >
                                                            {line}
                                                        </h3>
                                                    ) : (
                                                        <p
                                                            key={
                                                                'line' +
                                                                lineIndex
                                                            }
                                                            dir='auto'
                                                        >
                                                            {line}
                                                        </p>
                                                    )
                                                )}
                                        </div>
                                        <p className='faded-title'>
                                            The lyrics shown in this section
                                            could be inaccurate.
                                        </p>
                                    </Container>
                                </>
                            ) : (
                                <Container>
                                    <h2 className='faded-title'>
                                        Sorry, didn't find lyrics for this song
                                    </h2>
                                </Container>
                            )}
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

export default TrackPage
