import {
  Container,
  Grid,
  Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import CheckoutPage from "../../components/CheckoutPage/CheckoutPage"
import SignInPage from "../../components/SignInPage/SignInPage"
import useUser from "../../hooks/useUser"

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    margin: 0,
    width: '100%',
    padding: 0,
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      gridTemplateColumns: '0.4fr 1fr 0.4fr',
    }
  },
  title: {
    [theme.breakpoints.down('lg')]: {
      margin: 'auto',
    },
  }
}))

export const CheckoutView = () => {
  const {user} = useUser()
  const classes = useStyles()
  return(
    <Grid className={classes.grid}>
      <Typography variant="h2" className={classes.title}>Checkout</Typography>
      <Container>
        {
          user.isGuest?
          <SignInPage/>
          :
          <CheckoutPage/>
        }
      </Container>
    </Grid>
  )
}

export default CheckoutView