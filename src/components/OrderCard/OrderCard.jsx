import { Container,Card, CardHeader,Typography, CardContent, Grid, makeStyles, CardMedia } from "@material-ui/core"
import { formatMoney, getDate, getImage } from "../../misc"
import DefaultImage from "../DefaultImage"

const useStyles = makeStyles(theme => ({
  card: {
    margin: 4,
    // marginTop: theme.spacing(10),
    marginBottom: theme.spacing(4)
    // width: '100%'
  },
  cardHeader: {
    background: theme.palette.secondary.main
  },
  orderLines: {
    display: "grid",
    gridTemplateColumns: '1fr',
    // gridTemplateRows: 'auto',
    rowGap: theme.spacing(3),
  },
  orderLine: {
    display: "grid",
    gridTemplateColumns: '300px 1fr',
    columnGap: 20,
    gridTemplateRows: '300px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '150px 1fr',
      columnGap: 5,
      gridTemplateRows: '80px 150px',
    },
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '300px 1fr',
      columnGap: 20,
      gridTemplateRows: '300px',
    }
  },
  name: {
    gridRow: 1,
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      gridColumn: '1 / -1',
      fontSize: '1.4rem',
      margin: 0,
      padding: 0
    },
    [theme.breakpoints.up('md')]: {
      gridColumn: 2,

    }
  },
  image: {
    gridColumn: 1,
    [theme.breakpoints.down('sm')]: {
      gridRow: "2 / -1",
      margin: 'auto',
      width: 150,
      height: 150
    },
    [theme.breakpoints.up('md')]: {
      gridRow: "1 / -1",
    }
  }
})
)

export const OrderCard = (props) => {
  const {
    order
  } = props
  const date = getDate(order.created)
  const amount = formatMoney(order.total.gross.amount)
  const classes = useStyles()
  return(
    <Card className={classes.card}>
      <CardHeader
        title={
          <Grid container direction="row" justify="space-between"
          >
            <Typography color="textSecondary">Order Placed: {date}</Typography>
            <Typography color="textSecondary">Total: ${amount}</Typography>
            <Typography color="textSecondary">Order # {order.number}</Typography>
          </Grid>
        }
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid className={classes.orderLines}>
          {order.lines.map(l => {
            const image = getImage(l.thumbnail)

            return(
              <Grid className={classes.orderLine}>
                <Container className={classes.image}>
                {image?
                  <CardMedia
                    component="img"
                    // className={classes.cardMedia}
                    image={image}
                  />
                  :
                  <DefaultImage item={l}/>
                }
                </Container>
                <Typography align="left" className={classes.name}>{l.productName} {l.variantName}</Typography>
                <Grid container direction="column" justify="flex-start" alignItems="flex-start">

                  <Typography variant="h5" align="left">Price: ${l.unitPrice.gross.amount}</Typography>
                  <Typography variant="h5" align="left">Quantity {l.quantity}</Typography>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default OrderCard