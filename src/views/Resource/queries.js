import gql from "graphql-tag"
import { fragmentResource } from "../../fragments/resource"
import makeQuery from "../../hooks/makeQuery"


export const resources = gql`
  ${fragmentResource}
  query Resource(
    $id: ID!
  ){
  resource(
    id: $id
    ){
    ...Resource
    }
  }
`
export const useResourceQuery = makeQuery(resources)