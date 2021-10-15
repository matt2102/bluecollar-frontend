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

export const checkoutErrorFragment = gql`
  fragment CheckoutErrorFragment on CheckoutError {
    message
    field
  }
`

export const paymentErrorFragment = gql`
  fragment PaymentErrorFragment on PaymentError {
    message
    field
  }
`