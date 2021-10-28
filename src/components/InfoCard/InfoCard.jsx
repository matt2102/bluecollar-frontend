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
  body: {

  },
  textCard: {
    minWidth: '400',
    width: '100%',
    margin: 'auto',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('xs')]:{
      minWidth: 'none',
      marginLeft: 8,
      zIndex: 10
    },
  },
  imgContainer: {
    padding: 0,
    width: '40%',
    height: '100%',
    display: 'flex',
    flexFlow: 'column-reverse nowrap',
  },
  img: {
    margin: 'auto',
    marginBottom: 0,
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '90%',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]:{
      marginLeft: 0,
    },
  }

}))

export default function InfoCard(props){
  const {
    heading1,
    heading3,
    body,
    img,
  } = props
  const classes = useStyles()
  return(
    <div className={classes.infoCard}>
      <div className={classes.textCard}>
        {heading3?<Typography className={classes.heading3} variant='h3'>{heading3}</Typography>:null}
        <Typography className={classes.heading} variant='h1'>{heading1}</Typography>
        {body?<Typography className={classes.body} variant='body1' color="textSecondary">{body}</Typography>:null}
      </div>
      {img?
      <div className={classes.imgContainer}>
        <img src={img} className={classes.img} alt="Surprised Child"/>
      </div>:null
      }
    </div>
  )
}