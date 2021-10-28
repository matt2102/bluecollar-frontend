import gql from "graphql-tag"
import { pageInfoFragment } from "../../fragments/pageinfo"
import { fragmentResource } from "../../fragments/resource"
import makeQuery from "../../hooks/makeQuery"


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

export const publishers = gql`
  ${pageInfoFragment}
  query Publishers(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ){
    publishers(
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
`;

export const subjects = gql`
${pageInfoFragment}
query Subjects(
    $first: Int
    $last: Int
    $before: String
    $after: String
  ){
  subjects(
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

export const useSubjectsQuery = makeQuery(subjects)
export const useResourcesQuery = makeQuery(resources)
export const usePublishersQuery = makeQuery(publishers)