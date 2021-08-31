import gql from "graphql-tag"
import { Address } from "../fragments/address"
import { accountErrorFragment } from "../fragments/errors"

export const accountAddAddress = gql`
  ${accountErrorFragment}
  ${Address}
  mutation AddressCreate(
    $id: ID!
    $input: AddressInput!
  ){addressCreate(
    userId:$id, input:$input
  ){
    address{
      ...Address
    }
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}
`

export const accountAddressDelete = gql`
  ${accountErrorFragment}
  ${Address}
  mutation AddressDelete($id:ID!){
    addressDelete(id:$id){
      address{
        ...Address
      }
      errors: accountErrors{
        ...AccountErrorFragment
      }
    }
  }
`

export const accountSetDefault = gql`
  ${accountErrorFragment}
  mutation AddressSetDefault(
    $userId:ID!
    $addressId:ID!
    $type: AddressTypeEnum!
    ){
    addressSetDefault(
      userId:$userId,
      addressId:$addressId,
      type: $type
      ){
      errors: accountErrors{
        ...AccountErrorFragment
      }
    }
  }
`

export const updateAddressMutation = gql`
  ${accountErrorFragment}
  ${Address}
  mutation AddressUpdate(
    $id: ID!
    $input: AddressInput!
  ){addressUpdate(
    id:$id, input:$input
  ){
    address{
      ...Address
    }
    errors: accountErrors{
      ...AccountErrorFragment
    }
  }
}
`