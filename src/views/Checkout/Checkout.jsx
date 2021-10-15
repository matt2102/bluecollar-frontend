import {
  Container,
  Grid,
  Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useState } from "react"
import CheckoutPage from "../../components/CheckoutPage/CheckoutPage"
import Loading from "../../components/Loading"
import SignInPage from "../../components/SignInPage/SignInPage"
import useUser from "../../hooks/useUser"

const useStyles = makeStyles(theme => ({
  grid: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "grid",
    gridTemplateColumns: '0.4fr 1fr 0.4fr',

  }
}))

export const CheckoutView = () => {
  const {user} = useUser()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  return(
    <Grid className={classes.grid}>
      <Typography variant="h2">Checkout</Typography>
      <Container>
        {
          user.isGuest?
          <SignInPage/>
          :
          <CheckoutPage
          loading={loading}
          setLoading={setLoading}
          />
        }
      </Container>
    </Grid>
  )
}

export default CheckoutView