import gql from "graphql-tag"
import { VariantDetailsFragment } from "../../fragments/products";
import makeQuery from "../../hooks/makeQuery";

const variantsDetails = gql`
  ${VariantDetailsFragment}
  query (
    $ids: [ID]
  ){
    productVariants(first: 99, ids: $ids){
      edges{
        node{
          ...VariantDetailsFragment
        }
      }

  }
}
`

export const useVariantsDetails = makeQuery(variantsDetails)