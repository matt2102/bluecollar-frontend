import { pageInfoFragment } from "../../fragments/pageinfo"
import { fragmentResource } from "../../fragments/resource"

export const resources = gql`
  ${fragmentResource}
  ${pageInfoFragment}
  query Resource(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $filter: ResourceFilterInput
    $sort: ResourceSortingInput
  ){
    resources(
      first: $first
      after: $after
      last: $last
      before: $before
      filter: $filter
      sortBy: $sort
      ){
    edges{
      node{
        ...Resource
      }
    }
    pageInfo{
      ...PageInfoFragment
    }
  }
}
`