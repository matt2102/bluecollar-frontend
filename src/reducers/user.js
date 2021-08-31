const SIGN_IN = "SIGN_IN"
const SIGN_OUT = "SIGN_OUT"
// const UPDATE = "UPDATE"

const initialState = {
  user: {
    isGuest: true
  }
}

export default function user(state = initialState, action){
  switch(action.type){
    case SIGN_IN:
      return Object.assign({}, state, {
        user: {
          isGuest: false,
          ...action.data
        }
      })

    case SIGN_OUT:
      return Object.assign({}, state, initialState)

    default:
      return state
  }
}
