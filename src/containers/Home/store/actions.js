import axios from 'axios'
import { CHANGE_LIST } from './constants'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list,
})

export const getHomeList = (server) => (dispatch) => {
  let url = ''
  if (server) {
    url = 'http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE'
  } else {
    url = '/api/news.json?secret=PP87ANTIPIRATE'
  }
  return axios.get(url)
    .then((res) => {
      const list = res.data.data
      dispatch(changeList(list))
    })
}
