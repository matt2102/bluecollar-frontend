
import {
  Card,
  Typography,
  makeStyles,
  Button,
  CardMedia
} from "@material-ui/core"

const useStyles = makeStyles(theme =>({
  homecard:{
    display: 'flex',
    flexFlow: "column",
    justifyItems: "center",
    alignItems: "center",
  },
  media: {
    minHeight: 100,
    maxHeight: 400,
    width: 200,
  },
  subtitle: {
    paddingTop: 16,
    paddingBottom: 16
  },
  btnText: {
    color: theme.palette.green,
    fontSize: '20px'
  },
  body: {
    maxWidth: '40ch',
    fontSize: '22px',
    // fontWeight: 300
  }
}))

export default function HomeCard(props){
  const {
    image,
    subtitleText,
    bodyText,
    onClick,
    gridColumn
  } = props
  const classes = useStyles()
  return(
  <Card className={classes.homecard} elevation={0} style={{gridColumn: gridColumn}}>
    <CardMedia
      component="img"
      className={classes.media}
      image={image}/>
    <Typography variant='subtitle2' className={classes.subtitle}>{subtitleText}</Typography>
    <Typography variant='body2' align="center" className={classes.body}>{bodyText}</Typography>
    <Button variant='text' onClick={onClick}>
      <Typography variant='body1' className={classes.btnText}>Learn more &gt;</Typography>
    </Button>
  </Card>
  )
}
