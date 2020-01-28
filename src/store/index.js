import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../containers/Home/store'

const reducer = combineReducers({
  home: homeReducer,
})

// 避免所有render公用一个store
const getStore = () => createStore(reducer, applyMiddleware(thunk))

export default getStore
