import { useDispatch } from "react-redux";

const error = "error"
const success = "success"
const info = "info"

function cleanMessage(data){
  const date = new Date()
  let lifespan = 3 // seconds
  switch(data.messageType){
    case error:
      return {
        type: error,
        timeout: lifespan,
        expires: date.setSeconds(date.getSeconds() + lifespan)
      }
    case success:
      return {
        type: success,
        timeout: lifespan,
        expires: date.setSeconds(date.getSeconds() + lifespan)
      }
    default:
      return {
        type: info,
        timeout: lifespan,
        expires: date.setSeconds(date.getSeconds() + lifespan)
      }
  }
}

function useMessages(){
  const dispatch = useDispatch()
  function addMessage(data){

    try{
      const cleaned = cleanMessage(data)
      dispatch({
        type: "ADD_MESSAGE",
        message: {
          id: Math.random().toString(36).substring(2),
          text: data.text,
          messageType: cleaned.type,
          timeout: cleaned.timeout,
          expires: cleaned.expires
        }

      })
    }
    catch(err){
      const errorMessage = cleanMessage({messageType: error})
      dispatch({
        type: "ADD_MESSAGE",
        message: {
          id: Math.random().toString(36).substring(2),
          text: "Error: unable to add message",
          messageType: errorMessage.type,
          timeout: errorMessage.timeout,
          expires: errorMessage.expires
        }
      })
    }

  }
  function deleteMessage(id){
    try{
      dispatch({
        type: "REMOVE_MESSAGE",
        id: id
      })
    }
    catch(err){
      dispatch({
        type: "ADD_MESSAGE",
        message: {
          id: Math.random().toString(36).substring(2),
          text: `Error: unable to delete message: with id: ${id}`,
          messageType: error
        }
      })
    }
  }
  return{addMessage, deleteMessage}
}

export default useMessages