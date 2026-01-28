"use strict"

const fp = require('fastify-plugin')

// Lightweight CORS plugin to allow specific origins without external deps.
module.exports = fp(async function (fastify, opts) {
  const allowedOrigins = new Set([
    'http://localhost:3001',
  ])

  fastify.addHook('onRequest', async (request, reply) => {
    const origin = request.headers.origin

    if (origin && allowedOrigins.has(origin)) {
      reply.header('Access-Control-Allow-Origin', origin)
      reply.header('Vary', 'Origin')
    }

    // Always allow common CORS methods/headers for preflight
    reply.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
    reply.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    // Handle OPTIONS preflight quickly
    if (request.raw.method === 'OPTIONS') {
      reply.code(204).send()
    }
  })
})
