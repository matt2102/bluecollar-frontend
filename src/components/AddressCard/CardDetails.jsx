import { Typography, Card, CardHeader, IconButton, CardContent,CardActions, makeStyles, Collapse, styled } from "@material-ui/core"

import EditIcon from '@material-ui/icons/Edit';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ReceiptIcon from '@material-ui/icons/Receipt';

const useStyles = makeStyles({
  text: {
    fontSize: 18
  },
})

export const CardDetails = (props) => {
  const {
    addr,
    isDefaultBilling,
    setDefaultBilling,
    isDefaultShipping,
    setDefaultShipping,
    setModal
  } = props
  const classes = useStyles()
  const cityDisplay = addr.city.charAt(0) + addr.city.toLocaleLowerCase().slice(1)
  return(
    <>
    <CardContent>
    <Typography className={classes.text}>
      {addr.firstName + ' ' + addr.lastName}
    </Typography>
    <Typography className={classes.text}>
      {addr.streetAddress1}
      {addr.streetAddress2?<><br></br>{addr.streetAddress2}</>:null}
      <br></br>
      {cityDisplay}, {addr.countryArea} {addr.postalCode}
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
  </>
  )
}