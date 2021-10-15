import { Grid, makeStyles, Typography } from "@material-ui/core"
import { maybe } from "../../misc"
import Orders from "../Orders"
import SimpleAddressCard from "../SimpleAddressCard"
import { useUserOrdersDetails } from "./queries"

const useStyles = makeStyles({
  title: {

  },
  addressContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "50px auto",
    maxWidth: 800,
    margin: 'auto'
  },
  addressTitle: {
    gridRow: 1,
    fontSize: 20
  }

})

export const Billing = () => {
  const classes = useStyles()
  const {data} = useUserOrdersDetails({variables: {
    first: 99,
  }})
  const orders = maybe(() => data.me.orders.edges.map(edge => edge.node), [])
  const defaultBilling = data?.me.defaultBillingAddress
  const defaultShipping = data?.me.defaultBillingAddress
  return(
    <Grid>
      <Typography variant="subtitle1">Billing</Typography>
      <div className={classes.addressContainer}>
      <Typography className = {classes.addressTitle}>Default Billing Address</Typography>
      <SimpleAddressCard address={defaultBilling}/>
      <Typography className = {classes.addressTitle}>Default Shipping Address</Typography>
      <SimpleAddressCard address={defaultShipping}/>
      </div>
      <Orders orders={orders}/>
    </Grid>
  )
}

export default Billing