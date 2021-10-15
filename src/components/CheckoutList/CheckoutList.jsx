import { CardContent, Grid, Typography,Card, CardHeader,makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: 20
  },
  card: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 0,
  },
  header:{
    background: theme.palette.secondary.main
  }
}))

export const CheckoutList = (props) => {
  const {
    ch
  } = props
  const items = ch.lines
  const classes = useStyles()
  return(
    <Grid className={classes.grid}>
      <Typography variant="subtitle2">My Cart</Typography>
      {items.map(i => {
        return(
          <Card elevation={0} className={classes.card}>
            <CardHeader
            className={classes.header}
              title={
              <Typography variant="h5" color="textSecondary">
                {i.variant.product.name + ' ' + i.variant.name}
              </Typography>
              }
            />
            <CardContent>
              <Typography>Qty: {i.quantity}</Typography>
              <Typography>Price: ${i.totalPrice.net.amount}</Typography>
            </CardContent>
          </Card>
        )
      })}
      <Typography>Subtotal: ${ch.subtotalPrice.net.amount}</Typography>
    </Grid>
  )
}

export default CheckoutList