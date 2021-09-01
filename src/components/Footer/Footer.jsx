import {
  Typography,
  makeStyles,
  Grid,
  Container,
  ButtonBase
} from "@material-ui/core"
import LogoWhite from "../../assets/icons/logo-white"
import useNavigator from "../../hooks/useNavigator"
import { aboutPath } from "../../views/about/urls"
import { consultingPath } from "../../views/consulting/urls"
import { coursesPath } from "../../views/courses/urls"
import { resourcesPath } from "../../views/resources/urls"

const useStyles = makeStyles(theme => ({
  footer: {
    background: theme.palette.primary.main,
    display: 'grid',
    gridTemplateColumns: '1fr 100px 100px 190px 0.3fr',
    gridTemplateRows: '60px 60px',
    paddingTop: 50,
    paddingBottom: 20
  },
  logoContainer: {
    gridColumn: 1,
    gridRow: '1/3',
    width: '50%',
    maxWidth: 400,
    // margin: 'auto',
    marginLeft: 0
  },
  logo: {
    height: 'auto',
    width: '100%',
    // maxWidth: 200,
    // margin: 'auto'
  },
  btn: {
    height: '30px',
    margin: 'auto',
    color: 'white',
    marginLeft: 0,
    marginTop: 0,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  // contact: {
  //   gridColumn: '2 / 4',
  //   gridRow: 2
  // },
  newsletter:{
    gridColumn: '2 / -1',
    gridRow: 2
  }
}))

export default function Footer(){
  const classes = useStyles()
  const navigator = useNavigator()
  return(
    <Grid container className={classes.footer}>
      <Container className={classes.logoContainer}>
        <LogoWhite className={classes.logo}/>
      </Container>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(consultingPath)} variant="body1" color="textSecondary">Consulting</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(resourcesPath)} variant="body1" color="textSecondary">Resources</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(coursesPath)} variant="body1" color="textSecondary">Courses and Curricula</Typography>
      </ButtonBase>
      <ButtonBase className={classes.btn}>
        <Typography onClick={()=>navigator(aboutPath)} variant="body1" color="textSecondary">About</Typography>
      </ButtonBase>

      {/* <Typography className={classes.contact} variant="body1" color="textSecondary">info@bluecollarhomeschool.com</Typography> */}
      <Typography className={classes.newsletter} variant="body1" color="textSecondary">Sign up for our Quarterly Newsletter</Typography>
    </Grid>
  )
}