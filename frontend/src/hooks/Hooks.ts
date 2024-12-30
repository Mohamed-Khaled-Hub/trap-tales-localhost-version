import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
// APIs
import { FastAverageColor } from 'fast-average-color'
// Types
import {
    SpotifyArtistData,
    SpotifyAlbum,
    SpotifyTrack,
    GeniusArtist,
    HeaderStyleType,
    GeniusTrack,
} from '../types/Types.ts'
// Functions
import { getCssVar, getFromAssets } from '../functions/Functions.ts'
// Contexts
import { SiteInfoContext } from '../contexts/Contexts.ts'

// Spotify Hooks
export const useSpotifySearch = (q: string) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Results of Searching by 'q' with useQuery
    const {
        data: spotifyResults,
        isLoading: isSpotifyLoading,
        isError: isSpotifyError,
        isFetched: isSpotifyFetched,
        isRefetching: isSpotifyRefetching,
        refetch: spotifyRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .get(`${siteInfo.backendUrl}/spotify/searchResults/${q}`)
                .then((res) => res.data)
        },
        queryKey: ['searchResults'],
    })

    return {
        spotifyResults,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    }
}

export const useSpotifyArtist = (id: string) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Artist with useQuery
    const {
        data: spotifyArtist,
        isLoading: isSpotifyLoading,
        isError: isSpotifyError,
        isFetched: isSpotifyFetched,
        isRefetching: isSpotifyRefetching,
        refetch: spotifyRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .get(`${siteInfo.backendUrl}/spotify/getArtist/${id}`)
                .then((res) => res.data as SpotifyArtistData)
        },
        queryKey: ['spotifyArtist'],
    })

    return {
        spotifyArtist,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    }
}

export const useSpotifyAlbum = (id: string) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Album with useQuery
    const {
        data: spotifyAlbum,
        isLoading: isSpotifyLoading,
        isError: isSpotifyError,
        isFetched: isSpotifyFetched,
        isRefetching: isSpotifyRefetching,
        refetch: spotifyRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .get(`${siteInfo.backendUrl}/spotify/getAlbum/${id}`)
                .then((res) => res.data as SpotifyAlbum)
        },
        queryKey: ['album'],
    })

    return {
        spotifyAlbum,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    }
}

export const useSpotifyTrack = (id: string) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Track with useQuery
    const {
        data: spotifyTrack,
        isLoading: isSpotifyLoading,
        isError: isSpotifyError,
        isFetched: isSpotifyFetched,
        isRefetching: isSpotifyRefetching,
        refetch: spotifyRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .get(`${siteInfo.backendUrl}/spotify/getTrack/${id}`)
                .then((res) => res.data as SpotifyTrack)
        },
        queryKey: ['track'],
    })

    return {
        spotifyTrack,
        isSpotifyLoading,
        isSpotifyError,
        isSpotifyFetched,
        isSpotifyRefetching,
        spotifyRefetch,
    }
}

// Genius Hooks
export const useGeniusArtist = (artist: SpotifyArtistData) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Track with useQuery
    const {
        data: geniusArtist,
        isLoading: isGeniusLoading,
        isError: isGeniusError,
        isFetched: isGeniusFetched,
        isRefetching: isGeniusRefetching,
        refetch: geniusRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .get(
                    `${siteInfo.backendUrl}/genius/getArtist/${artist.artist.name}`
                )
                .then((res) => res.data as GeniusArtist)
        },
        queryKey: ['geniusArtist'],
        enabled: false,
    })

    return {
        geniusArtist,
        isGeniusLoading,
        isGeniusError,
        isGeniusFetched,
        isGeniusRefetching,
        geniusRefetch,
    }
}

export const useGeniusTrack = (track: SpotifyTrack) => {
    // Site Info Context
    const siteInfo = useContext(SiteInfoContext)

    // Fetch Track with useQuery
    const {
        data: geniusTrack,
        isLoading: isGeniusLoading,
        isError: isGeniusError,
        isFetched: isGeniusFetched,
        isRefetching: isGeniusRefetching,
        refetch: geniusRefetch,
    } = useQuery({
        queryFn: async () => {
            return await axios
                .post(`${siteInfo.backendUrl}/genius/getTrack`, {
                    trackObject: {
                        track: track.name,
                        artists: track.artists.map((artist) => artist.name),
                    },
                })
                .then((res) => res.data as GeniusTrack)
        },
        queryKey: ['geniusTrack'],
        enabled: false,
    })

    return {
        geniusTrack,
        isGeniusLoading,
        isGeniusError,
        isGeniusFetched,
        isGeniusRefetching,
        geniusRefetch,
    }
}

// Styling Hooks
export const useDominantColor = (
    object: SpotifyArtistData | SpotifyAlbum | SpotifyTrack,
    isFetched: boolean,
    isRefetching: boolean,
    type: 'artist' | 'album' | 'track'
) => {
    // Splitting object based on object.type
    const artist = object as SpotifyArtistData
    const album = object as SpotifyAlbum
    const track = object as SpotifyTrack
    // Dominant Color State
    const [color, setColor] = useState('')
    // Header Style State
    const [style, setStyle] = useState<HeaderStyleType>({} as HeaderStyleType)
    // Dark or Light State
    const [darkOrLight, setDarkOrLight] = useState<string>('dark')
    // Current Theme, in case image of artist, album, or track not loaded
    const theme = useTheme()

    useEffect(() => {
        if (isFetched && !isRefetching) {
            // Get Dominant Color in Image
            new FastAverageColor()
                .getColorAsync(
                    type === 'artist'
                        ? artist.artist.images.length > 0
                            ? artist.artist.images[0].url
                            : getFromAssets(`placeholders/${theme}/PERSON.png`)
                        : type === 'album'
                          ? album.images.length > 0
                              ? album.images[0].url
                              : getFromAssets(`placeholders/${theme}/TRACK.png`)
                          : track.album.images.length > 0
                            ? track.album.images[0].url
                            : getFromAssets(`placeholders/${theme}/TRACK.png`)
                )
                .then((dominantColor) => {
                    setStyle({
                        background: dominantColor.hex,
                        color: getCssVar(
                            dominantColor.isDark ? '--l1' : '--d5'
                        ),
                    })
                    setDarkOrLight(dominantColor.isDark ? 'dark' : 'light')
                    setColor(dominantColor.hex)
                })
        }
    }, [isFetched, isRefetching])

    return { style, darkOrLight, color }
}

export const useTheme = () => {
    // Check Current System Theme
    const getCurrentTheme = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches

    // Theme's State
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getCurrentTheme())

    // Func to Set State when System's Theme changes
    const mqListener = (e: MediaQueryListEvent) => {
        setIsDarkTheme(e.matches)
    }

    useEffect(() => {
        const darkThemeMatch = window.matchMedia('(prefers-color-scheme: dark)')
        darkThemeMatch.addEventListener('change', mqListener)
        return () => darkThemeMatch.removeEventListener('change', mqListener)
    }, [])

    return isDarkTheme ? 'dark' : 'light'
}
