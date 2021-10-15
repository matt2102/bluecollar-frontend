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