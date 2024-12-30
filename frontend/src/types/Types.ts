import {
    Dispatch,
    ReactNode,
    SetStateAction,
    ForwardedRef,
    CSSProperties,
} from 'react'

// Not Exported Types
type SpotifyImage = {
    url: string
    height: number
    width: number
}

type SpotifyMiniArtist = {
    external_urls: ExternalUrl
    href: string
    id: string
    name: string
    type: string
    uri: string
}

type SpotifyMiniAlbum = {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrl
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions: object
    type: string
    uri: string
    artists: SpotifyMiniArtist[]
}

type SpotifyFollowers = {
    href: string
    total: number
}

type ExternalUrl = {
    spotify: string
}

// Props Types
export type ButtonProps = {
    type: 'link' | 'button'
    children?: ReactNode
    to?: string
    onClick?: () => void
    noBg?: boolean
    className?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
    ref?: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
    id?: string
}

export type SearchInputProps = {
    searchQueryState: [string, Dispatch<SetStateAction<string>>]
}

export type CardProps = {
    object: SpotifyArtist | SpotifyAlbum | SpotifyTrack
}

export type ContainerProps = {
    children?: ReactNode
    id?: string
    ref?: ForwardedRef<HTMLDivElement>
    style?: CSSProperties
}

export type TypeTitleProps = {
    children?: ReactNode
    onClick: () => void
}

export type SomethingWentWrongProps = {
    refetchFunc?: () => void
    goTo?: string
    message?: string
    goToText?: string
}

export type BackgroundVideoProps = {
    videoSrc: string
}

export type YouTubeVideoProps = {
    videoId: string
}

export type FormInputProps = {
    id?: string
    placeholder?: string
    type: 'text' | 'password' | 'email'
    valueState: [string, Dispatch<SetStateAction<string>>]
}

// Objects Types
export type HeaderStyleType = {
    background: string
    color: string
}

// Spotify
export type SpotifyArtist = {
    external_urls: ExternalUrl
    followers: SpotifyFollowers
    genres: string[]
    href: string
    id: string
    images: SpotifyImage[]
    name: string
    popularity: number
    type: string
    uri: string
}

export type SpotifyAlbum = {
    album_type: string
    artists: SpotifyMiniArtist[]
    available_markets: string[]
    copyrights: object[]
    external_ids: object
    external_urls: ExternalUrl
    genres: string[]
    href: string
    id: string
    images: SpotifyImage[]
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    tracks: {
        href: string
        items: SpotifyTrack[]
        limit: number
        next: null
        offset: number
        previous: null
        total: number
    }
    type: string
    uri: string
}

export type SpotifyTrack = {
    album: SpotifyMiniAlbum
    artists: SpotifyMiniArtist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: object
    external_urls: ExternalUrl
    href: string
    id: string
    is_playable: boolean
    linked_from: object
    restrictions: object
    name: string
    popularity: number
    preview_url: string | null
    track_number: number
    type: string
    uri: string
    is_local: boolean
    token: string
}

export type SpotifyArtistData = {
    artist: SpotifyArtist
    albums: SpotifyAlbum[]
    topTracks: SpotifyTrack[]
}

// Genius
export type GeniusArtist = {
    alternate_names: string[]
    api_path: string
    current_user_metadata: object
    description: object
    description_annotation: object
    facebook_name: string
    followers_count: number
    header_image_url: string
    id: number
    image_url: string
    instagram_name: string
    iq: number
    is_meme_verified: boolean
    is_verified: boolean
    name: string
    translation_artist: string
    twitter_name: string
    url: string
    user: object
}

export type GeniusTrack = {
    song: {
        description: {
            plain: string
        }
        embed_content: string
        media: {
            provider: string
            url: string
        }[]
    }
    lyrics: string
}

// Contexts Types
export type SiteInfoContextType = {
    websiteName: string
    frontendUrl: string
    backendUrl: string
    published: number
}
