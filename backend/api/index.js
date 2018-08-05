const apiSubRouter = require('express').Router()

const edges = [
  'test'
]

function registerApi (apiRouter) {
  for (const edge of edges) {
    const api = require(`./api-${edge}`)
    api(apiSubRouter)
    apiRouter.use(`/${edge}`, apiSubRouter)
  }
}

module.exports = registerApi
