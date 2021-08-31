import gql from "graphql-tag"

export const fragmentResource = gql`
  fragment Resource on Resource {
    id
    name
    subject{
      id
      name
    }
    publisher{
      id
      name
    }
    image{
      url
      alt
    }
    gradeLevel
    descriptionJson
  }
`