import { Grid, makeStyles } from "@material-ui/core"
import { Route, Switch } from "react-router"
import { Billing } from "../../components/Billing"
import AccountInfo from "../../components/AccountInfo"
import AccountSideBar from "../../components/AccountSidebar"
import { accountAddressPath, accountBillingPath, accountPasswordReset, accountPath, confirmAccountPath } from "./urls"
import Addresses from "../../components/Addresses"
import { PasswordReset } from "../../components/PasswordReset"
import AccountConfirm from "../../components/AccountConfirm/AccountConfirm"

const useStyle = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "minmax(auto, 300px) 1fr",
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: "40px 1fr"
    }

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


export const AccountView = () => {
  return(
    <Switch>
      <Route path={confirmAccountPath} component={AccountConfirm}/>
      <Route path={accountPasswordReset} component={PasswordReset}/>
      <Route path={accountPath} component={Account}/>
    </Switch>
  )
}

export default AccountView