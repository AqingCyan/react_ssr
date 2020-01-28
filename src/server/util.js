import React from 'react'
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
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
        <style>
          * {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
        <body>
           <div id="root">${content}</div>
           <script src="index.js"></script>
        </body>
    </html>
  `)
}
