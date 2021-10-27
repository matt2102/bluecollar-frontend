import gql from 'graphql-tag'

export const BlogPost = gql`
  fragment BlogPost on BlogPost{
    id
    title
    image{
      url
      alt
    }
  }
`

export const BlogPostDetails = gql`
  fragment BlogPostDetails on BlogPost{
    id
    title
    content
    created
    image{
      url
      alt
    }
  }
`