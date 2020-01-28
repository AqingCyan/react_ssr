import React from 'react'
import ReactDomServer from 'react-dom/server'
import { StaticRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

const { renderToString } = ReactDomServer

export default (store, routes, req) => {
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={req.path}>
        {
          routes.map((route) => (
            <Route {...route} />
          ))
        }
      </StaticRouter>
    </Provider>
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
