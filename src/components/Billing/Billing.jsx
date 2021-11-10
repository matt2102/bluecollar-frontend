import { Container, Grid, makeStyles, Typography } from "@material-ui/core"
import { maybe } from "../../misc"
import Orders from "../Orders"
import SimpleAddressCard from "../SimpleAddressCard"
import { useUserOrdersDetails } from "./queries"

const useStyles = makeStyles(theme => ({
  title: {

  },
  addressContainer: {
    display: "grid",
    margin: 'auto',
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      maxWidth: 800,
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      rowGap: theme.spacing(2)
    }
  },
  addressTitle: {
    gridRow: 1,
    fontSize: 20
  }

}))

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
      <Grid className={classes.addressContainer}>
        <Container>
            <Typography className = {classes.addressTitle} variant="h4">Default Billing Address</Typography>
            <SimpleAddressCard address={defaultBilling}/>
        </Container>
        <Container>
          <Typography className = {classes.addressTitle} variant="h4">Default Shipping Address</Typography>
          <SimpleAddressCard address={defaultShipping}/>
        </Container>


      </Grid>
      <Orders orders={orders}/>
    </Grid>
  )
}

export default Billing