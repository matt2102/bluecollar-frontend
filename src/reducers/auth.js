
const ADD_PAYLOAD = "ADD_PAYLOAD"
const REMOVE_PAYLOAD = "REMOVE_PAYLOAD"

const initialState = {
  auth: {}
}

export default function auth(state = initialState, action){
  switch(action.type){
    case ADD_PAYLOAD:
      return Object.assign({}, state, {
        auth: action.payload
      })
    case REMOVE_PAYLOAD:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}