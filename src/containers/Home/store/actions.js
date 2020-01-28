import axios from 'axios'

export const getHomeList = () => () => {
  axios.get('http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE')
    .then((res) => {
      console.log(res)
    })
}
