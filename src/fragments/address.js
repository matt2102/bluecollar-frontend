import gql from "graphql-tag"

export const Address = gql`
  fragment Address on Address{
    firstName
    lastName
    streetAddress1
    streetAddress2
    city
    postalCode
    phone
    country{
      code
    }
    countryArea
    id
    isDefaultBillingAddress
    isDefaultShippingAddress
  }
`