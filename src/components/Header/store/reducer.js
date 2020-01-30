import { CHANGE_LOGIN } from './constants'

const defaultSate = {
  login: false,
}

export default (state = defaultSate, action) => {
  switch (action.type) {
    case CHANGE_LOGIN:
      return {
        ...state,
        login: action.value,
      }
    default:
      return state
  }
}
