import gql from "graphql-tag"
import {Address} from "../fragments/address"
import {CheckoutDetails} from "../fragments/checkout"
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

export const checkout = gql`
  ${CheckoutDetails}
  query checkout{
    me{
      checkout{
        ...CheckoutDetails
      }
    }
  }
`

export const useUserAddresses = makeQuery(userAddresses)
export const useUserCheckout = makeQuery(checkout)