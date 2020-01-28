import React from 'react'
import { StaticRouter } from 'react-router-dom'
import ReactDomServer from 'react-dom/server'
import Routes from '../Routes'

const { renderToString } = ReactDomServer

export const render = (req) => {
  const content = renderToString((
    <StaticRouter location={req.path}>
      {Routes}
    </StaticRouter>
  ))
  return (`
    <html lang="zh-CN">
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
}
