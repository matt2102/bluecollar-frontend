import gql from "graphql-tag"

export const Checkout = gql`
  fragment Checkout on Checkout{
    id
    lines{
      id
      totalPrice{
        net{
          amount
        }
      }
      variant{
        id
      }
    }
    subtotalPrice{
      net{
        amount
      }
    }
}
`

export const CheckoutDetails = gql`
  fragment CheckoutDetails on Checkout{
    token
    id
    subtotalPrice{
      net{
        amount
      }
      tax{
        amount
      }
    }
    shippingMethod{
      id
      name
    }
    lines{
      id
      variant{
        id
        name
        product{
          name
          images{
            url
            alt
          }
        }
      }
      quantity
      totalPrice{
        net{
          amount
        }
      }
    }
    billingAddress{
      id
      firstName
      lastName
      streetAddress1
      streetAddress2
      postalCode
      cityArea
      city
      countryArea
      isDefaultBillingAddress
      isDefaultShippingAddress
      country{
        country
      }
    }
    shippingAddress{
      id
      firstName
      lastName
      streetAddress1
      streetAddress2
      postalCode
      cityArea
      city
      countryArea
      isDefaultBillingAddress
      isDefaultShippingAddress
      country{
        country
      }
    }
    availablePaymentGateways{
      id
      name
    }
    availableShippingMethods{
      id
      name
      price{
        amount
      }
    }
    isShippingRequired
    lastChange
    totalPrice{
    net{
      amount
    }
    gross{
      amount
    }
    tax{
      amount
    }
  }
}
`

export const PaymentDetails = gql`
  fragment PaymentDetails on Payment{
    id
    token
    gateway
    chargeStatus
    total{
      amount
    }
    order{
      token
    }
}`