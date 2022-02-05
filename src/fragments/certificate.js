import gql from "graphql-tag"

export const certificateErrorFragment = gql`
  fragment CertificateErrorFragment on CertificateError {
      field
      code
      message
  }
`


export const certificateDetailsFragment = gql`
    fragment CertificateDetailsFragment on Certificate {
        id
        presentedFor
        presentedTo
        presentedBy
        presentedOn
        generated
        streetAddress1
        streetAddress2
        state
        city
        country
        postalCode
        email
    }
`
