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
      ...User
    }
  }
}
`