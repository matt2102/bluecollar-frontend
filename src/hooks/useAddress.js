import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { maybe } from "../misc";
import {
  accountAddAddress,
  accountAddressDelete,
  accountSetDefault,
  updateAddressMutation
 } from "../mutations/address";
import { useUserAddresses } from "./queries";
import useMessages from "./useMessages";
import useUser from "./useUser";

const SHIPPING = "SHIPPING"
const BILLING = "BILLING"
export function useAddress(){
  const {data, loading, refetch} = useUserAddresses({})
  const {addMessage} = useMessages()
  const {user} = useUser()
  const [defaults, setDefaults] = useState({})
  function handleCreated(){
    addMessage({text: "Address Created"})
  }
  function handleUpdated(){
    addMessage({text: "Address Updated"})
  }
  function handleDeleted(){
    addMessage({text: "Address Deleted"})
  }
  const [createAccountAddress] = useMutation(accountAddAddress, {onCompleted:handleCreated})

    const [deleteAccountAddress] = useMutation(accountAddressDelete, {onCompleted:handleDeleted})

    const [setDefaultAddress] = useMutation(accountSetDefault, {onCompleted:handleUpdated})

    const [updateAddress] = useMutation(updateAddressMutation, {onCompleted:handleUpdated})

  function verifyAddress(addr){
    // use SmartyStreets API to verify address exists
    return addr? true : false
  }

  function cleanAddress(addr){
    return({
      firstName: addr.firstName,
      lastName: addr.lastName,
      streetAddress1: addr.streetAddress1,
      streetAddress2: addr.streetAddress2,
      city: addr.city,
      postalCode: addr.postalCode,
      phone: addr.phone || "",
      country: addr.country?.code || "US",
      countryArea: addr.countryArea,
    })
  }
  function addAccountAddress(addr){
    if(verifyAddress(addr)){
      createAccountAddress({
        variables: {
          input: cleanAddress(addr),
          id: user.id
        }
      })
      refetch()
    }
  }
  function update(id, addr){
    if(verifyAddress(addr)){
      updateAddress({
        variables: {
          input: cleanAddress(addr),
          id: id
        }
      })
      refetch()
    }

  }
  function deleteAddress(id){
    deleteAccountAddress({
      variables: {id: id}
    })
    refetch()
  }
  function setDefault(addressId, type){
    setDefaultAddress({variables: {
      userId: user.id,
      addressId: addressId,
      type: type
    }})
    refetch()
  }
  function setDefaultShipping(id){
    setDefault(id, SHIPPING)
    refetch()
  }
  function setDefaultBilling(id){
    setDefault(id, BILLING)
    refetch()
  }
  useEffect(() => {
    if(data?.me?.addresses?.length >= 0){
      function getDefaultAddresses(){
        const defaultShipping = maybe(()=> data.me.addresses.filter(node => node.isDefaultShippingAddress)[0], {})
        const defaultBilling = maybe(()=> data.me.addresses.filter(node => node.isDefaultBillingAddress)[0], {})
        return{defaultShipping, defaultBilling}
      }
      setDefaults(getDefaultAddresses())
    }
  }, [data, loading, refetch])
  return{
    data,
    loading,
    addAccountAddress,
    deleteAddress,
    setDefaultBilling,
    setDefaultShipping,
    update,
    ...defaults
  }
}

export default useAddress