import gql from "graphql-tag"
import { ProductDetailsFragment } from "../../fragments/products"
import makeQuery from "../../hooks/makeQuery"

const productDetails = gql`
  ${ProductDetailsFragment}
  query ProductDetails(
    $id: ID!
  ){
    product(id: $id){
      ...ProductDetailsFragment
    }
  }
`

export const useProductDetails = makeQuery(productDetails)