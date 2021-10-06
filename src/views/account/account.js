import { Grid, makeStyles } from "@material-ui/core"
import { Switch } from "react-router"
import { Billing } from "../../components/Billing"
import AccountInfo from "../../components/AccountInfo"
import AccountSideBar from "../../components/AccountSidebar"
import { accountAddressPath, accountBillingPath } from "./urls"
import Addresses from "../../components/Addresses"

const useStyle = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "300px 1fr"
  }
}),{name: "Account"})

export const AccountView = () => {
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

export default AccountView