import {
  CardContent,
  Card,
  CardHeader,
  Typography,
  Button,
  makeStyles,
  Grid,
  Container
} from "@material-ui/core"

import {
  CardElement as StripeCardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js"
import useMessages from "../../hooks/useMessages"
import { maybe } from "../../misc"


const isButtonDisabled = (ch, stripe) => {
  if(!stripe){
    // stripe (payment processor) is not loaded
    return true
  }
  const hasBillingAddr = maybe(() => !!ch.billingAddress.id, false)
  const hasShippingAddr = maybe(() => !!ch.shippingAddress.id, false)
  const hasShippingMeth = maybe(() => !!ch.hasShippingMeth.id, false)
  const shippingRequired = maybe(() => !!ch.isShippingRequired, false)
  if(shippingRequired){
    if(hasBillingAddr && hasShippingAddr && hasShippingMeth){
      return false
    }
    return true
  } else {
    if(hasBillingAddr){
      return false
    }
    return true
  }
}

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    margin: 'auto',
    background: theme.palette.background.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },

  header: {
    background: theme.palette.primary.main
  },
  cardContent: {
    // display: 'flex',
    // flexFlow: 'column nowrap',
    // alignItems: 'center'
  },
  stripeContainer: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '0.6fr 0.4fr',
    margin: 'auto'
  },
  cardNumber: {
    gridColumn: '1 / -1',
    gridRow: 1,
  },
  cardExpiry: {
    gridColumn: 1,
    gridRow: 2
  },
  cardCvc: {
    gridRow: 2,
    gridColumn: 2
  },
  grid: {
    margin: 'auto',
    maxWidth: 250,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "grid",
    gridTemplateColumns: '1fr 20px',
  },
  name: {
    gridColumn: 1
  },
  money: {
    gridColumn: 2
  }
}))

const stripe_styles = {
  style: {
    base: {
      background: "#A5C854",
      minWidth: '350px',
      fontSize: '20px',
      color: '#707070',
      '::placeholder': {
        color: "#5a519c"
      },
    },
    invalid: {
      color: "#d23939"
    },
    complete: {
      color: "#3bb7c7",
    },
    disabled: {
      color: "#707070"
    }
  }
}

export const PaymentCard = (props) => {
  const {
    completeCheckout,
    checkout
  } = props
  const stripe = useStripe();
  const {addMessage} = useMessages()
  const ch = checkout.displayData
  const p = ch.totalPrice
  const disabled = isButtonDisabled(ch, stripe)
  const classes = useStyles()
  const elements = useElements()
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        "name": ch.billingAddress.firstName + " " + ch.billingAddress.lastName
      }
    });
    if (error) {
      addMessage({
        messageType: "error",
        msg: "unable to process payment"
      })
    } else {
      const {id} = paymentMethod
      completeCheckout(id)
    }
  }
  return(
    <Card className={classes.card} elevation={0}>
      <CardHeader
      className={classes.header}
      title={
        <Typography variant="h4" color="textSecondary">Payment</Typography>
      }/>
      <CardContent className={classes.cardContent}>
        <form onSubmit={handleSubmit}>
          <Grid className={classes.stripeContainer}>
            <Container className={classes.cardNumber}>
              <CardNumberElement
                options={{
                  ...stripe_styles,
                  disabled: disabled
                }}
              />
            </Container>
            <Container className={classes.cardExpiry}>
            <CardExpiryElement
                options={{
                  ...stripe_styles,
                  disabled: disabled
                }}
            />
            </Container>
            <Container className={classes.cardCvc}>
            <CardCvcElement
                options={{
                  ...stripe_styles,
                  disabled: disabled
                }}
              />
              </Container>
          </Grid>
          <Grid className={classes.grid}>
            <Typography className={classes.name}>Subtotal</Typography>
            <Typography className={classes.money}>${p.net.amount}</Typography>
            <Typography className={classes.name}>Tax</Typography>
            <Typography className={classes.money}>${p.tax.amount}</Typography>
            <Typography className={classes.name}>Total</Typography>
            <Typography className={classes.money}>${p.gross.amount}</Typography>
          </Grid>
          <Grid container justify="center">
            <Button variant="containedPrimary" disabled={disabled} onClick={handleSubmit}
            >
              Pay
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default PaymentCard