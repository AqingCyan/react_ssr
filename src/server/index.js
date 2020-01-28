import Express from 'express'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Routes from '../Routes'

const app = Express()
app.use(Express.static('public'))

const { renderToString } = ReactDomServer

app.get('/', (req, res) => {
  const content = renderToString((
    <StaticRouter location={req.path}>
      {Routes}
    </StaticRouter>
  ))

  res.send(`
    <html>
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <title>React SSR</title>
      </head>
        <body>
           <div id="root">${content}</div>
           <script src="index.js"></script>
        </body>
    </html>
  `)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
