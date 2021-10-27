import { makeStyles } from "@material-ui/core"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  infoCard: {
    background: theme.palette.secondary.main,
    height: '85vh',
    display: "flex",
    [theme.breakpoints.down('xs')]:{
      minHeight: 500,
      maxHeight: 900,
    },
  },
  heading: {
    color: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]:{
      margin: 0,
      padding: 0,
    },
  },
  heading3: {
    color: theme.palette.secondary.light,
    [theme.breakpoints.down('xs')]:{
      margin: 0,
      padding: 0,
    },
  },
  textCard: {
    width: '70vw',
    minWidth: '400',
    margin: 'auto',
    [theme.breakpoints.down('xs')]:{
      minWidth: 'none',
      marginLeft: 8,
    },
  }
}))

export default function InfoCard(props){
  const {
    heading1,
    heading3,
  } = props
  const classes = useStyles()
  return(
    <div className={classes.infoCard}>
      <div className={classes.textCard}>
        {heading3?<Typography className={classes.heading3} variant='h3'>{heading3}</Typography>:null}
        <Typography className={classes.heading} variant='h1'>{heading1}</Typography>
      </div>
    </div>
  )
}