import useCheckout, {BILLING, SHIPPING} from "../../hooks/useCheckout"
import {Container, Grid, makeStyles} from "@material-ui/core"
import { CheckoutAddressCard } from "../CheckoutAddressCard/CheckoutAddressCard"
import CheckoutList from "../CheckoutList/CheckoutList"
import PaymentCard from "../PaymentCard"

import {
  Elements
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Loading from "../Loading"

const useStyles = makeStyles(theme => ({
  grid: {
    // marginTop: theme.spacing(5),
    margin: 0,
    display: 'grid',
    // gridTemplateColumns: '1fr 0.5fr',
    rowGap: theme.spacing(5),
    marginBottom: theme.spacing(15),
    [theme.breakpoints.down('md')]: {
       marginTop: theme.spacing(5),
      gridTemplateColumns: '1fr'
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
      gridTemplateColumns: '1fr 0.5fr',
    }
  },
  items: {
    gridRow: "1 / -1",
    [theme.breakpoints.down('md')]: {
       gridColumn: 1,
    },
    [theme.breakpoints.up('md')]: {
       gridColumn: 2,
    }
  },
  billing: {
    margin: 'auto',
  },
  payment: {
    margin: 'auto',
  }
}))
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export const CheckoutPage = () => {
  const {
    completeCheckout,
    token,
    checkout,
    attachCartToUser,
    isLoading} = useCheckout()
  if(!token){
    attachCartToUser()
  }
  const classes = useStyles()
  const shippingRequired = checkout.displayData.isShippingRequired
  if(isLoading){
    return <Loading
      title={'Processing'}
    />
  }
  return(
    <Grid className={classes.grid}>
      <Container>
        <CheckoutAddressCard
          className={classes.billing}
          address = {checkout.displayData.billingAddress || {}}
          addressTitle = {"Billing Address"}
          checkoutAddressEnum={BILLING}
          />
          {shippingRequired?
        <CheckoutAddressCard
          address = {checkout.displayData.shippingAddress || {}}
          addressTitle = {"Shipping Address"}
          checkoutAddressEnum={SHIPPING}
          />
          :
          null
          }
      <Container className={classes.payment}>
        <Elements stripe={stripePromise}>
          <PaymentCard
            checkout = {checkout}
            completeCheckout = {completeCheckout}
          />
        </Elements>
      </Container>
    </Container>
      <Container className={classes.items}>
      <CheckoutList
        ch={checkout.displayData}
        />
      </Container>
    </Grid>
  )
}

export default CheckoutPage