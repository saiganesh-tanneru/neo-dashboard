export interface EstimatedDiameter {
    min: number | null
    max: number | null
}

export interface CloseApproach {
    date: string
    dateFull: string | null
    orbitingBody: string | null
    relativeVelocityKph: number | null
    missDistanceKm: number | null
}

export interface NeoItem {
    id: string | null
    name: string | null
    date: string
    nasaJplUrl: string | null
    isPotentiallyHazardous: boolean
    isSentryObject: boolean
    estimatedDiameterKm: EstimatedDiameter
    closeApproach: CloseApproach | null
}

export interface NeoModelResult {
    range: {
        startDate: string
        endDate: string
    }
    count: number
    items: NeoItem[]
}

export interface FeedJson {
    near_earth_objects?: Record<string, any[]>
}
