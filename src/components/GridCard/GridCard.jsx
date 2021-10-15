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
import { getImage, maybe } from "../../misc"
import DefaultImage from "../DefaultImage"
import { ResourceDefaultImage } from "../DefaultImage/DefaultImage"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: 'grid',
    width: 300,
    gridTemplateColumns: '1fr',
    gridTemplateRows: "300 50 50"
  },
  cardMedia: {
    height: 300
  }
}))

export const GridCard = ({
  item,
  itemUrl,

}) => {
  const navigate = useNavigator()
  const classes = useStyles()
  const image = getImage(item)
  const handleClick = () => navigate(itemUrl(item.id), true)
  return(
    <Card elevation={0} className={classes.root} key={item.id}>
      {image?
      <CardMedia
        className={classes.cardMedia}
        image={image}
      />
      :
      <DefaultImage item={item}/>
      }
      <CardContent>
      <Typography variant="body1">{item.name}</Typography>
      {item.descriptionJson !== "{}"
      ?
        <Typography>{item.descriptionJson}</Typography>
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

export default GridCard