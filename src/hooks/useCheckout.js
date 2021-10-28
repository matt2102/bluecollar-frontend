import {useEffect, useState} from "react"
import { useUserCheckout } from "./queries"
import useMessages from "./useMessages"
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import {
  checkoutBillingAddressMutation,
  checkoutCreateMutation,
  checkoutLineDeleteMutation,
  checkoutLinesAddMutation,
  checkoutPaymentCreateMutation,
  checkoutShippingAddressMutation,
  checkoutCompleteMutation
} from "../mutations/checkout";
import { ADD_SERVER_CHECKOUT } from "../reducers/checkout";
import urljoin from "url-join";
import { accountPurchasedCourses } from "../views/Account/urls";
import useNavigator from "./useNavigator";
import useUser from "./useUser";
import { maybe } from "../misc";

export const BILLING = "BILLING"
export const SHIPPING = "SHIPPING"
export const BOTH = "BOTH"

export const enums = new Set([BILLING, SHIPPING, BOTH])

function useCheckout(){
  /*

  Checkout can be created with checkout lines

  email is *required* to create a checkout obj

  while we don't have an email we are forced to keep the
  checkout state locally

  once we create a checkout a token is returned to
  reference the checkout object later

  */
  const {data} = useUserCheckout({})
  const dispatch = useDispatch()
  const navigator = useNavigator()
  const {addMessage} = useMessages()
  const {user} = useUser()
  const localCheckout = useSelector(state => state?.checkout?.checkout)
  const [isLoading, setLoading] = useState(false)
  const [triggerSync, setTriggerSync] = useState(false)
  const [serverCheckout, setServerCheckout] = useState(null)
  const [lastDeleted, setLastDeleted] = useState("")
  const [token, setToken] = useState(localCheckout.displayData?.token || "")
  function getCheckout(){
    // compares local checkout with serverCheckout and returns the appropriate one
    if(token !== "" && serverCheckout !== null){
      return serverCheckout
    }
    return localCheckout
  }

  function saveCheckoutLocally(ch){
    dispatch({
      type: ADD_SERVER_CHECKOUT,
      checkout: ch
    })
  }

  const checkout = getCheckout()

  function handleApolloError(){
      addMessage({
        messageType: "error",
        text: "Unable to register cart with server"
      })
  }
  function handleServerError(errors){
    setLoading(false)
    errors.forEach(err => {
      addMessage({
        messageType: "error",
        text: `${err.message}`
    })
    });
  }
  function handleCreatedCheckout(i){
    const d = i.checkoutCreate
    if(d.errors.length === 0){
      dispatch({
        type: ADD_SERVER_CHECKOUT,
        checkout: d.checkout
      })
      setLoading(false)
    } else {
      handleServerError(d.errors)
    }
  }
  function handleAddressUpdate(i){
    const d = i.checkoutShippingAddressUpdate || i.checkoutBillingAddressUpdate
    if(d.errors.length > 0){
      handleServerError(d.errors)
    } else {
      setLoading(false)
      dispatch({
        type: ADD_SERVER_CHECKOUT,
        checkout: d.checkout
      })
    }
  }
  function handleLinesAdd(i){
    const d = i.checkoutLinesAdd
    if(d.errors.length > 0){
      handleServerError(d.errors)
    } else {
      setLoading(false)
      setToken(d.token)
      setServerCheckout(d.checkout)
      dispatch({
        type: ADD_SERVER_CHECKOUT,
        checkout: d.checkout
      })
    }
  }

  function handleLinesDelete(i){
    const d = i.checkoutLineDelete
    if(d.errors.length > 0){
      handleServerError(d.errors)
    } else {
      setLoading(false)
      setToken(d.token)
      setServerCheckout(d.checkout)
      dispatch({
        type: ADD_SERVER_CHECKOUT,
        checkout: d.checkout
      })
      dispatch({
        type: "REMOVE_ITEM",
        data: {
          variantId: lastDeleted
        }
      })
    }
  }
  function handleCheckoutComplete(i){
    const d = i.checkoutComplete
    if(d.errors.length > 0){
      handleServerError(d.errors)
    }else{

      navigator(accountPurchasedCourses)
      setLoading(false)
      addMessage({text: "Order Placed!"})
      dispatch({
        type: "CLEAR_CHECKOUT"
      })


    }
  }

  const [checkoutComplete, {
    loading: l1
  }] = useMutation(
    checkoutCompleteMutation,{
      onCompleted: handleCheckoutComplete,
      onError: handleApolloError
    })

  function handlePaymentProcess(i){
    const d = i.checkoutPaymentCreate
    if(d.errors.length > 0){
      handleServerError(d.errors)
    } else {
      const redirect = urljoin(window.location.origin, accountPurchasedCourses)
      checkoutComplete({
        variables: {
          id: d.checkout.id,
          url: redirect,
          storeCard: false
        }
      })
    }

  }
  const [createCheckout] = useMutation(checkoutCreateMutation, {
    onCompleted: handleCreatedCheckout,
    onError: handleApolloError
  })

  const [shippingUpdate] = useMutation(checkoutShippingAddressMutation, {
    onCompleted: handleAddressUpdate,
    onError: handleApolloError
  })
  const [billingUpdate] = useMutation(checkoutBillingAddressMutation, {
    onCompleted: handleAddressUpdate,
    onError: handleApolloError
  })

  const [addLines] = useMutation(checkoutLinesAddMutation, {
    onCompleted: handleLinesAdd,
    onError: handleApolloError
  })

  const [removeLine] = useMutation(checkoutLineDeleteMutation, {
    onCompleted: handleLinesDelete,
    onError: handleApolloError
  })

  const [processPayment, {loading: l2}] = useMutation(checkoutPaymentCreateMutation, {
    onCompleted: handlePaymentProcess,
    onError: handleApolloError
  })

  function addItem(variantId, qty){
    /*
    Three different behaviors expected based on user status

    Guest -> Save Cart state locally

    Signed In w/o token -> create checkout and return token

    Signed In w/Token -> Update checkout lines
    */

    function addItemLocally(){
      dispatch({
        type: "ADD_ITEM",
        data: {
          variantId: variantId,
          quantity: qty,
        }
      })
      addMessage({text: "Added to Cart"})
    }
    function addItemRemotely(){
      addLines({
        variables: {
          id: localCheckout.displayData.id,
          lines: [{
            variantId: variantId,
            quantity: qty
          }]
        }
      })
      addMessage({text: "Added to Cart"})
    }
    function isUnique(){
      const lines = checkout.lines
      const itemExists = lines.filter(l => (l.variantId === variantId))
      if(itemExists.length > 0){
        addMessage({text: "Item Already In Cart"})
        return false
      }
      return true
    }
    if(isUnique()){
      if(user.isGuest){
        addItemLocally()
      } else {
        if(token){
          setLoading(true)
          addItemRemotely()
        }
        addItemLocally()
        attachCartToUser()
      }
    }
  }

  function removeItem(variantId){
    if(token){
      const lineId = localCheckout.displayData.lines.filter(
        l => l.variant.id === variantId
      )
      if(lineId.length === 0){
        addMessage({
          messageType: "error",
          text: "Item does not exist"
        })
      } else {
        setLoading(true)
        removeLine({
          variables: {
            id: localCheckout.displayData.id,
            lineId: lineId[0].id
          }
        })
        setLastDeleted(variantId)
      }
    } else {
      dispatch({
        type: "REMOVE_ITEM",
        data: {
          variantId: variantId
        }
      })
    }
  }
  function clear(){
    dispatch({
      type: "CLEAR_CHECKOUT"
    })
  }
  function updateItemQty(variantId, qty){
    const v = checkout.lines.filter(l => l.variantId === variantId)
    if(v.length === 1){
      dispatch({
        type: "UPDATE_ITEM",
        data: {
          variantId: variantId,
          quantity: qty,
        }
      })
    } else{
      addMessage({
        text: "Cannot Update Item.  Item is not in cart."
      })
    }

  }

  function attachCartToUser(){
    /*
    Sync's local cart to server.

    input {
      email *required
      lines * required
      shippingAddress *optional
      billingAddress *optional
    }

    returns loading
    */
    function validate(){
      return (
        (user.email !== "") &&
        (localCheckout.lines.length > 0) &&
        (token === "")
      )
    }
    function clean(){
      const c = {
        lines: localCheckout.lines,
        email: user.email
      }
      return c
    }

    if(validate()){
      setLoading(true)
      createCheckout({variables: {
        input: clean()
      }})
    } else {
      addMessage({
        text: "Unable to process request"
      })
    }
  }

  function updateAddress(data){
    /*
    Updating and Creating checkout addresses
    is the same method

    input: {
      address AddressInput *required
      type AddressTypeEnum[BILLING, SHIPPING, BOTH] *required
    }
    return checkoutDetails fragment
    */
    function clean(addr){
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
    if(checkout.displayData.id){
      // refetch()
      const id = checkout.displayData.id
      const a = clean(data.address)
      const t = data.type
      if(t === BILLING){
          billingUpdate({
            variables: {
              id: id,
              address: a
            }
          })
      }
      if(t === SHIPPING){
        shippingUpdate({
          variables: {
            id: id,
            address: a
          }
        })
      }
      if(t === BOTH){
          billingUpdate({
            variables: {
              id: id,
              address: a
            }
          })
          shippingUpdate({
            variables: {
              id: id,
              address: a
            }
          })
      }
      return true
    }

  }
  function completeCheckout(paymentToken){
    setLoading(true)
    processPayment({variables: {
      id: checkout.displayData.id,
      input: {
        gateway: "mirumee.payments.stripe",
        token: paymentToken,
        amount: checkout.displayData.totalPrice.gross.amount
      }
    }})
    return isLoading
  }

  function sync(){
    // sync local and server checkouts
    const local = localCheckout.lines // local
    const r = localCheckout.displayData?.lines || [] //remote
    const ch = maybe(() => data.me.checkout, null)
    const remote = []
    r.map(l => (remote.push({
      variantId: l.variant.id,
      quantity: l.quantity
    })))

    function checkLines(arr1, arr2){
      // checks arr1 against arr2
      // both arrays need to be structured the same
      const toDelete = new Set()
      const toCreate = []
      const toUpdate = {}
      if(arr1.length === 0 && arr2.length === 0){
        return{
          toDelete,
          toCreate,
          toUpdate
        }
      }
      const arr2Ids = new Set()
      arr2.map(i => (arr2Ids.add(i.variantId)))
      const arr1Ids = new Set()
      arr1.map(i => (arr1Ids.add(i.variantId)))
      arr1.forEach(i => {
        const id = i.variantId
        const qty = i.quantity
        if(!arr2Ids.has(id)){
          toCreate.push({
            variantId: id,
            quantity: qty})
        } else {
          const q = arr2.filter(j => j.id === i.id)[0].quantity
          if(q !== qty){
            toUpdate[id] = qty
          }
        }
      })
      arr2.forEach(j => {
        if(!arr1Ids.has(j.variantId)){
          toDelete.add(j.variantId)
        }
      })
      return{
        toDelete,
        toCreate,
        toUpdate
      }
    }
    // console.log('local', local)
    // console.log('remote', remote)
    // console.log('remote -> local', checkLines(remote, local))
    // console.log('local -> remote', checkLines(local, remote))
    function remoteMaster(){
      // change the local state to match the remote (server) state
      // if(remote.length === 0){
      //   return
      // }
      if(ch === null){
        return
      }
      const {toCreate, toDelete, toUpdate} = checkLines(remote, local)
      if(toCreate.length > 0){
        dispatch({
          type: 'ADD_ITEMS',
          lines: toCreate
        })
      }
      if(toDelete.size > 0){
        dispatch({
          type: 'REMOVE_ITEMS',
          idSet: toDelete
        })
      }
      if(toUpdate.size > 0){
        // TODO implement this logic
        // dispatch({
        //   type: 'REMOVE_ITEMS',
        //   idSet: toDelete
        // })
      }
    }
    function localMaster(){
      // change the remote (server) state to match the local state
      // const {toCreate, toDelete, toUpdate} = checkLines(local, remote)
      return null
    }

    return{
      remoteMaster,
      localMaster
    }
  }
  const {remoteMaster} = sync()
  remoteMaster()
  if(triggerSync){
    saveCheckoutLocally(data.me.checkout)
    remoteMaster()
    setTriggerSync(false)
  }
  useEffect(()=> {
    if(
      (!!data?.me?.checkout?.id) && // server returns a checkout obj
        (
        (token !== data.me.checkout.token) || // checkout obj not in local state
        (localCheckout.displayData?.lastChange !== data.me.checkout.lastChange) // server data has changed
        )
      ){
        // add to local state
        setTriggerSync(true)
    }
  }, [data, localCheckout, token, triggerSync, setTriggerSync])


  useEffect(()=> {
    if(!(!l1 && !l2) && !isLoading){
      setLoading(true)
    }
  }, [l1, l2, isLoading, setLoading])
  return{
    addItem,
    removeItem,
    updateItemQty,
    clear,
    data,
    checkout,
    token,
    attachCartToUser,
    updateAddress,
    completeCheckout,
    isLoading
  }
}

export default useCheckout