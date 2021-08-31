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