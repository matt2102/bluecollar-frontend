import { Container, Grid,Typography, makeStyles, Button } from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { SignInForm } from "../Auth/SignInForm"
import {CreateAccountForm} from "../Auth/CreateAccountForm"
import { checkoutPath } from "../../views/Checkout/urls"
import { ForgotPasswordForm } from "../Auth/ForgotPasswordForm"
import { useState } from "react"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(30),
    marginBottom: theme.spacing(30),
    // height: '100vh',
    display: 'flex'
  },
  grid: {
    // marginTop: theme.spacing(30),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: 'auto'
  },
  borderLeft: {
    borderLeft: `1px solid ${theme.palette.text.main}`
  },
  subtitle: {
    marginBottom: theme.spacing(5)
  }
}))

const SIGN_IN = "SIGN_IN"
const FORGOT_PASSWORD = 'FORGOT_PASSWORD'

export const SignInPage = () => {
  const navigator = useNavigator()
  const classes = useStyles()
  const [view, setView] = useState(SIGN_IN)
  return(
    <Container className={classes.root}>
      <Grid className={classes.grid}>
        <Container>
          {view === SIGN_IN?
          <>
          <Typography variant="h4" className={classes.subtitle}>Sign In</Typography>
          <SignInForm
            onClose = {()=>navigator(checkoutPath)}
            disabled = {false}/>
          <Button variant="textSecondary" onClick={()=>setView(FORGOT_PASSWORD)}>Forgot Password</Button>
          </>
        :null}
        {view === FORGOT_PASSWORD?
        <>
          <Typography variant="h4" className={classes.subtitle}>Forgot Password</Typography>
          <ForgotPasswordForm
            onClose = {()=>navigator(checkoutPath)}
            disabled = {false}/>
          <Button variant="textSecondary" onClick={()=>setView(SIGN_IN)}>Login</Button>
          </>
        :null}
        </Container>
        <Container className={classes.borderLeft}>
          <Typography variant="h4" className={classes.subtitle}>Create Account</Typography>
          <CreateAccountForm
            onClose = {()=>navigator(checkoutPath)}
            disabled = {false}/>
        </Container>
      </Grid>
    </Container>
  )
}

export default SignInPage