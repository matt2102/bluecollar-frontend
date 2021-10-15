import { useMutation } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import urlJoin from "url-join"
import { accountRegisterRedirectUrl } from "../components/Auth/urls"
import { createTokenMutation, registerAccountMutation } from "../mutations/auth"
import { homePath } from "../views/Home/urls"
import useMessages from "./useMessages"
import useNavigator from "./useNavigator"


function useUser(){
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const {addMessage} = useMessages()
  const navigator = useNavigator()
  function handleTokenCreate(data){
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
  function handleAccountRegister(data){
    if(data.accountRegister.errors.length > 0){
      data.accountRegister.errors.forEach(error => {
        addMessage({messageType: "error", text: `Unable to Register Account: ${error.code}`})
      })
    }
  }

  function hasErrored(apolloErrors, gqlErrors){
    if(apolloErrors){
      return true
    }
    if(gqlErrors.errors.length > 0){
      return true
    }
  }

  const [createToken, {
    data:createTokenData,
    error:createTokenError,
    loading:createTokenLoading}] = useMutation(createTokenMutation, {
      onCompleted: handleTokenCreate,
    })

  const [registerAccount, {
    data:registerAccountData,
    errors:registerAccountErrors
    }] = useMutation(
      registerAccountMutation, {
        onCompleted: handleAccountRegister
      }
    )

  function signOut(){
    dispatch({
      type: "SIGN_OUT"
    })
    navigator(homePath)
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
  function createAccount(data){
    if(data.email && data.password){
      const redirectUrl = urlJoin(window.location.origin, accountRegisterRedirectUrl)
      registerAccount({variables: {
        email: data.email,
        password: data.password,
        redirectUrl: redirectUrl
      }})
      const requiresConfirmation = registerAccountData?.accountRegister?.requiresConfirmation || false
      const error = hasErrored(registerAccountErrors, registerAccountData.accountRegister)
      return{requiresConfirmation, error}
    }
  }
  return{user, signIn, signOut, tokenRefresh, createAccount}

}

export default useUser;