import { useMutation } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import urlJoin from "url-join"
import { confirmAccountMutation, createTokenMutation, registerAccountMutation, requestPasswordResetMutation, setPasswordMutation } from "../mutations/auth"
import { accountPasswordReset, confirmAccountPath } from "../views/Account/urls"
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
  function handlePasswordReset(data){
    if(data.requestPasswordReset.errors.length > 0){
      data.requestPasswordReset.errors.forEach(error => {
        addMessage({messageType: "error", text: `Unable to Send Password Reset Email: ${error.code}`})
      })
    }
  }
  function handleAccountConfirmation(data){
    if(data.confirmAccount.errors.length > 0){
      data.confirmAccount.errors.forEach(error => {
        addMessage({messageType: "error", text: `Account Confirmation Encountered Errors: ${error.code}`})
      })
    }
  }
  function handlePasswordSet(data){
    if(data.setPassword.errors.length > 0){
      data.setPassword.errors.forEach(error => {
        addMessage({messageType: "error", text: `Password not reset: ${error.code}`})
      })
    } else {
      dispatch({
        type: "SIGN_IN",
        data: Object.assign(
          {},
          data.setPassword.user,
          {token: data.setPassword.token, refreshToken: data.setPassword.refreshToken})
    })
    }
  }

  const [createToken, {
    data:createTokenData,
    error:createTokenError,
    loading:createTokenLoading}] = useMutation(createTokenMutation, {
      onCompleted: handleTokenCreate,
    })
  const [
    confirmAccount,
    {
      loading:confirmLoading
    }
  ] = useMutation(confirmAccountMutation, {
    onCompleted: handleAccountConfirmation
  })
  const [registerAccount, {
    data:registerAccountData,
    }] = useMutation(
      registerAccountMutation, {
        onCompleted: handleAccountRegister
      }
    )
  const [
    setPassword
  ] = useMutation(
    setPasswordMutation, {
      onCompleted: handlePasswordSet
    }
  )
  const [
    passwordResetRequest
  ] = useMutation(requestPasswordResetMutation, {
    onCompleted: handlePasswordReset
  })
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
  function requestPasswordReset(email){
    // Step 1 of forgot password flow
    const redirectUrl = urlJoin(window.location.origin, accountPasswordReset)
    passwordResetRequest({
      variables: {
        email: email,
        redirectUrl: redirectUrl
      }
    })
  }
  function passwordSet(data){
    // Step 2 of forgot password flow
    setPassword({variables: {
      email: data.email,
      token: data.token,
      password: data.password
    }})
  }
  function tokenRefresh(){
    // console.log("token refresh")
  }
  function createAccount(data){
    if(data.email && data.password){
      const redirectUrl = urlJoin(window.location.origin, confirmAccountPath)
      registerAccount({variables: {
        email: data.email,
        password: data.password,
        redirectUrl: redirectUrl
      }})
      const requiresConfirmation = registerAccountData?.accountRegister?.requiresConfirmation || false
      // const error = hasErrored(maybe(() => registerAccountErrors, false), registerAccountData?.accountRegister)
      return{requiresConfirmation}
    }
  }
  function confirm(data){
    confirmAccount({variables: {
      email: data.email,
      token: data.token
    }})
    return{confirmLoading}
  }
  return{
    user,
    signIn,
    signOut,
    tokenRefresh,
    createAccount,
    requestPasswordReset,
    passwordSet,
    confirm}

}

export default useUser;