import urlJoin from "url-join"


export const blogPath = "/blog/"
export const blogPostUrl = (id) => urlJoin(blogPath + id)