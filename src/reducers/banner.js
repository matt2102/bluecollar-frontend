const MARK_SEEN = "MARK_SEEN"

const initialState = {
  banner: []
}



export default function banner(state = initialState, action){
  switch(action.type){
    case MARK_SEEN:
      return Object.assign({}, state, {
        banner: state.banner.concat(action.name)
      })
    default:
      return state
  }
}