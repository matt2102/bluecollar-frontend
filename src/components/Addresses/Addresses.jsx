import {
   Grid,
   makeStyles
} from "@material-ui/core"
import useAddress from "../../hooks/useAddress"
import { maybe } from "../../misc"
import AddressActionBar from "../AddressActionBar/AddressActionBar"
import AddressCard from "../AddressCard"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    width: '100%',
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(4),
    columnGap: 50,
    rowGap: 50,
    gridTemplateColumns: "1fr",
    gridTemplateRows: "80px auto",
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      width: '100%',
      maxWidth: 350
    }
  },
  grid: {
    margin: 'auto',
    display: 'grid',
    marginBottom: theme.spacing(8),
    columnGap: theme.spacing(2),
    rowGap: theme.spacing(2),

    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(8),
      gridTemplateColumns: "repeat(2, 250px)",
      gridAutoRows: "300px",

    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(8),
      gridTemplateColumns: "repeat(2, 250px)",
      gridAutoRows: "300px",
      rowGap: theme.spacing(4)
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(8),
      gridTemplateColumns: "250px",
      gridAutoRows: "300px",
      rowGap: theme.spacing(4)
    },
  }
}))

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
    <Grid className={classes.root} container>
      <AddressActionBar/>
      <Grid className={classes.grid}>
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
    </Grid>
  )
}

export default Addresses