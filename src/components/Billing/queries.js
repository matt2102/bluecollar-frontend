import gql from "graphql-tag"
import { Address } from "../../fragments/address"
import { orderDetailsFragment } from "../../fragments/order"
import { pageInfoFragment } from "../../fragments/pageinfo"
import makeQuery from "../../hooks/makeQuery"

export const userOrderDetails = gql`
  ${pageInfoFragment}
  ${orderDetailsFragment}
  ${Address}
  query Orders(
    $first: Int,
    $last: Int,
    $before: String,
    $after: String
    ){
    me{
      defaultBillingAddress{
        ...Address
      }
      defaultShippingAddress{
        ...Address
      }
      orders(
        first: $first,
        after: $after,
        last: $last,
        before: $before
      ){
        edges{
          node{
            ...OrderDetailFragment
          }
        }
        pageInfo{
          ...PageInfoFragment
        }


      }
    }
  }
`

export const useUserOrdersDetails = makeQuery(userOrderDetails)