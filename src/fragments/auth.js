import gql from "graphql-tag"

export const fragmentUser = gql`
  fragment AuthUser on User {
    id
    email
    firstName
    lastName
    avatar{
      url
    }
  }
`;
