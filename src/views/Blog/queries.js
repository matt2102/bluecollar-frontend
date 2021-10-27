import { BlogPost, BlogPostDetails } from "../../fragments/blog";
import { pageInfoFragment } from "../../fragments/pageinfo";
import makeQuery from "../../hooks/makeQuery";
import gql from "graphql-tag"


export const blogPosts = gql`
  ${BlogPost}
  ${pageInfoFragment}
  query BlogPosts(
    $first: Int
    $before: String
    $after: String
    $last: Int
    $filter: BlogPostFilterInput
    $sortBy: BlogPostSortingInput
  ){
    blogposts(
      first: $first,
      before: $before,
      after: $after,
      last: $last,
      filter: $filter,
      sortBy: $sortBy,
    ){
      edges{
        node{
          ...BlogPost
        }
      }
      pageInfo{
        ...PageInfoFragment
      }
    }
  }
`

export const blogPost = gql`
  ${BlogPostDetails}
  query BlogPost(
    $id: ID!
  ){
    blogpost(id: $id){
      ...BlogPostDetails
    }
  }
`

export const useBlogPostsQuery = makeQuery(blogPosts)
export const useBlogPostQuery = makeQuery(blogPost)