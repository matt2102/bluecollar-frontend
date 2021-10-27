import { Container, Grid, makeStyles, Typography, CardMedia,Button } from "@material-ui/core"
import useNavigator from "../../hooks/useNavigator"
import { getDate, getImage } from "../../misc"
import { useBlogPostQuery } from "../../views/Blog/queries"
import { blogPath } from "../../views/Blog/urls"
import DefaultImage from "../DefaultImage"
import DescriptionJson from "../DescriptionJson/DescriptionJson"
import Loading from "../Loading"

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    margin: 'auto',
    background: theme.palette.secondary.main,
    marginBottom: theme.spacing(10),
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: '250px auto',
      maxWidth: 850,
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: '1fr',
      maxWidth: 400,
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: '350px 600px',
      maxWidth: 950,
    }
  },
  text: {
    color: theme.palette.text.secondary,
    fontFamily: "Roboto",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  cardMedia: {
    gridColumn: 1,
    marginTop: 25,
    marginLeft: 25,
    [theme.breakpoints.down("md")]: {
      height: 250,
      width: 250,
    },
    [theme.breakpoints.down("xs")]: {
      height: 200,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    [theme.breakpoints.up("lg")]: {
      height: 300,
      width: 300,
    }
  },
  btnContainer: {
    [theme.breakpoints.down("lg")]: {
      gridColumn: '1 / -1',
      gridRow: 0
    },
    [theme.breakpoints.down("xs")]: {
      gridColumn: 1,
      gridRow: 0
    },
    [theme.breakpoints.up("lg")]: {
      gridColumn: '1 / -1',
      gridRow: 0
    }
  }
}))

export const BlogPostPage = ({id}) => {
  const {data, loading} = useBlogPostQuery({
    variables: {
      id: id
    }
  })
  const navigator = useNavigator()
  const classes = useStyles()
  if(loading) return(<Loading/>)
  const post = data.blogpost
  const image = getImage(post)
  const d = getDate(post.created)
  return(
    <Grid className={classes.grid}>
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
      <Container>
        <Typography variant="h2" color="textSecondary" align="center">{post.title}</Typography>
        <Typography variant="body2" color="textSecondary" align="center">Published: {d}</Typography>
        <Container className={classes.text}>
          <DescriptionJson descriptionJson={post.content}/>
        </Container>
      </Container>
      <Grid container justify="center" className={classes.btnContainer}>
        <Button variant="containedPrimary"
        onClick={()=>navigator(blogPath)}
        >Back</Button>
      </Grid>
    </Grid>
  )
}

export default BlogPostPage