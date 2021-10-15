import gql from "graphql-tag"

export const ProductFragment = gql`
  fragment Product on Product {
    id
    name
    category{
      id
      name
    }
    images{
      id
      url
      alt
    }
  }
`

export const ProductDetailsFragment = gql`
  fragment ProductDetailsFragment on Product {
    id
    name
    descriptionJson
    variants{
      id
      name
      quantityAvailable
      pricing{
        price{
          net{
            amount
          }
        }
      }

    }
    images{
      id
      url
      alt
    }
}
`

export const VariantDetailsFragment = gql`
  fragment VariantDetailsFragment on ProductVariant {
    id
    name
    product{
      name
      images{
        id
        alt
        url
      }
    }
    pricing{
      price{
        net{
          amount
      }
    }
  }
}
`;