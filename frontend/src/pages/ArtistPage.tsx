import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
// Types
import { SpotifyAlbum, SpotifyTrack } from '../types/Types.ts'
// Functions
import {
    capitalize,
    getFromAssets,
    numberWithCommas,
} from '../functions/Functions.ts'
// Hooks
import {
    useSpotifyArtist,
    useDominantColor,
    useTheme,
    useGeniusArtist,
} from '../hooks/Hooks.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Loading from '../components/Loading.tsx'
import Container from '../components/Container.tsx'
import SomethingWentWrong from '../components/SomethingWentWrong.tsx'
import ObjectContainer from '../components/ObjectContainer.tsx'
import Card from '../components/Card.tsx'
import Button from '../components/Button.tsx'
// Styles
import '../styles/pages/ArtistPage.css'

const ArtistPage = () => {
    // Artist ID
    const { id } = useParams()
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Fetching Artist from Spotify
    const {
        spotifyArtist,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    } = useSpotifyArtist(id!)
    // Fetching Artist from Genius
    const {
        geniusArtist,
        isGeniusLoading,
        isGeniusError,
        isGeniusFetched,
        isGeniusRefetching,
        geniusRefetch,
    } = useGeniusArtist(spotifyArtist!)
    // Dominant Color Style
    const { style: headerStyle, darkOrLight } = useDominantColor(
        spotifyArtist!,
        isSpotifyFetched,
        isSpotifyRefetching,
        'artist'
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
            document.title = `${siteInfo.websiteName} | ${spotifyArtist!.artist.name}`
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
        <div className='artist-page'>
            {spotifyFetchedCondition && geniusFetchedCondition ? (
                <ObjectContainer>
                    <div className='artist-header' style={headerStyle}>
                        <div className='object-header-container'>
                            <div className='object-img'>
                                <img
                                    src={
                                        spotifyArtist!.artist.images.length > 0
                                            ? spotifyArtist!.artist.images[0]
                                                  .url
                                            : getFromAssets(
                                                  `placeholders/${theme}/TRACK.png`
                                              )
                                    }
                                    alt={spotifyArtist!.artist.name}
                                />
                            </div>
                            <div className='object-info'>
                                <h1 className='object-name' dir='auto'>
                                    {spotifyArtist!.artist.name}
                                </h1>
                                <div className='links'>
                                    <h4>Links</h4>
                                    <Button
                                        type='link'
                                        to={
                                            spotifyArtist!.artist.external_urls
                                                .spotify
                                        }
                                        target='_blank'
                                        noBg={true}
                                    >
                                        <img
                                            src={getFromAssets(
                                                `svg/${darkOrLight}/SPOTIFY.svg`
                                            )}
                                            alt={
                                                spotifyArtist!.artist.name +
                                                "'s Spotify"
                                            }
                                            className='svg-standard'
                                        />
                                    </Button>
                                    {renderGeniusComponent([
                                        geniusArtist !== undefined,
                                    ]) &&
                                        geniusArtist!.facebook_name !== null &&
                                        geniusArtist!.facebook_name.length !==
                                            0 && (
                                            <Button
                                                type='link'
                                                to={`https://www.facebook.com/${geniusArtist!.facebook_name}`}
                                                target='_blank'
                                                noBg={true}
                                            >
                                                <img
                                                    src={getFromAssets(
                                                        `svg/${darkOrLight}/FACEBOOK.svg`
                                                    )}
                                                    alt={
                                                        spotifyArtist!.artist
                                                            .name +
                                                        "'s Facebook"
                                                    }
                                                    className='svg-standard'
                                                />
                                            </Button>
                                        )}
                                    {renderGeniusComponent([
                                        geniusArtist !== undefined,
                                    ]) &&
                                        geniusArtist!.twitter_name !== null &&
                                        geniusArtist!.twitter_name.length !==
                                            0 && (
                                            <Button
                                                type='link'
                                                to={`https://www.x.com/${geniusArtist!.twitter_name}`}
                                                target='_blank'
                                                noBg={true}
                                            >
                                                <img
                                                    src={getFromAssets(
                                                        `svg/${darkOrLight}/X.svg`
                                                    )}
                                                    alt={
                                                        spotifyArtist!.artist
                                                            .name + "'s X"
                                                    }
                                                    className='svg-standard'
                                                />
                                            </Button>
                                        )}
                                    {renderGeniusComponent([
                                        geniusArtist !== undefined,
                                    ]) &&
                                        geniusArtist!.instagram_name !== null &&
                                        geniusArtist!.instagram_name.length !==
                                            0 && (
                                            <Button
                                                type='link'
                                                to={`https://www.instagram.com/${geniusArtist!.instagram_name}`}
                                                target='_blank'
                                                noBg={true}
                                            >
                                                <img
                                                    src={getFromAssets(
                                                        `svg/${darkOrLight}/INSTAGRAM.svg`
                                                    )}
                                                    alt={
                                                        spotifyArtist!.artist
                                                            .name +
                                                        "'s Instagram"
                                                    }
                                                    className='svg-standard'
                                                />
                                            </Button>
                                        )}
                                    {renderGeniusComponent([
                                        geniusArtist !== undefined,
                                    ]) &&
                                        geniusArtist!.url !== null && (
                                            <Button
                                                type='link'
                                                to={geniusArtist!.url}
                                                target='_blank'
                                                noBg={true}
                                            >
                                                <img
                                                    src={getFromAssets(
                                                        `svg/${darkOrLight}/GENIUS.svg`
                                                    )}
                                                    alt={
                                                        spotifyArtist!.artist
                                                            .name + "'s Genius"
                                                    }
                                                    className='svg-standard'
                                                />
                                            </Button>
                                        )}
                                </div>
                                <div className='followers'>
                                    <h4>Spotify Followers</h4>
                                    <h4>
                                        {numberWithCommas(
                                            spotifyArtist!.artist.followers
                                                .total
                                        )}
                                    </h4>
                                </div>
                                {spotifyArtist!.artist.genres.length > 0 && (
                                    <div className='genres'>
                                        <h4>Genres</h4>
                                        {spotifyArtist!.artist.genres.map(
                                            (genre, genreIndex) => (
                                                <h4 key={'genre' + genreIndex}>
                                                    {capitalize(genre)}
                                                    {genreIndex !==
                                                        spotifyArtist!.artist
                                                            .genres.length -
                                                            1 && <p>-</p>}
                                                </h4>
                                            )
                                        )}
                                    </div>
                                )}
                                {renderGeniusComponent([
                                    geniusArtist !== undefined,
                                ]) &&
                                    geniusArtist!.alternate_names.length >
                                        0 && (
                                        <div className='aka'>
                                            <h4>AKA</h4>
                                            {geniusArtist!.alternate_names.map(
                                                (name, nameIndex) => (
                                                    <h4 key={'aka' + nameIndex}>
                                                        {name}
                                                        {nameIndex !==
                                                            geniusArtist!
                                                                .alternate_names
                                                                .length -
                                                                1 && <p>-</p>}
                                                    </h4>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className='artist-main'>
                        <div className='object-main-container'>
                            {spotifyArtist!.topTracks.length > 0 && (
                                <>
                                    <h1 className='section-title'>
                                        Top Tracks
                                    </h1>
                                    <div className='top-tracks'>
                                        <div className='scroll-container'>
                                            {spotifyArtist!.topTracks.map(
                                                (track: SpotifyTrack) => (
                                                    <Card
                                                        object={track}
                                                        key={track.id}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {spotifyArtist!.albums.length > 0 && (
                                <>
                                    <h1 className='section-title'>Albums</h1>
                                    <div className='albums'>
                                        <div className='scroll-container'>
                                            {spotifyArtist!.albums.map(
                                                (album: SpotifyAlbum) => (
                                                    <Card
                                                        object={album}
                                                        key={album.id}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
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

export default ArtistPage
