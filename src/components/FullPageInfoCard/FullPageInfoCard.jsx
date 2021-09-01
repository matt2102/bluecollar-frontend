import {
  Button,
  Grid,
  Typography,
  Card,
  makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme =>({
  grid: {
    margin: 'auto',
    width: "100%",
    maxWidth: '1600px',
    gridColumn: '1/-1',
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: '50px',
  },
  img: {
    width: '100%',
    height: 'auto'
  },
  card: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 14
  },
  subtitle: {
    fontSize: 40,
    maxWidth: '24ch'
  },
  body: {
    fontWeight: 200,
    fontSize: 20,
    marginTop: 15,
    marginBottom: 25
  }
}))

export default function FullPageInfoCard(props){
  const {
    image,
    subtitleText,
    bodyText,
    onClick
  } = props
  const classes = useStyles()
  return(
    <Grid className={classes.grid}>
      <img className={classes.img} src={image}/>
      <Card elevation={0} className={classes.card} >
        <Typography className={classes.subtitle} variant="subtitle2" color="secondary">{subtitleText}</Typography>
        <Typography className={classes.body}  variant="body1">{bodyText}</Typography>
        <Button variant="containedPrimary" className={classes.cardElement} onClick={()=>onClick()}>
          Learn More
        </Button>
      </Card>
    </Grid>
  )
}