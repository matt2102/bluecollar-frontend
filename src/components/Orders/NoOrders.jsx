import {makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    width: '98%',
    background: theme.palette.secondary.light,
    height: '60vh',
    margin: "auto",
    display: 'flex'
  },
  title: {
    margin: 'auto',
    fontSize: 30
  }
}))

export const NoOrders = () => {
  const classes = useStyles()
  return(
    <div className={classes.root}>
      <Typography className={classes.title} variant="body1">No Orders Placed</Typography>
    </div>
  )
}

export default NoOrders