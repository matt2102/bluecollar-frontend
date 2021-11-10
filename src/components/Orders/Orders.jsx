import {Typography, Grid, makeStyles} from "@material-ui/core"
import OrderCard from "../OrderCard/OrderCard"
import { NoOrders } from "./NoOrders"

const useStyles = makeStyles(theme => ({
  grid: {
    margin: 'auto',
    display: 'grid',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '1fr',
      marginTop: theme.spacing(8)
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      marginTop: theme.spacing(8)
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(10),
      gridTemplateColumns: '1fr minmax(400px, 900px) 1fr',
    }
  },
  container: {
    width: '100%',
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      margin: 0,
      marginTop: theme.spacing(4)
    },
    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(10),
    }
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
      <Grid className={classes.container}>
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
      </Grid>
    </Grid>
  )
}

export default Orders