import { Typography, Card, CardContent, CardHeader, CardMedia, makeStyles, Tooltip } from "@material-ui/core"
import img from "../../assets/media/true_north.webp"
import img2 from "../../assets/media/cindy_profile.webp"

import {Add} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    width: 'auto',
    [theme.breakpoints.down('lg')]: {
      width: 450,
      margin: 'auto'
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
      margin: 'auto'
    },
    [theme.breakpoints.up('lg')]: {
      width: 500,
      margin: 'auto'
    },
  },
  media: {
    width: 200,
    [theme.breakpoints.down('sm')]: {
      width: 120
    }
  },
  profile: {
    height: 120,
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: 80
    }
  },
  icon: {
    color: theme.palette.text.main,
    fontSize: 50
  },
  content: {
    width: '100%',
    maxWidth: 400,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 250,
    }
  },
  tooltip: {
    '&&:hover': {
      cursor: 'pointer'
    }
  }
})
)

export const TrueNorthCard = () => {
  const classes = useStyles()
  return(
    <Card className={classes.root}>
      <CardHeader title={"This Course is taught at True North"}/>

      <CardContent className={classes.content}>
        <Tooltip title={
            <Typography variant="body2" color="textSecondary">Learn More About True North Homeschool Academy</Typography>
          }
          className={classes.tooltip}
          >
        <CardMedia
          onClick={()=>window.open("https://truenorthhomeschoolacademy.com/about-true-north-homeschool-academy/")}
          className={classes.media}
          component="img"
          image={img}/>
        </Tooltip>
        <Add className={classes.icon}/>
        <Tooltip title={
          <Typography variant="body2" color="textSecondary">View Cindy's Profile at True North Homeschool Academy</Typography>
        }
        className={classes.tooltip}
        >
          <CardMedia
            onClick={()=>window.open("https://truenorthhomeschoolacademy.com/cindy-lajoy/")}
            className={classes.profile}
            component="img"
            image={img2}/>

        </Tooltip>
        </CardContent>
    </Card>
  )

}


export default TrueNorthCard
