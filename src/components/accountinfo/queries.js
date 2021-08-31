import gql from "graphql-tag"
import { userDetails } from "../../fragments/userDetails"
import makeQuery from "../../hooks/makeQuery"

export const userQuery = gql`
  ${userDetails}
  query{
    me{
      ...User
    }
  }
`

export const useUserQuery = makeQuery(userQuery)