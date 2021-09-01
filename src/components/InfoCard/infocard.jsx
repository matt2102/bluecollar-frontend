import { makeStyles } from "@material-ui/core"
import { Card, Typography } from "@material-ui/core"
// import Typography from "material-ui/styles/typography"

const useStyles = makeStyles(theme => ({
  infoCard: {
    background: theme.palette.secondary.main,
    height: '80vh',
    minHeight: 400,
    maxHeight: 900,
    display: "flex"
  },
  heading: {
    color: theme.palette.secondary.light,
  },
  heading3: {
    color: theme.palette.secondary.light,
    // fontWeight: '300',
  },
  textCard: {
    width: '70vw',
    minWidth: '400',
    margin: 'auto',
    // display: "flex"
  }
}))

export default function InfoCard(props){
  const {
    heading1,
    heading3,
    imgUrl,
    fullWidth
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