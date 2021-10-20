import {Typography, Grid, makeStyles, Container} from "@material-ui/core"
import OrderCard from "../OrderCard/OrderCard"
import { NoOrders } from "./NoOrders"

const useStyles = makeStyles(theme => ({
  grid: {
    // maxWidth: 800,
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '1fr minmax(400px, 900px) 1fr',
    marginTop: theme.spacing(10)
  },
  container: {
    marginTop: theme.spacing(10)
  }
})
)

export const Orders = (props) => {
  const {
    orders
  } = props
  const classes = useStyles()

  return(
    <Grid className={classes.grid}>
      <Typography variant="subtitle1">Order History</Typography>
      <Container className={classes.container}>
      {
        orders.length === 0?
        <NoOrders/>
        :
        orders.map(o => {
          return(
            <OrderCard order={o} key={o.id}/>
          )
        })
      }
      </Container>
    </Grid>
  )
}

export default Orders