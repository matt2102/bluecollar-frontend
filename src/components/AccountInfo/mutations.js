import gql from "graphql-tag"
import { accountErrorFragment } from "../../fragments/errors"
import { userDetails } from "../../fragments/userDetails"

export const customerUpdate = gql`
${accountErrorFragment}
${userDetails}
mutation CustomerUpdate(
  $id: ID!
  $input: CustomerInput!
){
  customerUpdate(
    id: $id,
    input: $input
  ){
    user{
      ...User
    }
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}
`