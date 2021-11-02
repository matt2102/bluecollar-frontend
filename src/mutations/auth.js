import gql from "graphql-tag"
import { fragmentUser } from "../fragments/auth"
import { accountErrorFragment } from "../fragments/errors"

export const createTokenMutation = gql`
  ${fragmentUser}
  ${accountErrorFragment}
  mutation createToken($email:String!, $password:String!){
    tokenCreate(email: $email, password: $password) {
    errors: accountErrors{
      ...AccountErrorFragment
    }
    refreshToken
    token
    user {
      ...AuthUser
    }
  }
}
`

export const registerAccountMutation = gql`
  ${fragmentUser}
  ${accountErrorFragment}
  mutation accountRegister(
    $email:String!,
    $password:String!,
    $redirectUrl:String){
    accountRegister(input: {
      email: $email,
      password: $password,
      redirectUrl: $redirectUrl
    }){
    requiresConfirmation
    user {
      ...AuthUser
    }
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}
`

export const requestPasswordResetMutation = gql`
  ${accountErrorFragment}
  mutation requestPasswordReset(
    $email: String!
    $redirectUrl: String!
  ){
    requestPasswordReset(
      email: $email,
      redirectUrl: $redirectUrl
    ){
      errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}
`

export const setPasswordMutation = gql`
 ${accountErrorFragment}
 ${fragmentUser}
mutation SetPassword(
  $email: String!
  $token: String!
  $password: String!
){
  setPassword(
    email: $email
    token: $token
    password: $password
  ){
    user{
      ...AuthUser
    }
    refreshToken
    token
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}`

export const confirmAccountMutation = gql`
 ${accountErrorFragment}
mutation ConfirmAccount(
  $email: String!
  $token: String!
){
  confirmAccount(
    email: $email
    token: $token
  ){
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}`