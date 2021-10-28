import { Route, Switch } from "react-router"
import BlogPage from "../../components/BlogPage"
import BlogPostPage from "../../components/BlogPostPage/BlogPostPage"
import InfoCard from "../../components/InfoCard"
import { blogPath, blogPostUrl } from "./urls"

export const BlogPostList = () => {
  return (
    <div>
      <InfoCard
        heading3="Curious what we think?"
        heading1="Explore our Blog"
        />
      <BlogPage/>
    </div>
  )
}

export const PostView = ({ match }) => {
  return (
    <BlogPostPage id={decodeURIComponent(match.params.id)}/>
  )
}


export const BlogView = () => {
  return(
    <Switch>
      <Route exact path={blogPath} component={BlogPostList}/>
      <Route path={blogPostUrl(":id")} component={PostView}/>
    </Switch>
  )
}

export default BlogView