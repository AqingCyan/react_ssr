import Express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import render from './util'
import { getStore } from '../store'
import routes from '../Routes'

const app = Express()
app.use(Express.static('public'))
app.use('/api', proxy('http://47.95.113.63', {
  proxyReqPathResolver: (req) => `/ssr/api${req.url}`,
}))

app.get('*', (req, res) => {
  const store = getStore()
  // 根据路由来获取对应组件的loadData方法，再让matchedRoutes中所有组件的loadData方法执行一次让store拿到state
  const matchedRoutes = matchRoutes(routes, req.path)
  const promises = []
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises.push(item.route.loadData(store))
    }
  })
  Promise.all(promises).then(() => {
    res.send(render(store, routes, req))
  })
})

app.listen(3000, () => console.log('ReactSSR project is listening on port 3000!'))
