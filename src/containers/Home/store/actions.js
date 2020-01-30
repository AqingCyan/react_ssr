import { CHANGE_LIST } from './constants'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list,
})

const getHomeList = () => (dispatch, getState, axiosInstance) => (
  axiosInstance.get('/api/news.json?secret=PP87ANTIPIRATE')
    .then((res) => {
      const list = res.data.data
      dispatch(changeList(list))
    })
)

export default getHomeList
