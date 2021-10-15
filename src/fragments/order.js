import gql from "graphql-tag"

export const orderDetailsFragment = gql`
  fragment OrderDetailFragment on Order{
    id
    paymentStatus
    total{
      net{
        amount
      }
      tax{
        amount
      }
      gross{
        amount
      }
    }
    lines{
      productName
      variantName
      quantity
      unitPrice{
        tax{
          amount
        }
        gross{
        amount
        }
      }
    }
  }
`

export const OrderFragment = gql`
  fragment OrderFragment on Order{
    token
    id
    isPaid
    payments{
      id
      capturedAmount{
        amount
      }
    }
  }
`