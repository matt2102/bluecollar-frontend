import { Container, Grid,Typography, makeStyles } from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { homePath } from "../../views/Home/urls"
import { SignInForm } from "../Auth/SignInForm"
import {CreateAccountForm} from "../Auth/CreateAccountForm"

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

export const SignInPage = () => {
  const navigator = useNavigator()
  const classes = useStyles()
  return(
    <Container className={classes.root}>
      <Grid className={classes.grid}>
        <Container>
          <Typography variant="h4" className={classes.subtitle}>Sign In</Typography>
          <SignInForm
            onClose = {()=>navigator(homePath)}
            disabled = {false}/>
        </Container>
        <Container className={classes.borderLeft}>
          <Typography variant="h4" className={classes.subtitle}>Create Account</Typography>
          <CreateAccountForm
            onClose = {()=>navigator(homePath)}
            disabled = {false}/>
        </Container>
      </Grid>
    </Container>
  )
}

export default SignInPage