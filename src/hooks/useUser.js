import { useMutation } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { createTokenMutation } from "../mutations/auth"
import useMessages from "./useMessages"


function useUser(){
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const {addMessage} = useMessages()
  function handleTokenCreate(data){
    console.log(data)
    if(data.tokenCreate.errors.length > 0){
      data.tokenCreate.errors.forEach(error => {
        addMessage({messageType: "error", text: `Unable to Sign In code: ${error.code}`})
      })
    } else {
      dispatch({
          type: "SIGN_IN",
          data: Object.assign(
            {},
            data.tokenCreate.user,
            {token: data.tokenCreate.token, refreshToken: data.tokenCreate.refreshToken})
      })
    }
  }

  const [createToken, {
    data:createTokenData,
    error:createTokenError,
    loading:createTokenLoading}] = useMutation(createTokenMutation, {
      onCompleted: handleTokenCreate,
    })

  function signOut(){
    dispatch({
      type: "SIGN_OUT"
    })
  }
  function signIn(data){

    if(data.email && data.password){
      createToken({variables: {email: data.email, password: data.password}})
      return{createTokenData, createTokenError, createTokenLoading}
    }

  }
  function tokenRefresh(){
    console.log("token refresh")
  }
  return{user, signIn, signOut, tokenRefresh}
}

export default useUser;