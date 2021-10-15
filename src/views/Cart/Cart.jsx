import {
  makeStyles,
  Typography,
  Grid,
  Button,
  Container
} from "@material-ui/core"
import CartList from "../../components/CartList/CartList"
import CheckoutNoItems from "../../components/CheckoutNoItems"
import Loading from "../../components/Loading"
import useNavigator from "../../hooks/useNavigator"
import useCheckout from "../../hooks/useCheckout"
import { checkoutPath } from "../Checkout/urls"
import { coursesPath } from "../Courses/urls"
import { useVariantsDetails } from "./queries"
import { maybe } from "../../misc"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 25,
    minHeight: '90vh',
    display: "grid",
    gridTemplateColumns: '0.6fr 1fr 0.6fr'
  },
  myCart: {
    gridColumn: 1,
    marginLeft: 30
  },
  btnContainer: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(40),
    gridColumn: 2,
    gridRow: 0,
    display: "flex",
    flexFlow: "row-reverse"
  }
}))

export const CartView = () => {
  const classes = useStyles()
  const navigator = useNavigator()
  const {checkout} = useCheckout()
  console.log(checkout)
  const ids = checkout.lines.map(l => l.variantId || l.variant.id || l.id)
  const {data, loading} = useVariantsDetails({
    variables: {
      ids: ids
    }
  })
  const noItems = checkout.lines.length === 0
  if(loading){
    return <Loading/>
  }
  const items = maybe(() => data.productVariants.edges, [])
  return(
    <Grid className={classes.root} container>
      <Typography
      className={classes.myCart}
      variant="h2">My Cart</Typography>
      {
        noItems?
        <CheckoutNoItems/>
        :
        <CartList
        items = {items}
        checkout = {checkout}
        />
      }
      <Container className={classes.btnContainer}>
        {!noItems?
        <Button
          variant="containedPrimary"
          onClick={()=>navigator(checkoutPath)}
          >
          Checkout
        </Button>
        :null}
        <Button
          variant="containedPrimary"
          onClick={()=>navigator(coursesPath)}
          >
          Keep Shopping
        </Button>
      </Container>

    </Grid>
  )
}

export default CartView