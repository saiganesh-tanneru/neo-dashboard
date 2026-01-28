

const getName = (name) => {
  if (typeof name !== 'string') return null
    const trimmed = name.trim()
    const parenMatch = trimmed.match(/^\(?\s*([A-Za-z0-9\s\-_.]+?)\s*\)?$/)
    if (parenMatch && parenMatch[1]) {
        return parenMatch[1].trim()
    }

  // Fallback: return the trimmed string if non-empty
  return trimmed.length ? trimmed : null
}

export function toNeoModel(feedJson, startOrObj, endDateArg) {
  let startDate = null
  let endDate = null

  if (startOrObj && typeof startOrObj === 'object' && ('startDate' in startOrObj || 'endDate' in startOrObj)) {
    startDate = startOrObj.startDate ?? null
    endDate = startOrObj.endDate ?? null
  } else if (typeof startOrObj === 'string' || typeof endDateArg === 'string') {
    startDate = startOrObj || null
    endDate = endDateArg || null
  }

  const neoByDate = (feedJson && feedJson.near_earth_objects) || {}

  const items = Object.entries(neoByDate)
    .flatMap(([date, neos]) => {
      if (!Array.isArray(neos)) return []

      return neos.map((neo) => {
        const approach = Array.isArray(neo && neo.close_approach_data)
          ? (neo.close_approach_data.find((a) => a && a.orbiting_body === 'Earth') || neo.close_approach_data[0])
          : null

        const km = neo && neo.estimated_diameter && neo.estimated_diameter.kilometers
        const kmMin = km && typeof km.estimated_diameter_min === 'number' ? km.estimated_diameter_min : null
        const kmMax = km && typeof km.estimated_diameter_max === 'number' ? km.estimated_diameter_max : null

        const velocityKphRaw = approach && approach.relative_velocity && approach.relative_velocity.kilometers_per_hour
        const missKmRaw = approach && approach.miss_distance && approach.miss_distance.kilometers

        const relativeVelocityKph = velocityKphRaw != null ? Number(velocityKphRaw) : null
        const missDistanceKm = missKmRaw != null ? Number(missKmRaw) : null

        return {
          id: neo && neo.id != null ? neo.id : null,
          name: getName(neo.name),
          date,
          nasaJplUrl: neo && neo.nasa_jpl_url != null ? neo.nasa_jpl_url : null,
          isPotentiallyHazardous: Boolean(neo && neo.is_potentially_hazardous_asteroid),
          isSentryObject: Boolean(neo && neo.is_sentry_object),
          estimatedDiameterKm: {
            min: kmMin,
            max: kmMax,
          },
          closeApproach: approach
            ? {
                date: (approach && approach.close_approach_date) || date,
                dateFull: (approach && approach.close_approach_date_full) || null,
                orbitingBody: (approach && approach.orbiting_body) || null,
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
