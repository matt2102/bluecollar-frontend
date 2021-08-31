import { Typography, Card, CardHeader, IconButton, CardContent,CardActions, makeStyles } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DeleteIcon from '@material-ui/icons/Delete';
import { maybe } from "../../misc"
import useAddress from "../../hooks/useAddress";
import { useState } from "react";
import AddressDialog from "../AddressDialog/AddressDialog";

const useStyles = makeStyles(theme => ({
  card: {
    boxSizing: "content-box",
    borderWidth: 4,
    borderStyle: "solid",
    borderImage: "linear-gradient(135deg, rgba(59,183,199,1) 35%, rgba(165,200,84,1) 86%, rgba(243,204,23,1) 100%)",
    borderImageSlice: 1,
    // borderRadius: 8
  },
  tagContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
  },
  shipping: {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
    fontFamily: theme.typography.caption,
    padding: 6,
    borderRadius: 15,
    margin: 1
  },
  billing: {
    background: theme.palette.secondary.main,
    color: theme.palette.background.default,
    fontFamily: theme.typography.caption,
    padding: 6,
    borderRadius: 15,
    margin: 1
  }
}))

export const AddressCard=(props)=>{
  const {
    address,
    num
  } = props
  const addr = {
    id: maybe(()=>address.id, ""),
    firstName: maybe(()=>address.firstName, ""),
    lastName: maybe(()=>address.lastName, ""),
    streetAddress1: maybe(()=>address.streetAddress1, ""),
    streetAddress2: maybe(()=>address.streetAddress2, ""),
    city: maybe(()=>address.city, ""),
    countryArea: maybe(()=>address.countryArea, ""),
    postalCode: maybe(()=>address.postalCode, ""),
  }
  const classes = useStyles()
  const [open, setModal] = useState(false)
  const {deleteAddress, setDefaultBilling, setDefaultShipping} = useAddress()
  const isDefaultShipping = address.isDefaultShippingAddress || false
  const isDefaultBilling = address.isDefaultBillingAddress || false
  return(
    <>
    <Card key={addr.id} className={classes.card} elevation={0}>
      <CardHeader
        title={'Address ' + num}
        action={
          <IconButton onClick={()=>deleteAddress(addr.id)}>
            <DeleteIcon/>
          </IconButton>
        }
      />
      <CardContent>
      {isDefaultBilling || isDefaultShipping?
        <div className={classes.tagContainer}>
          {isDefaultShipping?<div className={classes.shipping}>
            <Typography variant="body1">
            Shipping
            </Typography></div>:null}
          {isDefaultBilling?<div className={classes.billing}><Typography variant="body1">
            Billing
            </Typography></div>:null}
        </div>
        :
        null
      }
      <Typography>
        {addr.firstName}{addr.lastName}
      </Typography>
      <Typography>
        {addr.streetAddress1}
        {addr.streetAddress2?<><br></br>{addr.streetAddress2}</>:null}<br></br>
        {addr.city}, {addr.countryArea} {addr.postalCode}
        </Typography>
      </CardContent>
      <CardActions>
        {!isDefaultBilling?
        <IconButton aria-label="make-default-billing" onClick={()=>setDefaultBilling(addr.id)}>
          <ReceiptIcon/>
        </IconButton>
        :
        null}
        {!isDefaultShipping?
        <IconButton aria-label="make-default-shipping" onClick={()=>setDefaultShipping(addr.id)}>
          <LocalShippingIcon/>
        </IconButton>
        :
        null
        }

        <IconButton aria-label="edit-address" onClick={()=>setModal(true)}>
          <EditIcon/>
        </IconButton>

      </CardActions>
    </Card>
    <AddressDialog
      address={addr}
      title={`Update Address ${num}`}
      open={open}
      onClose={()=>setModal(false)}
      disabled={false}
    />
    </>
  )
}

export default AddressCard