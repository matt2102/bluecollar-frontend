const ADD_MESSAGE = "ADD_MESSAGE"
const REMOVE_MESSAGE = "REMOVE_MESSAGE"


const initialState = {
  messages: []
}



const removeMessage = (id, messages) => {
  const filterById = (message) => {
    return message.id !== id
  }
  return messages.filter(message=>filterById(message))
}

export default function message(state = initialState, action){
  switch(action.type){
    case ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: state.messages.concat(action.message)
      })
    case REMOVE_MESSAGE:
      return Object.assign({}, state,
        {messages: removeMessage(action.id, state.messages)
        })
    default:
      return state
  }
}