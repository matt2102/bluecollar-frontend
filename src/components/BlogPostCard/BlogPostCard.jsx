import { CardMedia, Card, CardHeader , CardActionArea, CardContent, makeStyles, Button, Container, Grid } from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { blogPostUrl } from "../../views/Blog/urls"
import { getImage } from "../../misc"
import DefaultImage from "../DefaultImage"

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    [theme.breakpoints.down("md")]: {
      width: 270,
    },
    [theme.breakpoints.up("lg")]: {
      width: 320,
    }
  },
  cardMedia: {
    [theme.breakpoints.down("md")]: {
      height: 250,
      width: 250,
    },
    [theme.breakpoints.up("lg")]: {
      height: 300,
      width: 300,
    }
  }
}))

export const BlogPostCard = (props) => {
  const {
    post
  } = props
  const navigator = useNavigator()
  const image = getImage(post)
  const classes = useStyles()
  return(
    <Card className={classes.card}>
      <CardHeader title={post.title}/>
      <CardContent>
      {image?
      <CardMedia
        className={classes.cardMedia}
        image={image}
      />
      :
      <Container className={classes.cardMedia}>
        <DefaultImage item={post} />
      </Container>
      }
      </CardContent>
      <CardActionArea>
        <Grid container justify="center">
        <Button onClick={()=>{navigator(blogPostUrl(post.id))}} variant="containedPrimary">Read</Button>
        </Grid>
      </CardActionArea>
    </Card>
  )
}

export default BlogPostCard