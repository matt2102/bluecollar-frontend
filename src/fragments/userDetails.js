import gql from "graphql-tag"

export const userDetails = gql`
  fragment User on User{
    id
    firstName
    lastName
    email
    defaultBillingAddress{id}
    defaultShippingAddress{id}
    dateJoined
}
`