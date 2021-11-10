import {makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(135deg, rgba(59,183,199,1) 27%, rgba(165,200,84,1) 75%, rgba(243,204,23,1) 100%)",
    // height: 300,
    display: 'flex',
    [theme.breakpoints.down("lg")]: {
      height: 250,
    },
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
    [theme.breakpoints.up("lg")]: {
      height: 300,
    }
  },
  yellow: {
    background: theme.palette.accent.yellow,
    display: 'flex',
    [theme.breakpoints.down("lg")]: {
      height: 250,
      width: 250
    },
    [theme.breakpoints.up("lg")]: {
      height: 400,
      width: 400
    },
  },
  yellowTitle: {
    color: theme.palette.background.default,
    margin: 'auto',
    fontSize: 34
  },
  title: {
    color: theme.palette.background.default,
    margin: 'auto',
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 18,
    },
  },
}))

export const DefaultImage = ({
  item,
  variant
}) => {
  const classes = useStyles()
  const name = item.name || "No Image Available"
  return(
    <>
    { variant?
      <div className={classes.yellow}>
      <Typography className={classes.yellowTitle} variant="h2">{name}</Typography>
      </div>
      :
      <div className={classes.root}>
      <Typography className={classes.title}>{name}</Typography>
    </div>
    }
    </>
  )
}

export default DefaultImage