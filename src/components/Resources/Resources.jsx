import  Button from "@material-ui/core/Button"
import  CardActionArea  from "@material-ui/core/CardActionArea"
import  Grid  from "@material-ui/core/Grid"
import  makeStyles  from "@material-ui/styles/makeStyles"
import  Typography  from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import ResourceCard from "../ResourceCard/ResourceCard"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    width: "100%",
    maxWidth: "1200px",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "auto",
    columnGap: "10px",
    rowGap: "10px"

  }
}))

export const Resources = ({resources}) => {
  const classes = useStyles()
  if(resources.length === 0)return<p>No Resources</p>
  return(
    <Grid className={classes.root}>
      {resources.map(resource => {
        return(
        <ResourceCard resource={resource}/>
        )
      })}
    </Grid>
  )
}

export default Resources