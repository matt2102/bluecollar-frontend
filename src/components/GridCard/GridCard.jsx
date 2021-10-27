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
import { getImage } from "../../misc"
import DefaultImage from "../DefaultImage"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: 'grid',
    gridTemplateColumns: '1fr',
    [theme.breakpoints.down("lg")]: {
      width: 250,
      gridTemplateRows: "250px 50px 50px",

    },
    [theme.breakpoints.up("lg")]: {
      width: 300,
      gridTemplateRows: "300px 50px 50px",
    }
  },
  cardMedia: {
    [theme.breakpoints.down("lg")]: {
      height: 250,
    },
    [theme.breakpoints.up("lg")]: {
      height: 300,
    }
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