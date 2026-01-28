
'use strict'
const { toNeoModel } = require('../helper/neoModel')

const NEO_API_KEY = process.env.NEO_API_KEY || 'DEMO_KEY'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {

    // helpers
    const isValidDateString = (s) => {
      if (typeof s !== 'string') return false
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
      const d = new Date(s)
      if (Number.isNaN(d.getTime())) return false
      const [y, m, day] = s.split('-').map(Number)
      return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day
    }

    const daysBetween = (a, b) => Math.round((b - a) / (24 * 60 * 60 * 1000))

    let startDate = request.query?.start_date
    let endDate = request.query?.end_date

    // Validate formats
    if (!isValidDateString(startDate) || !isValidDateString(endDate)) {
      reply.code(400)
      return { error: 'Invalid date format', message: 'start_date and end_date must be in YYYY-MM-DD format' }
    }

    const s = new Date(startDate)
    const e = new Date(endDate)

    if (s > e) {
      reply.code(400)
      return { error: 'Invalid date range', message: 'start_date must be on or before end_date' }
    }

    // NASA NEO feed supports up to 7 days per request
    const span = daysBetween(s, e)
    if (span > 7) {
      reply.code(400)
      return { error: 'Date range too large', message: 'maximum range is 7 days' }
    }

    const url = new URL('https://api.nasa.gov/neo/rest/v1/feed')
    url.searchParams.set('start_date', startDate)
    url.searchParams.set('end_date', endDate)
    url.searchParams.set('api_key', NEO_API_KEY)

    const res = await fetch(url)

    if (!res.ok) {
      reply.code(res.status)
      return {
        error: 'NASA API request failed',
        status: res.status,
      }
    }

    const feedJson = await res.json()

    // Return a modeled, UI-friendly response instead of the raw nested JSON
    return toNeoModel(feedJson, { startDate, endDate })
  })
}
