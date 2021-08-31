import { Button, Grid, IconButton, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useUser from "../../hooks/useUser"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useNavigator from '../../hooks/useNavigator';
import { accountAddressPath, accountBillingPath, accountInfo, accountPath, accountPurchasedCourses } from '../../views/account/urls';
import { useLocation } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "300px",
    gridTemplateRows: "80px 75px auto",
    width: "300px",
    maxWidth: "300px",
    height: "100vh",
    backgroundColor: theme.palette.secondary.light
  },
  name: {
    width: "100%",
    margin: "auto",
    textAlign: "center"
  },
  avatarBtn: {
    padding: 0,
    margin: 0,
  },
  avatar: {
    fontSize: "75px"
  },
  buttonGrid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "290px",
    gridTemplateRows: "repeat(4, 40px)",
  },
  button: {
    // marginLeft: 20,
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
    // marginRight: 'auto',
    padding: 0,
    textAlign: 'left',
    // background: theme.palette.accent.red

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
  console.log(location)
  const selected = getSelected(location)
  const btns = [
    [accountInfo, 'Account Info', INFO],
    [accountPurchasedCourses, 'Purchased Courses', PURCHASED],
    [accountBillingPath, 'Billing Info', BILLING],
    [accountAddressPath, 'Addresses', ADDRESS]
  ]
  return(
    <Grid className = {classes.root}>
      <Typography variant="subtitle2" className={classes.name}>
        {user.firstName} {user.lastName}
      </Typography>
      <IconButton onClick = {()=>navigate(accountPath)} className={classes.avatarBtn}>
        <AccountCircleIcon className={classes.avatar}/>
      </IconButton>
      <Grid className={classes.buttonGrid}>
        {btns.map(btnInfo => {
          const [path, text, _type] = btnInfo
          const isSelected = selected === _type
          console.log( _type, isSelected)
          return(
            <>
            {isSelected ?
            <Button
              className={classes.selected}
              onClick={()=>navigate(path)}
              ><Typography variant="body2" className={classes.btnText}>{text}</Typography>
                </Button>
            :
            <Button
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

