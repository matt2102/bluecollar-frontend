import gql from "graphql-tag"

const user = gql`
query{
    me{
      id
      firstName
      lastName
      email
      avatar{
        url
      }
    }
  }
`