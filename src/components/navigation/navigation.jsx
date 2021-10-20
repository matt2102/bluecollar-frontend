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
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core"


import Logo from "../../assets/icons/Logo"
import LogoSlim from "../../assets/icons/LogoSlim"
import LogoutIcon from "../../assets/icons/Logout_300x300.webp"
import CartIcon from "../../assets/icons/cart.png"
import AccountIcon from "../../assets/icons/account_icon_300x300.webp"

import { SignInModal } from "../Auth/SignInModal"

import { blogPath } from "../../views/Blog/urls";
import { accountPath } from "../../views/Account/urls"
import { homePath } from "../../views/Home/urls"
import { resourcesPath } from "../../views/Resources/urls"
import { consultingPath } from "../../views/Consulting/urls"
import { cartPath } from "../../views/Cart/urls"
import { coursesPath } from "../../views/Courses/urls"
import { MenuRounded, PersonOutlineOutlined } from "@material-ui/icons"

export const useStyles = makeStyles(
  theme => ({
    root: {
      width: "100%",
      padding: 0,
      margin: 0,
      background: theme.palette.background.default,
      elevation: 0,
      [theme.breakpoints.down('lg')]: {
        height: 150,
      },
      [theme.breakpoints.up('lg')]: {
        height: 100,
      }
    },
    toolbar: {
      display: 'grid',
      // gridTemplateColumns: '300px 1fr minmax(300px, 400px)',
      [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: '1fr 1fr',
        rowGap: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '100px 1fr',
        rowGap: theme.spacing(2)
      },
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: '300px 1fr minmax(300px, 400px)',
      },
    },
    logoContainer: {
      // width: 300,
      height: "auto",
      [theme.breakpoints.down("lg")]: {
        width: 225,
      },
      [theme.breakpoints.down("sm")]: {
        width: 200,
        margin: 0
      },
      [theme.breakpoints.up("lg")]: {
        width: 300,
      },
    },
    logo: {
      height: 'auto',
      width: '100%',
      maxWidth: 'auto'
    },
    btnContainer: {
      margin: 'auto',
      [theme.breakpoints.down('lg')]: {
        gridColumn: '1 / 3',
        gridRow: 2,
      },
      [theme.breakpoints.up('lg')]: {
        gridColumn: 2,
        gridRow: 1,
        margin: 'auto',
      },
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
      gridColumn: 3,
      // width: 'auto',
      [theme.breakpoints.down('md')]: {
        gridColumn: 2,
      },
      // [theme.breakpoints.up('lg')]: {
      //   gridColumn: 3,
      // },
    },

    logoutCard: {
      width: 40,
      margin: 'auto',
      marginLeft: 0,
      marginRight: 0,
    },
    logoutIcon: {
      width: 40,
    },
    cartCard: {
      width: 40,
      margin: 'auto',
      marginLeft: 0,
      marginRight: 20,
    },
    cartIcon: {
      width: 40,
    },
    accountIcon: {
      strokeWidth: 0.5,
      fill: theme.palette.green,
      fontSize: 40
    }
  })
)
function getButtonsAndMenuItems(d, tabletView, phoneView){
  const b = []
  const m = []
  if(phoneView){
    b.push(...d.slice(0, 2))
    m.push(...d.slice(2))
    return([b, m])
  }
  if(tabletView){
    b.push(...d.slice(0, 3))
    m.push(...d.slice(3))
    return([b, m])
  }
  else {
    b.push(...d)
  }
  return([b, m])
}


export const Navigation = () => {
  const [modal, setModal] = useState(false)
  const {user, signOut} = useUser()
  const navigate = useNavigator()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const tabletView = useMediaQuery((theme) => theme.breakpoints.down('600'))
  const phoneView = useMediaQuery((theme) => theme.breakpoints.down('450'))
  const data = [
    ['Resources', resourcesPath],
    ['Courses', coursesPath],
    ['Consulting', consultingPath],
    ['Programs', blogPath],
    ['Blog', blogPath],
  ]
  const [navButtons, menuItems] = getButtonsAndMenuItems(data, tabletView, phoneView)
  const handleMenuClick = (path) => {
    navigate(path)
    setAnchorEl(null)
  }
  return(
    <>
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <IconButton onClick={()=>navigate(homePath) } className={classes.logoContainer}>
          {tabletView?
          <LogoSlim/>
          :
          <Logo/>
          }

        </IconButton>
        <Grid container direction="row" justify="space-between" wrap="nowrap" className={classes.btnContainer}>
          {navButtons.map(i => {
            return(
            <Button variant="textSecondary"
              onClick={()=>navigate(i[1])}>
              {i[0]}
            </Button>
            )
          })}
          {tabletView?
          <>
          <IconButton
            onClick={(e)=>setAnchorEl(e.currentTarget)}>
            <MenuRounded color="secondary"/>
          </IconButton>
          <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={()=>setAnchorEl(null)}
          >
            {menuItems.map(m => {
            return(
              <MenuItem onClick={() => handleMenuClick(m[1])}>
                <Typography color="secondary">{m[0]}</Typography>
              </MenuItem>
              )
            })}
          </Menu>
          </>
          :null}
        </Grid>
        <Grid container className={classes.accountContainer} direction="row" justify="flex-end" wrap='nowrap'>
          {user.isGuest?
        <>
        {phoneView?
        <IconButton onClick={()=>setModal(true)}>
          <PersonOutlineOutlined className={classes.accountIcon}/>
        </IconButton>
        :
        <Button variant="containedPrimary"
          onClick={()=>setModal(true)}>
          {user.isGuest?"Create Account":"Login"}
        </Button>
        }
        <Card elevation={0} className={classes.cartCard}>
            <CardActionArea onClick = {()=>navigate(cartPath)}>
              <CardMedia
              component={"img"}
              className={classes.cartIcon}
              src={CartIcon}/>
            </CardActionArea>
        </Card>
        </>
        :
        <>
        {phoneView?
        <IconButton onClick={()=>setModal(true)}>
          <PersonOutlineOutlined className={classes.accountIcon}/>
        </IconButton>
        :
        <Button variant="containedPrimary"
          onClick={()=>setModal(true)}>
          {user.isGuest?"Create Account":"Login"}
        </Button>
        }
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
          </>
        }
        </Grid>
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