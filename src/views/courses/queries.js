import gql from "graphql-tag"
import { pageInfoFragment } from "../../fragments/pageinfo"
import { ProductFragment } from "../../fragments/products"
import makeQuery from "../../hooks/makeQuery"


export const product = gql`
  ${ProductFragment}
  ${pageInfoFragment}
  query Products(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $filter:  ProductFilterInput
    $sort: ProductOrder
  ){
    products(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
      sortBy: $sort
      ){
    edges{
      node{
        ...Product
      }
    }
    pageInfo{
      ...PageInfoFragment
    }
  }
}
`


export const categories = gql`
${pageInfoFragment}
query Categories(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ){
  categories(
    first: $first
    after: $after
    last: $last
    before: $before
  ){
  edges{
    node{
      id
      name
    }
  }
  pageInfo{
    ...PageInfoFragment
    }
  }
}
`

export const useCategoriesQuery = makeQuery(categories)
export const useProductsQuery = makeQuery(product)
