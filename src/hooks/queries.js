import gql from "graphql-tag"
import {Address} from "../fragments/address"
import makeQuery from "./makeQuery"

export const userAddresses = gql`
  ${Address}
  query addresses{
    me{
      addresses{
        ...Address
      }
    }
  }
`

export const useUserAddresses = makeQuery(userAddresses)