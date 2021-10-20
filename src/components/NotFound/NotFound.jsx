import {Typography, Grid, Button, makeStyles} from "@material-ui/core"

const useStyles = makeStyles( theme => ({
  root: {
    height: "80vh",
    background: theme.palette.secondary.main
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
      <Typography variant="h1" color="textSecondary">{title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">{subtitle}</Typography>
      <Button onClick={onClick}
      variant="containedPrimary"
      >{buttonText}</Button>
    </Grid>
  )
}

export default NotFound