import {Typography} from "@material-ui/core"
import { NoOrders } from "./NoOrders"

export const Orders = (props) => {
  const {
    orders
  } = props
  return(
    <div>
      <Typography variant="subtitle1">My Orders</Typography>
      {
        orders.length === 0?
        <NoOrders/>
        :
        null
      }
    </div>
  )
}

export default Orders