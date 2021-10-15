import {useState} from "react"
import useUser from "../../hooks/useUser"
import useNavigator from "../../hooks/useNavigator"

import {
  AppBar,
  Button,
  makeStyles,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Toolbar,
  IconButton
} from "@material-ui/core"


import Logo from "../../assets/icons/Logo"
import LogoutIcon from "../../assets/icons/Logout_300x300.webp"
import CartIcon from "../../assets/icons/cart.png"

import { SignInModal } from "../Auth/SignInModal"

import { blogPath } from "../../views/Blog/urls";
import { accountPath } from "../../views/Account/urls"
import { homePath } from "../../views/Home/urls"
import { resourcesPath } from "../../views/Resources/urls"
import { consultingPath } from "../../views/Consulting/urls"
import { cartPath } from "../../views/Cart/urls"
import { coursesPath } from "../../views/Courses/urls"

const useStyles = makeStyles(
  theme => ({
    root: {
      width: "100%",
      height: "100px",
      padding: 0,
      margin: 0,
      background: theme.palette.background.default,
      elevation: 0
    },
    logo: {
      height: 'auto',
      width: '100%',
      maxWidth: 'auto'
    },
    logoContainer: {
      width: 300,
      height: "auto"
    },
    toolbar: {
      maxWidth: '100%',
      display: "flex",
      justifyContent: "space-between"
    },
    btnContainer: {
      width: '100%',
      maxWidth: 800,
      display: 'flex',
      flexFlow: "row nowrap",
      justifyContent: "space-evenly",
      margin: 'auto',
    },
    navButton: {
      color: theme.palette.secondary.main,
      padding: 2,
      margin: 'auto',
      height: 40,
      width: 120,
      fontFamily: theme.typography.h2,
      '&:hover': {
        background: 'none',
        color: theme.palette.green,
        'text-decoration': 'underline'
      }
    },
    accountContainer: {
      maxWidth: 320
    },
    accountBtn: {
      height: '50px',
      borderRadius: '50px',
      width: '200px',
      background: theme.palette.primary.main,
      color: theme.palette.background.default,
      '&:hover': {
        background: theme.palette.green
      }
    },
    logoutCard: {
      width: 40,
      margin: 'auto',
      marginLeft: 20
    },
    logoutIcon: {
      width: 40,
    },
    cartCard: {
      width: 40,
      margin: 'auto',
      marginLeft: 20,
    },
    cartIcon: {
      width: 40,
    }
  })
)

export const Navigation = () => {
  const [modal, setModal] = useState(false)
  const {user, signOut} = useUser()
  const navigate = useNavigator()
  const classes = useStyles()
  return(
    <>
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={()=>navigate(homePath) } className={classes.logoContainer}>
          <Logo/>
        </IconButton>
        <Grid className={classes.btnContainer}>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(resourcesPath)}>
          Resources
        </Button>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(coursesPath)}>
          Courses
        </Button>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(consultingPath)}>
          Consulting
        </Button>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(blogPath)}>
          Blog
        </Button>
        </Grid>

        {user.isGuest?
        <Grid container className={classes.accountContainer}>
        <Button className={classes.accountBtn}
          onClick={()=>setModal(true)}>
          Login / Create Account
        </Button>
          <Card elevation={0} className={classes.cartCard}>
            <CardActionArea onClick = {()=>navigate(cartPath)}>
              <CardMedia
              component={"img"}
              className={classes.cartIcon}
              src={CartIcon}/>
            </CardActionArea>
          </Card>
        </Grid>
        :
        <Grid container className={classes.accountContainer}>
        <Button className={classes.accountBtn}
          onClick={()=>navigate(accountPath)}>
          My Account
        </Button>
        <Card elevation={0} className={classes.cartCard}>
            <CardActionArea onClick = {()=>navigate(cartPath)}>
              <CardMedia
              component={"img"}
              className={classes.cartIcon}
              src={CartIcon}/>
            </CardActionArea>
          </Card>
        <Card elevation={0} className={classes.logoutCard}>
          <CardActionArea onClick = {() => signOut()}>
            <CardMedia
            component={"img"}
            className={classes.logoutIcon}
            src={LogoutIcon}/>
          </CardActionArea>
        </Card>
        </Grid>
        }
        </Toolbar>
    </AppBar>

    <SignInModal
        open={modal}
        disabled={false}
        onClose={()=>setModal(false)}
    />
    </>
  )
}

export default Navigation