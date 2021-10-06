import gql from "graphql-tag"

export const accountErrorFragment = gql`
  fragment AccountErrorFragment on AccountError {
    code
    field
  }
`;


export const marketingErrorFragment = gql`
  fragment MarketingErrorFragment on MarketingError {
    message
    field
  }
`;