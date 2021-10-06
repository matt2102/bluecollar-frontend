import gql from "graphql-tag"
import { marketingErrorFragment } from "../fragments/errors"

export const endpointCreate = gql`
  ${marketingErrorFragment}
  mutation EndpointCreate(
    $input: EndpointInput!
  ){
    endpointCreate(
      input: $input
    ){
      errors: marketingErrors{
        ...MarketingErrorFragment
      }
    }
  }
`