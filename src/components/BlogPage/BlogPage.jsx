import { useLocation } from "react-router"
import usePaginator, { createPaginationState } from "../../hooks/usePaginator"
import useSort from "../../hooks/useSort"
import { useBlogPostsQuery } from "../../views/Blog/queries"
import { parse as parseQs } from "qs";
import { Container, Grid, makeStyles } from "@material-ui/core";
import useFilter from "../../hooks/useFilter";
import { maybe } from "../../misc";
import BlogPostCard from "../BlogPostCard/BlogPostCard";
import Paginate from "../Paginate";
import Loading from "../Loading";

const useStyles = makeStyles(theme => ({
  grid: {
    maxWidth: 1200,
    margin: 'auto',
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: 'flex',
    [theme.breakpoints.up("sm")]: {
      flexFlow: 'row wrap',
      justifyContent: 'space-evenly',
      alignContent: 'flex-start'

    },
    [theme.breakpoints.down("xs")]: {
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignContent: 'center'
    }
  },
  page: {
    gridRow: 0,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-evenly'
  }
}))

export const BlogPage = () => {
  const classes = useStyles()
  const location = useLocation()
  const qs = parseQs(location.search.substr(1))
  const pagAmount = 25
  const paginate = usePaginator()
  const {sortVariables} = useSort(qs)
  const {filters} = useFilter(qs, [])
  const paginationState = createPaginationState(pagAmount, qs)
  const {data, loading} = useBlogPostsQuery({
    variables: {
      ...paginationState,
      filter: filters,
      sort: sortVariables
    }
  })
  if(loading) return (<Loading/>)
  const posts = maybe(()=> data.blogposts.edges.map(edge => edge.node), [])
  const {loadNextPage, loadPreviousPage, pageInfo} = paginate(
    maybe(() => data.blogposts.pageInfo),
    paginationState,
    qs
  )
  return(
    <Grid container className={classes.grid}>
      {posts.map(post => {
        return(
          <BlogPostCard post={post}/>
        )
      })}
      <Container className={classes.page}>
        <Paginate
        pageInfo={pageInfo}
        loadPreviousPage={loadPreviousPage}
        loadNextPage={loadNextPage}/>
      </Container>
    </Grid>
  )
}

export default BlogPage