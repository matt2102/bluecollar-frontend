import { stringify as stringifyQs } from "qs";
import useNavigator from "./useNavigator"

export function createPaginationState(
  paginateBy,
  queryString
){
  if(queryString.after){
    return {
      after: queryString.after,
      first: paginateBy
    }
  }
  if(queryString.before){
    return {
      before: queryString.before,
      last: paginateBy
    }
  }
  return{
    first: paginateBy
  }
}

function usePaginator(){
  const navigate = useNavigator()
  function paginate(
    pageInfo,
    paginationState,
    queryString
  ){
    const loadNextPage = () => {
      navigate(
        "?" + stringifyQs({
          ...queryString,
          after: pageInfo.endCursor,
          before: undefined
        }),
        true
      )
    };
    const loadPreviousPage = () => {
      navigate(
        "?" +
          stringifyQs({
            ...queryString,
            after: undefined,
            before: pageInfo.startCursor
          }),
        true
      );
    }

    const newPageInfo = pageInfo
      ? {
        ...pageInfo,
        hasNextPage: !!paginationState.before || pageInfo.hasNextPage,
        hasPreviousPage: !!paginationState.after || pageInfo.hasPreviousPage
      }
      : undefined
    return {
      loadNextPage,
      loadPreviousPage,
      pageInfo: newPageInfo
    };
  }
  return paginate
}

export default usePaginator
