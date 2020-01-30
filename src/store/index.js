import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'
import { reducer as headerReducer } from '../components/Header/store'
import serverAxios from '../server/request'
import clientAxios from '../client/request'

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
})

// 避免所有render公用一个store
export const getStore = () => (
  // 改变服务器端的store的内容，就一定要使用serverAxios
  createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
)

export const getClientStore = () => {
  // 改变客户端的store的内容，就一定要使用clientAxios
  const defaultState = window.context.state
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
