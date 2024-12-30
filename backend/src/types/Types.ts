// Objects Types
export type PrimaryArtistType = {
    name: string
    id: number
}

export type SongType = {
    title: string
    url: string
    id: number
}

export type HitType = {
    result: {
        primary_artist: PrimaryArtistType
        title: string
        id: string
    }
}

export type FrontendTrackType = {
    track: string
    artists: string[]
}

export type TrackIdAndUrlType = {
    id: string
    url: string
}
