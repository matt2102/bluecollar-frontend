import {
   Grid,
   makeStyles
} from "@material-ui/core"
import useAddress from "../../hooks/useAddress"
import { maybe } from "../../misc"
import AddressActionBar from "../AddressActionBar/AddressActionBar"
import AddressCard from "../AddressCard"

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    width: '100%',
    maxWidth: 900,
    margin: 'auto',
    columnGap: 50,
    rowGap: 50
  }
})

export const Addresses = () => {
  const{data, loading, deleteAddress, update} = useAddress()
  const classes = useStyles()
  const onSubmit = (data) => {
    update(data.id, data)
  }
  if(loading)return null
  const addresses = maybe(() => data.me.addresses, [])
  let addressCount = 0
  return(
    <Grid className={classes.root}>
      <AddressActionBar/>
      {addresses.map(
        address => {
          addressCount += 1
          return(
            <AddressCard
              address={address}
              num={addressCount}
              key={address.id}
              onDelete={deleteAddress}
              isChildOfCheckout={false}
              onSubmit={onSubmit}
              // checkoutAddressEnum={}
              />
          )
        }
      )}
    </Grid>
  )
}

export default Addresses