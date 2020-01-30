import React from 'react'
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'

const { renderToString } = ReactDomServer

export default (store, routes, req) => {
  const content = renderToString((
    <Provider store={store}>
      <StaticRouter location={req.path}>
        {
          renderRoutes(routes)
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
         <script>window.context={state: ${JSON.stringify(store.getState())}}</script>
         <script src="index.js"></script>
      </body>
    </html>
  `)
}
