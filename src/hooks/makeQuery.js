// import { useEffect } from "react";
import {useQuery as useBaseQuery} from "@apollo/client"
import useMessages from "./useMessages"
import useUser from "./useUser"

async function handleQueryAuthError(
  error,
  message,
  // tokenRefresh,
  signOut,
) {
  // if (error.graphQLErrors.some(isJwtError)) {
  //   if (error.graphQLErrors.every(isTokenExpired)) {
  //     // const success = await tokenRefresh();
  //     // TODO write tokenRefresh()
  //     const success = true
  //     if (!success) {
  //       signOut();
  //       message({
  //         messageType: "error",
  //         text: "Session Expired."
  //       });
  //     }
  //   } else {
  //     signOut();
  //     message({
  //       messageType: "error",
  //       text: "Something went wrong."
  //     });
  //   }
  // }
  // else {
    message({
      messageType: "error",
      text: "Something went wrong."
    });
  // }
}


function makeQuery(query){
  function useQuery({
    // displayLoader,
    skip,
    variables
  }){
    const {addMessage} = useMessages()
    const {signOut} = useUser()
    const queryData = useBaseQuery(query, {
      context: {
        useBatching: true
      },
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      onError: error => {handleQueryAuthError(
        error,
        addMessage,
        signOut
      )},
      skip,
      variables
    });

    // useEffect(() => {
    //   if(displayLoader){

    //   }
    // })

    const loadMore = (
      mergeFunc,
      extraVariables
    ) => queryData.fetchMore({
      query,
      updateQuery: (previousResults, {fetchMoreResult}) => {
        if(!fetchMoreResult){
          return previousResults;
        }
        return mergeFunc(previousResults, fetchMoreResult)
      },
      variables: { ...variables, ...extraVariables}
    });
    return {
      ...queryData,
      loadMore
    };
  }
  return useQuery
}

export default makeQuery