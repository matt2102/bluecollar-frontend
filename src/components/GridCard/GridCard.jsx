import {
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  makeStyles,
  Tooltip
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
  },
  tooltip: {
    "&:hover": {
      cursor: 'pointer',
    }
  }
}))

const CardTitle = (props) => {
  const {
    name,
    classes
  } = props
  console.log(name, name.length)
  let title = ""
  const makeTitle = (arr, result) => {
    if(result.length >= 27 || arr.length === 0){
      return result + ' ...'
    }
    const nextWord = arr.shift()
    if(result.length + nextWord.length + 1 <= 27){
      const newResult = result + " " + nextWord
      return makeTitle(arr, newResult)
    } else {
      return result + ' ...'
    }

  }

  if(name.length >= 27){
    const arr = name.split(" ")
    title = makeTitle(arr, "")
    return (
      <Tooltip placement="top" title={
        <Typography key={'title-' + name} color="textSecondary">{name}</Typography>
      } className={classes.tooltip}>
        <Typography key={'title-' + name}>{title}</Typography>
      </Tooltip>

    )
  } else {
    return(
      <Typography key={'title-' + name}>{name}</Typography>
    )
  }
}

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
        <CardTitle name={item.name} classes={classes}/>
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