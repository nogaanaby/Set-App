const apiSubRouter = require('express').Router()

const edges = [
  'pvp'
]

function registerApi (apiRouter, io) {
  for (const edge of edges) {
    const api = require(`./api-${edge}`)
    api(apiSubRouter, io)
    apiRouter.use(`/${edge}`, apiSubRouter)
  }
}

module.exports = registerApi
