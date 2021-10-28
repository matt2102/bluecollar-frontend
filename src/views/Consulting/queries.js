import gql from "graphql-tag"
import { ProductDetailsFragment } from "../../fragments/products"
import makeQuery from "../../hooks/makeQuery"

const consulting = gql`
  ${ProductDetailsFragment}
  query Products(
      $first: Int
      $filter:  ProductFilterInput
    ){
      products(
      first: $first
      filter: $filter
      ){
    edges{
      node{
        ...ProductDetailsFragment
      }
    }
  }
}
`

export const useConsultingProductQuery = makeQuery(consulting)