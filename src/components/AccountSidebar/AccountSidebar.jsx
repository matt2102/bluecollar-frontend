import {
  Button,
  Grid,
  makeStyles,
  Card,
  CardMedia,
  CardHeader,
  CardActionArea,
  Typography
} from '@material-ui/core';
import useUser from "../../hooks/useUser"
import AccountIcon from "../../assets/icons/account_icon_300x300.webp"
import useNavigator from '../../hooks/useNavigator';
import { accountAddressPath, accountBillingPath, accountInfo, accountPath, accountPurchasedCourses } from '../../views/Account/urls';
import { useLocation } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "300px",
    gridTemplateRows: "220px auto",
    width: "300px",
    maxWidth: "300px",
    height: "100vh",
    backgroundColor: theme.palette.secondary.light
  },
  accountIconContainer: {
    width: 110,
    height: 110,
    margin: "auto",
    '&:hover': {
      background: theme.palette.green,
      borderRadius: `55px`,
    }
  },
  accountIcon: {
    width: 100,
    margin: 'auto'
  },
  buttonGrid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "290px",
    gridTemplateRows: "repeat(4, 40px)",
  },
  button: {
    textTransform: 'none',
    fontSize: 16,
    color: theme.palette.text.main,
    borderRadius: 0,
    '&:hover':{
      background: theme.palette.primary.main,
      color: theme.palette.background.default
    }
  },
  selected: {
    textTransform: 'none',
    fontWeight: 500,
    fontSize: 16,
    background: theme.palette.green,
    color: theme.palette.background.default,
    borderRadius: 0,
    '&:hover':{
      background: theme.palette.primary.main
    }
  },
  btnText: {
    width: 100,
    minWidth: 150,
    margin: 0,
    marginLeft: 60,
    padding: 0,
    textAlign: 'left',
  }
}),
{
  name: "AccountSideBar"
})

const INFO = "INFO"
const BILLING = "BILLING"
const PURCHASED = "PURCHASED"
const ADDRESS = "ADDRESS"

const getSelected = (location) => {
  switch(location.pathname){
    case accountBillingPath || accountBillingPath + "/":
      return BILLING
    case accountPurchasedCourses || accountPurchasedCourses + "/":
      return PURCHASED
    case accountAddressPath || accountAddressPath + "/":
      return ADDRESS
    default:
      return INFO

  }
}


export const AccountSideBar = () => {
  const {user} = useUser()
  const navigate = useNavigator()
  const classes = useStyles("")
  const location = useLocation()
  const selected = getSelected(location)
  const btns = [
    [accountInfo, 'Account Info', INFO],
    [accountPurchasedCourses, 'Purchased Courses', PURCHASED],
    [accountBillingPath, 'Billing Info', BILLING],
    [accountAddressPath, 'Addresses', ADDRESS]
  ]
  const fullName = `${user.firstName} ${user.lastName}`
  return(
    <Grid className = {classes.root}>
        <Card elevation={0}>
          <CardHeader title={fullName} titleTypographyProps={{variant: "subtitle2", align: "center"}}/>
          <CardActionArea
          className={classes.accountIconContainer}
          onClick = {()=>navigate(accountPath)}
          >
            <CardMedia
              component="img"
              className={classes.accountIcon}
              image={AccountIcon}/>
          </CardActionArea>
        </Card>
      <Grid className={classes.buttonGrid}>
        {btns.map(btnInfo => {
          const [path, text, _type] = btnInfo
          const isSelected = selected === _type
          return(
            <>
            {isSelected ?
            <Button
              key={`Account-Navigation-Btn-Selected-${text}`}
              className={classes.selected}
              onClick={()=>navigate(path)}
              ><Typography variant="body2" className={classes.btnText}>{text}</Typography>
                </Button>
            :
            <Button
              key={`Account-Navigation-Btn-${text}`}
              className={classes.button}
              onClick={()=>navigate(path)}
              ><Typography variant="body2" className={classes.btnText}>{text}</Typography></Button>
            }
            </>
          )
        }

        )}
      </Grid>
    </Grid>
  )
}

export default AccountSideBar

