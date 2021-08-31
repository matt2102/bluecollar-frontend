import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  makeStyles
} from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { maybe } from "../../misc"
import { resourceUrl } from "../../views/resource/urls"
import { ResourceDefaultImage } from "../ResourceDefaultImage/ResourceDefaultImage"
// import { CardMedia } from "material-ui"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    width: 300,
    gridTemplateColumns: '1fr',
    gridTemplateRows: "300 50 50"
  },
  cardMedia: {
    height: 300
  }
}))

export const ResourceCard = ({resource}) => {
  const navigate = useNavigator()
  const classes = useStyles()
  const image = maybe(()=>resource.image.url, "")
  const handleClick = () => navigate(resourceUrl(resource.id), true)
  return(
    <Card elevation={0} className={classes.root}>
      {image?
      <CardMedia
        className={classes.cardMedia}
        image={image}
      />
      :
      <ResourceDefaultImage resource={resource}/>
      }
      <CardContent>
      <Typography variant="body1">{resource.name}</Typography>
      {resource.descriptionJson !== "{}"
      ?
        <Typography>{resource.descriptionJson}</Typography>
        :
        null
      }
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={()=>handleClick()}>
          Visit
        </Button>
      </CardActions>
    </Card>
  )
}

export default ResourceCard