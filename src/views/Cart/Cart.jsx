import {
  makeStyles,
  Typography,
  Grid,
  Button,
  Container
} from "@material-ui/core"
import CartList from "../../components/CartList/CartList"
import Loading from "../../components/Loading"
import useNavigator from "../../hooks/useNavigator"
import useCheckout from "../../hooks/useCheckout"
import { checkoutPath } from "../Checkout/urls"
import { coursesPath } from "../Courses/urls"
import { useVariantsDetails } from "./queries"
import { maybe } from "../../misc"
import NotFound from "../../components/NotFound/NotFound"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 25,
    minHeight: '90vh',
    display: "grid",
    gridTemplateColumns: '0.6fr 1fr 0.6fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'minmax(200px, 0.2fr) 1fr 0.2fr',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  myCart: {
    gridColumn: 1,
    marginLeft: 30,
    // [theme.breakpoints.down('sm')]: {
    //   gridRow: 1
    // },
  },
  btnContainer: {
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(40),
    gridColumn: 2,
    gridRow: 0,
    display: "flex",
    flexFlow: "row-reverse",
    [theme.breakpoints.down('sm')]: {
      gridColumn: 1,
      gridRow: 0,
    },
    [theme.breakpoints.down('xs')]: {
      display: "flex",
      flexFlow: "column",
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(10),

    },
  }
}))

export const CartView = () => {
  const classes = useStyles()
  const navigator = useNavigator()
  const {checkout} = useCheckout()
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
        <NotFound
          title={"Keep Shopping"}
          subtitle={"No Items"}
          buttonText={'Our Courses'}
          onClick={()=>navigator(coursesPath)}
        />
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