import React from 'react'
import compression from 'compression'
import express from 'express'
import render from './render'

export default (config) => {

  const app = express()

  app.use(compression())

  app.use('/build', express.static('build'))
  app.use('/assets', express.static('assets'))

  app.get('*', (req, res) => {
    render(req.path, config)
      .then((result) => {
        res.status(result.status).send(result.html)
      })
      .catch((error) => {
        const msg = error.stack || error
        console.log(msg)
        res.status(500).send('500: ' + msg)
      })
  })

  app.listen(config.port)

  console.log(`App started on port ${config.port}`)

}
