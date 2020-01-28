import Express from 'express'
import { render } from './util'

const app = Express()
app.use(Express.static('public'))

app.get('*', (req, res) => {
  res.send(render(req))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
