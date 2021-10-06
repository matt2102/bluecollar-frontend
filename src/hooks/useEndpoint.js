import { useMutation } from "@apollo/client";
import { useState } from "react";

import {
  endpointCreate
} from "../mutations/endpoint"
import useMessages from "./useMessages";

export function useEndpoint(){
  const {addMessage} = useMessages()
  const [success, setSuccess] = useState(false)
  function handleComplete(msg){
    addMessage({messageType: "success", text: "Subscribed to Newsletter!"})
    setSuccess(true)
  }
  const [createEndpoint] = useMutation(
    endpointCreate, {onCompleted: handleComplete}
  )
  function validateInput(input){
    if(input.firstName === ""){
      return false
    }
    if(input.lastName === ""){
      return false
    }
    if(input.email === ""){
      return false
    }
    return true
  }
  function cleanInput(input){
    return({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      emailOptIn: input.emailOptIn
    })
  }

  function subscribeToNewsletter(info){
    if(validateInput(info)){
      createEndpoint({
        variables: {
          input: cleanInput(info)
        }

      })
    }
  }
  return{
    subscribeToNewsletter,
    success
  }
}