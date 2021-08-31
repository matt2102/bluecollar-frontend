import {makeStyles, Typography} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(135deg, rgba(59,183,199,1) 27%, rgba(165,200,84,1) 75%, rgba(243,204,23,1) 100%)",
    height: 300,
    display: 'flex'
  },
  title: {
    color: theme.palette.background.default,
    margin: 'auto',
    fontSize: 24
  }
}))

export const ResourceDefaultImage = ({resource}) => {
  const classes = useStyles()
  return(
    <div className={classes.root}>
      <Typography className={classes.title}>{resource.name}</Typography>
    </div>
  )
}