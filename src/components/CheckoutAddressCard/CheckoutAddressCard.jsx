import { Button, Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useState } from "react"
import useCheckout from "../../hooks/useCheckout"
import AddressCard from "../AddressCard/AddressCard"
import AddressDialog from "../AddressDialog/AddressDialog"


const useStyles = makeStyles(theme => ({
  root: {
    margin: '0',
    marginBottom: theme.spacing(5),
    display: 'flex'
  },
  button: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 150
    },
    [theme.breakpoints.up('sm')]: {
      width: 250
    }
  },
  card: {
    width: '100%'
  }
}))

export const CheckoutAddressCard = (props) => {
  const {
    address,
    addressTitle,
    checkoutAddressEnum
  } = props
  const classes = useStyles()
  const [open, setModal] = useState(false)
  const {updateAddress:updateCheckoutAddress} = useCheckout()
  const createAddress = !address?.id
  const title = 'Add ' + checkoutAddressEnum[0] + checkoutAddressEnum.toLocaleLowerCase().slice(1) + ' Address'
  const onSubmit = (data) => {
    updateCheckoutAddress({
      type: checkoutAddressEnum,
      address: data,
    })
    setModal(false)
  }
  return(
    <>
    <Container className={classes.root}>
      {createAddress?
      <Button
      className={classes.button}
      onClick={()=>setModal(true)}
      variant="containedPrimary"

      >{title}</Button>
      :
      <Container className={classes.card}>
        <AddressCard

          address = {address}
          title = {addressTitle}
          isChildOfCheckout = {true}
          onSubmit={onSubmit}
        />
      </Container>
    }
    </Container>
    <AddressDialog
      address={{}}
      title={title}
      open={open}
      onClose={()=>setModal(false)}
      disabled={false}
      checkoutAddressEnum={checkoutAddressEnum}
      onSubmit={onSubmit}
      />
    </>
  )
}

export default CheckoutAddressCard