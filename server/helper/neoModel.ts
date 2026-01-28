import { NeoModelResult, NeoItem, FeedJson} from '../models/neoModel';

export const toNeoModel = (
    feedJson: FeedJson,
    startDate: string,
    endDate: string
): NeoModelResult => {
    const neoByDate = feedJson?.near_earth_objects || {}

    const items: NeoItem[] = Object.entries(neoByDate)
        .flatMap(([date, neos]) => {
            if (!Array.isArray(neos)) return []

            return neos.map((neo) => {
                const approach = Array.isArray(neo?.close_approach_data)
                    ? neo.close_approach_data.find((a: { orbiting_body: string }) => a?.orbiting_body === 'Earth') || neo.close_approach_data[0]
                    : null

                const km = neo?.estimated_diameter?.kilometers
                const kmMin = typeof km?.estimated_diameter_min === 'number' ? km.estimated_diameter_min : null
                const kmMax = typeof km?.estimated_diameter_max === 'number' ? km.estimated_diameter_max : null

                const velocityKphRaw = approach?.relative_velocity?.kilometers_per_hour
                const missKmRaw = approach?.miss_distance?.kilometers

                const relativeVelocityKph = velocityKphRaw != null ? Number(velocityKphRaw) : null
                const missDistanceKm = missKmRaw != null ? Number(missKmRaw) : null

                return {
                    id: neo?.id ?? null,
                    name: neo?.name ?? null,
                    date,
                    nasaJplUrl: neo?.nasa_jpl_url ?? null,
                    isPotentiallyHazardous: Boolean(neo?.is_potentially_hazardous_asteroid),
                    isSentryObject: Boolean(neo?.is_sentry_object),
                    estimatedDiameterKm: {
                        min: kmMin,
                        max: kmMax,
                    },
                    closeApproach: approach
                        ? {
                                date: approach?.close_approach_date ?? date,
                                dateFull: approach?.close_approach_date_full ?? null,
                                orbitingBody: approach?.orbiting_body ?? null,
                                relativeVelocityKph,
                                missDistanceKm,
                            }
                        : null,
                }
            })
        })
        .sort((a, b) => {
            if (a.date !== b.date) return a.date < b.date ? -1 : 1
            if (a.id && b.id) return String(a.id).localeCompare(String(b.id))
            return String(a.name || '').localeCompare(String(b.name || ''))
        })

    return {
        range: {
            startDate,
            endDate,
        },
        count: items.length,
        items,
    }
}