
'use strict'
const { toNeoModel } = require('../helper/neoModel')

// NOTE: For best practice, move the API key to an env var (NASA_API_KEY) and avoid committing it.
const NEO_API_KEY = process.env.NEO_API_KEY || 'aDNpoYJGkPbqvgbWwiFx8MPy5fsqz6qpc7CmrUzb'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const startDate = request.query?.start_date || '2025-01-01'
    const endDate = request.query?.end_date || '2025-01-05'

    const url = new URL('https://api.nasa.gov/neo/rest/v1/feed')
    url.searchParams.set('start_date', startDate)
    url.searchParams.set('end_date', endDate)
    url.searchParams.set('api_key', NASA_API_KEY)

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
