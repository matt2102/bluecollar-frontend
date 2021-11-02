import { Grid, makeStyles } from "@material-ui/core"
import { Route, Switch } from "react-router"
import { Billing } from "../../components/Billing"
import AccountInfo from "../../components/AccountInfo"
import AccountSideBar from "../../components/AccountSidebar"
import { accountAddressPath, accountBillingPath, accountPasswordReset, accountPath } from "./urls"
import Addresses from "../../components/Addresses"
import { PasswordReset } from "../../components/PasswordReset"

const useStyle = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "300px 1fr"
  }
}),{name: "Account"})

export const Account = () => {
  const classes = useStyle()
  return(
    <Grid className={classes.root}>
    <AccountSideBar/>
    <Switch>
      <Billing path = {accountBillingPath}/>
      <Addresses path = {accountAddressPath}/>
      <AccountInfo/>
    </Switch>
    </Grid>
  )
}

export const ResetPassword = () => {
  return(
    <PasswordReset/>
  )
}

export const AccountView = () => {
  return(
    <Switch>
      <Route path={accountPasswordReset} component={ResetPassword}/>
      <Route path={accountPath} component={Account}/>
    </Switch>
  )
}

export default AccountView