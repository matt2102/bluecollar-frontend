import { useState } from "react"
import useNavigator from "../../hooks/useNavigator"
import {
  Typography,
  makeStyles,
  Grid,
  Container,
  ButtonBase,
  useMediaQuery
} from "@material-ui/core"

import LogoWhite from "../../assets/icons/logo-white"
import LogoTrimmedWhite from "../../assets/icons/logo-trimmed-white"

import NewsletterDialog from "../NewsletterDialog/NewsletterDialog"

import { aboutPath } from "../../views/About/urls"
import { consultingPath } from "../../views/Consulting/urls"
import { programsPath } from "../../views/Programs/urls"
import { resourcesPath } from "../../views/Resources/urls"


const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.primary.main,
    display: 'grid',
    paddingTop: 50,
    paddingBottom: 20,
    [theme.breakpoints.down('lg')]:{
      gridTemplateColumns: 'minmax(300px, 400px) 0.4fr 1fr',
      gridTemplateRows: '100px 60px 60px',
    },
    [theme.breakpoints.down('sm')]:{
      gridTemplateColumns: '150px 1px 1fr',
      gridTemplateRows: 'auto 60px 60px',
    },
    [theme.breakpoints.up('lg')]:{
      gridTemplateColumns: 'minmax(300px, 400px) 0.5fr 1fr',
      gridTemplateRows: '60px 60px 60px',
    }
  },
  logoContainer: {
    gridColumn: 1,
    gridRow: '1/3',
    // width: 100,
    [theme.breakpoints.down('sm')]:{
      marginLeft: "auto",
      margin: "auto",
    },
    [theme.breakpoints.up('md')]:{
      marginLeft: 0,
    }
  },
  logo: {
    display: 'block',
    height: 100,
    // width: '50%',
    maxWidth: 50,
    margin: 'auto',
    marginLeft: 50
  },
  btn: {
    height: '30px',
    color: 'white',
    margin: theme.spacing(3),
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  newsletter:{
    gridColumn: '3 / -1',
    gridRow: 2,
    '&:hover': {
      cursor: "pointer",
      textDecoration: 'underline'
    }
  },
  contact: {
    gridColumn: '3 / -1',
    gridRow: 3,
  },
  buttonContainer: {
    flexFlow: "row wrap",
    justifyContent: 'flex-start',
    alignContent: "flex-start",
    [theme.breakpoints.down('sm')]:{
      flexFlow: "column nowrap",
      justifyContent: 'flex-start',
      alignItems: "flex-start",
    },

  }
}))

export default function Footer(){
  const classes = useStyles()
  const navigator = useNavigator()
  const [open, setModal] = useState(false)
  const slimIcon = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const data = {
    emailOptIn: true
  }
  return(
    <>
    <Grid container className={classes.footer}>
      <Container className={classes.logoContainer}>
        {slimIcon?
        <LogoTrimmedWhite className={classes.logo}/>
        :
        <LogoWhite className={classes.logo}/>
        }
      </Container>
      <Container></Container>
      <Grid container className={classes.buttonContainer}>

      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(consultingPath)} variant="body1" color="textSecondary">Consulting</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(resourcesPath)} variant="body1" color="textSecondary">Resources</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(programsPath)} variant="body1" color="textSecondary">{slimIcon?"Certificate":"Request a Certificate"}</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(aboutPath)} variant="body1" color="textSecondary">About</Typography>
      </ButtonBase>
      </Grid>
      <Typography className={classes.newsletter} variant="body1" color="secondary"
      onClick={()=>setModal(true)}
      >Subscribe to our Quarterly Newsletter</Typography>
      <Typography className={classes.contact} variant="body1" color="textSecondary"
      >cindy@bluecollarhomeschool.com</Typography>

    </Grid>
    <NewsletterDialog
        className={classes.newsletter}
        data = {data}
        title= "Subscribe"
        open={open}
        onClose = {()=>setModal(false)}
        disabled={false}
      />
    </>
  )
}