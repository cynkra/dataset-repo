import React from 'react'
import compression from 'compression'
import config from './config'
import express from 'express'
import render from './render'

export default function() {

  let app = express()

  app.use(compression())

  app.use('/build', express.static('build'))
  app.use('/assets', express.static('assets'))

  app.get('*', (req, res) => {
    render(req.path)
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
