import {useState} from "react"
import { AppBar, Button, Icon, makeStyles } from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {Menu} from "@material-ui/icons"
import { SignInModal } from "../auth/signinmodal"
import useUser from "../../hooks/useUser"
import useNavigator from "../../hooks/useNavigator"
import { accountPath } from "../../views/account/urls"
import { homePath } from "../../views/home/urls"
import { resourcesPath } from "../../views/resources/urls"
import { coursesPath } from "../../views/courses/urls"
import { consultingPath } from "../../views/consulting/urls"
import Logo from "../../assets/icons/Logo"

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
      width: 50,
      height: 'auto',
      width: '100%',
      maxWidth: 'auto'
    },
    logoContainer: {
      width: 300,
      height: "auto"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: '1fr 800px 1fr 100px'
    },
    btnContainer: {
      width: '100%',
      display: 'flex',
      flexFlow: "row no-wrap",
      justifyContent: "space-evenly",
      margin: 'auto',
      // fontFamily: "Lobster"
      // background: theme.palette.primary.main
    },
    navButton: {
      color: theme.palette.secondary.main,
      padding: '2px',
      margin: 'auto',
      height: '40px',
      fontFamily: theme.typography.h2,
      margin: '0',
      '&:hover': {
        background: 'none',
        color: theme.palette.green,
        'text-decoration': 'underline'
      }
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
    }
  })
)

export const Navigation = () => {
  const [modal, setModal] = useState(false)
  const {user} = useUser()
  const navigate = useNavigator()
  const classes = useStyles()
  return(
    <>
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar className={classes.grid}>
        <IconButton onClick={()=>navigate(homePath) }className={classes.logoContainer}>
          <Logo/>
        </IconButton>
        <div className={classes.btnContainer}>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(resourcesPath)}>
          Resources
        </Button>

        <Button  className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(coursesPath)}>
          Courses and Curricula
        </Button>
        <Button className={classes.navButton} fullWidth={true}
          onClick={()=>navigate(consultingPath)}>
          Consulting
        </Button>
        </div>

        {user.isGuest?
        <Button className={classes.accountBtn}
          onClick={()=>setModal(true)}>
          Login / Create Account
        </Button>
        :
        <Button className={classes.accountBtn}
          onClick={()=>navigate(accountPath)}>
          My Account
        </Button>
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