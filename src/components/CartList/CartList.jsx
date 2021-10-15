import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  CardMedia,
  Grid,
  Button,
  Container
} from "@material-ui/core"
import DefaultImage from "../../components/DefaultImage"
import useCheckout from "../../hooks/useCheckout"
import { getImage } from "../../misc"
import UpdateCartQty from "../UpdateCartQty/UpdateCartQty"

const useStyles = makeStyles(theme => ({
  cardGrid: {
    marginTop: theme.spacing(10),
    // minHeight: '90vh',
    display: "grid",
    gridTemplateColumns: '1fr',
    // gridAutoRows: '300'
    rowGap: theme.spacing(10)
  },
  card: {
    margin: 0,
    background: theme.palette.secondary.light,
    height: 340
  },
  myCart: {
    gridColumn: 1,
    marginLeft:  theme.spacing(5)
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.palette.secondary.light,
    margin: 20,
    height: '60vh'
  },
  cardHeader: {
    background: theme.palette.secondary.main,
    display: "flex",
    flexFlow: "row no-wrap",
    justifyContent: "space-between",

  },
  headerText: {
    color: theme.palette.text.secondary,
    fontSize: 20,
    margin: 5,
    marginLeft: 25,
    marginRight: 25,
  },
  cardContent: {
    display: "grid",
    gridTemplateColumns: '300px 1fr',
  },
  imgContainer: {
    width: 300,
    height: 300
  },
  productDetails: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    height: 200
  },
}))


export const CartList = (props) => {
  const {
    items,
    checkout
  } = props
  const {removeItem, updateItemQty} = useCheckout()
  const classes = useStyles()
  return(
  <Grid className={classes.cardGrid}>
  {
    items.map(node => {
      const v = node.node
      const image = getImage(v.product)
      const qty = checkout.lines.filter(l => l.variantId === v.id)[0].quantity
      return(
        <Card elevation={0} className={classes.card} key={v.id}>
          <div className={classes.cardHeader}>
            <Typography className={classes.headerText}>{v.product.name}</Typography>
            <Typography className={classes.headerText}>Price: ${v.pricing.price.net.amount}</Typography>
          </div>
        <CardContent className={classes.cardContent}>
          <Container className={classes.imgContainer}>
            {image?
            <CardMedia
              component="img"
              className={classes.cardMedia}
              image={image}
            />
            :
            <DefaultImage item={v}/>
            }
          </Container>
          <Container className={classes.productDetails}>
            <Typography variant="h4">
            {v.product.name} {v.name}
            </Typography>
            <UpdateCartQty
             variantId={v.id}
             qty={qty}
            />
            <Button variant="containedPrimary" onClick={()=>removeItem(v.id)}>
              Remove From Cart
            </Button>
          </Container>
        </CardContent>
      </Card>
      )
    })
  }
  </Grid>
  )
}

export default CartList