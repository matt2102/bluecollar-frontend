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
    display: "grid",
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(5),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(3),
    }
  },
  card: {
    margin: 0,
    background: theme.palette.secondary.light,
    height: 340,
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    }
  },
  myCart: {
    gridColumn: 1,
    marginLeft:  theme.spacing(5)
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
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '250px 1fr',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '100px 1fr',
    },
    [theme.breakpoints.down(400)]: {
      gridTemplateColumns: '1fr',
    }
  },
  imgContainer: {
    width: 300,
    height: 300,
    [theme.breakpoints.down('sm')]: {
      width: 250,
      height: 250
    },
    [theme.breakpoints.down('xs')]: {
      width: 100,
      height: 100
    }
  },
  productDetails: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    height: 200,
    [theme.breakpoints.down('sm')]: {
      height: 'auto'
    },
  },
}))


export const CartList = (props) => {
  const {
    items,
    checkout
  } = props
  const {removeItem} = useCheckout()
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
              Remove
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