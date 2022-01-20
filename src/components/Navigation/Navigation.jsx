import {useState} from "react"
import useUser from "../../hooks/useUser"
import useNavigator from "../../hooks/useNavigator"

import {
  AppBar,
  Button,
  makeStyles,
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


import { SignInModal } from "../Auth/SignInModal"

import { blogPath } from "../../views/Blog/urls";
import { accountPath } from "../../views/Account/urls"
import { homePath } from "../../views/Home/urls"
import { resourcesPath } from "../../views/Resources/urls"
import { consultingPath } from "../../views/Consulting/urls"
import { cartPath } from "../../views/Cart/urls"
import { coursesPath } from "../../views/Courses/urls"
import { MenuRounded } from "@material-ui/icons"
import AccountButton from "./AccountButton"
import { programsPath } from "../../views/Programs/urls"
import { aboutPath } from "../../views/About/urls"

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
        marginLeft: theme.spacing(5)
      },
    },
    accountContainer: {
      gridColumn: 3,
      [theme.breakpoints.down('md')]: {
        gridColumn: 2,
      },
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
    // ['Courses', coursesPath],
    ['Consulting', consultingPath],
    ['Programs', programsPath],
    ['About Us', aboutPath]
    // ['Blog', blogPath],
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
              key={i[0]}
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
            <AccountButton
              isGuest={user.isGuest}
              openModal={()=>setModal(true)}
              signOut={signOut}
              viewCart={()=>navigate(cartPath)}
              viewAccount={()=>navigate(accountPath)}
              classes={classes}
              onPhone={phoneView}
            />
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