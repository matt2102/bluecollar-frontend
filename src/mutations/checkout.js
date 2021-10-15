import gql from "graphql-tag"
import { CheckoutDetails, PaymentDetails } from "../fragments/checkout"
import { checkoutErrorFragment, paymentErrorFragment } from "../fragments/errors"
import { OrderFragment } from "../fragments/order"
export const checkoutCreateMutation = gql`
  ${checkoutErrorFragment}
  ${CheckoutDetails}
  mutation CheckoutCreate(
    $input: CheckoutCreateInput!
  ){
    checkoutCreate(
      input: $input
    ){
      created
      checkout {
        ...CheckoutDetails
      }
      errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
  }
`
export const checkoutShippingAddressMutation = gql`
  ${checkoutErrorFragment}
  ${CheckoutDetails}
  mutation CheckoutShippingAddressUpdate(
    $id: ID!
    $address: AddressInput!
  ){
    checkoutShippingAddressUpdate(
      checkoutId: $id
      shippingAddress: $address
    ){
      checkout {
        ...CheckoutDetails
      }
      errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
  }
`

export const checkoutBillingAddressMutation = gql`
  ${checkoutErrorFragment}
  ${CheckoutDetails}
  mutation CheckoutBillingAddressUpdate(
    $id: ID!
    $address: AddressInput!
  ){
    checkoutBillingAddressUpdate(
      checkoutId: $id
      billingAddress: $address
    ){
      checkout {
        ...CheckoutDetails
      }
      errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
  }
`

export const checkoutLinesAddMutation = gql`
  ${checkoutErrorFragment}
  ${CheckoutDetails}
  mutation CheckoutLinesAdd(
    $id: ID!
    $lines: [CheckoutLineInput]!
  ){
    checkoutLinesAdd(
      checkoutId: $id
      lines: $lines
    ){
      checkout {
        ...CheckoutDetails
      }
      errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
  }
`

export const checkoutLineDeleteMutation = gql`
  ${checkoutErrorFragment}
  ${CheckoutDetails}
  mutation CheckoutLineDelete(
    $id: ID!
    $lineId: ID!
  ){
    checkoutLineDelete(
      checkoutId: $id
      lineId: $lineId
    ){
      checkout {
        ...CheckoutDetails
      }
      errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
  }
`

export const checkoutPaymentCreateMutation = gql`
  ${paymentErrorFragment}
  ${CheckoutDetails}
  ${PaymentDetails}
  mutation CheckoutPaymentCreate(
    $id: ID!
    $input: PaymentInput!
  ){
    checkoutPaymentCreate(
      checkoutId: $id
      input: $input
    ){
      checkout {
        ...CheckoutDetails
      }
      payment {
        ...PaymentDetails
      }
      errors: paymentErrors{
        ...PaymentErrorFragment
      }
    }
  }
`

export const checkoutCompleteMutation = gql`
${checkoutErrorFragment}
${OrderFragment}
mutation CheckoutComplete(
    $id: ID!
    $url: String!
    $storeCard: Boolean!
    ){
    checkoutComplete(
        checkoutId: $id
        redirectUrl: $url
        storeSource: $storeCard
        ){
        confirmationNeeded
        order{
          ...OrderFragment
        }
        errors: checkoutErrors{
        ...CheckoutErrorFragment
      }
    }
}
`;