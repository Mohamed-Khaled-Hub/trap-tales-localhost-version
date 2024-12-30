import { RefObject, useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
// Types
import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from '../types/Types.ts'
// Hooks
import { useSpotifySearch } from '../hooks/Hooks.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'
// Components
import Loading from '../components/Loading.tsx'
import Card from '../components/Card.tsx'
import Container from '../components/Container.tsx'
import TypeTitle from '../components/TypeTitle.tsx'
import SomethingWentWrong from '../components/SomethingWentWrong.tsx'
// Styles
import '../styles/pages/SearchPage.css'

const SearchPage = () => {
    // Search Query
    const { q } = useParams()
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)
    // Search Results
    const {
        spotifyResults,
        isSpotifyLoading,
        isSpotifyRefetching,
        isSpotifyError,
        spotifyRefetch,
    } = useSpotifySearch(q!)
    // References
    const artistsContainer = useRef<HTMLDivElement>(null)
    const albumsContainer = useRef<HTMLDivElement>(null)
    const tracksContainer = useRef<HTMLDivElement>(null)

    // Change container's display from flex to none, and vice versa
    const changeDisplay = (ref: RefObject<HTMLDivElement>) => {
        const display = ref.current?.computedStyleMap().get('display') as {
            value: string
        }
        ref.current!.style.cssText = `display: ${display.value === 'flex' ? 'none' : 'flex'}`
    }

    useEffect(() => {
        document.title = `${siteInfo.websiteName} | ${q}`
    }, [])

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

    return (
        <div className='search-page'>
            <h2 className='faded-title'>Results for "{q}"</h2>
            <TypeTitle onClick={() => changeDisplay(artistsContainer)}>
                Artists
            </TypeTitle>
            <Container id='artists-container' ref={artistsContainer}>
                {spotifyResults.artists.items.map((artist: SpotifyArtist) => {
                    return (
                        artist.images[0] != undefined && (
                            <Card object={artist} key={artist.id} />
                        )
                    )
                })}
            </Container>
            <TypeTitle onClick={() => changeDisplay(albumsContainer)}>
                Albums
            </TypeTitle>
            <Container id='albums-container' ref={albumsContainer}>
                {spotifyResults.albums.items.map((album: SpotifyAlbum) => {
                    return (
                        album.images[0] != undefined && (
                            <Card object={album} key={album.id} />
                        )
                    )
                })}
            </Container>
            <TypeTitle onClick={() => changeDisplay(tracksContainer)}>
                Tracks
            </TypeTitle>
            <Container id='tracks-container' ref={tracksContainer}>
                {spotifyResults.tracks.items.map((track: SpotifyTrack) => {
                    return (
                        track.album.images[0] != undefined && (
                            <Card object={track} key={track.id} />
                        )
                    )
                })}
            </Container>
        </div>
    )
}

export default SearchPage
