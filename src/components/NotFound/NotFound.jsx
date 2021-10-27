import {Typography, Grid, Button, makeStyles} from "@material-ui/core"

const useStyles = makeStyles( theme => ({
  root: {
    height: "80vh",
    background: theme.palette.secondary.main
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: '2rem'
    }
  },
  subtitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: '1rem'
    }
  }

}))

export const NotFound = (props) => {
  const {
    title,
    subtitle,
    onClick,
    buttonText
  } = props
  const classes = useStyles()
  return(
    <Grid container justify="center" direction="column" alignItems="center" className={classes.root}>
      <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>{subtitle}</Typography>
      <Typography variant="h1" color="textSecondary" className={classes.title}>{title}</Typography>
      <Button onClick={onClick}
      variant="containedPrimary"
      >{buttonText}</Button>
    </Grid>
  )
}

export default NotFound