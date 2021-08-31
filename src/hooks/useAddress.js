import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
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
  console.log("address data", data)
  const {addMessage} = useMessages()
  const {user} = useUser()
  const [defaults, setDefaults] = useState({})
  function handleComplete(){
    addMessage({messageType: "success", text: "Address Updated"})
  }
  const [createAccountAddress,{
    data: accountAddressCreateData,
    error: accountAddressCreateError,
    loading: accountAddressCreateLoading
  }] = useMutation(accountAddAddress, {onCompleted:handleComplete})

    const [deleteAccountAddress,{
      data: accountAddressDeleteData,
      error: accountAddressDeleteError,
      loading: accountAddressDeleteLoading
    }] = useMutation(accountAddressDelete, {onCompleted:handleComplete})

    const [setDefaultAddress,{
      data: accountAddressSetDefaultData,
      error: accountAddressSetDefaultError,
      loading: accountAddressSetDefaultLoading
    }] = useMutation(accountSetDefault, {onCompleted:handleComplete})

    const [updateAddress,{
      data: addressUpdateData,
      error: addressUpdateError,
      loading: addressUpdateLoading
    }] = useMutation(updateAddressMutation, {onCompleted:handleComplete})

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
    }
  }
  function update(id, addr){
    console.log("cleaned: ", cleanAddress(addr))
    if(verifyAddress(addr)){
      updateAddress({
        variables: {
          input: cleanAddress(addr),
          id: id
        }
      })
    }
  }
  function deleteAddress(id){
    deleteAccountAddress({
      variables: {id: id}
    })
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
  }
  function setDefaultBilling(id){
    setDefault(id, BILLING)
  }
  function getDefaultAddresses(){
    const defaultShipping = maybe(()=> data.me.addresses.filter(node => node.isDefaultShippingAddress)[0], {})
    const defaultBilling = maybe(()=> data.me.addresses.filter(node => node.isDefaultBillingAddress)[0], {})
    return{defaultShipping, defaultBilling}
  }
  // let defaults = getDefaultAddresses()
  useEffect(() => {
    console.log("recomputed defaults", data)
    if(data?.me?.addresses?.length >= 0){
    setDefaults(getDefaultAddresses())
    }
  }, [data, loading, refetch])
  // const
  // useEffect(()=> {
  //   defaults = getDefaultAddresses()
  // }, [data, defaults])
  console.log("address defaults", defaults)
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