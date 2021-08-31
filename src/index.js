import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from "./reducers"
import {createStore} from "redux"
import {loadState, saveState} from "./localstorage"
import {setContext} from "apollo-link-context"

import Messages from './components/messages';
import theme from "./theme"
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Routes from './Routes';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createUploadLink } from 'apollo-upload-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ApolloLink } from '@apollo/client/core';
const persistedState = loadState()

const store = createStore(
  reducer,
  persistedState
)

store.subscribe(() => {
  saveState(store.getState())
})

const linkConfig = {
  credential: "include",
  uri: "http://127.0.0.1:8000/graphql/"
}

const uploadLink = createUploadLink(linkConfig)
const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkConfig
})


const authLink = setContext((_, {headers}) => {
  let token;
  const state = store.getState()
  const user = state.user.user
  if(user.token){
    token = user.token
    return {
      headers: {
        ...headers,
        Authorization: `JWT ${token}`
      }
    }
  } else {
    return{
      headers: {
        ...headers
      }
    }
  }
})

const link = ApolloLink.split(
  operation => operation.getContext().useBatching,
  batchLink,
  uploadLink
)


const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
  }
)

const history = createBrowserHistory()

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider theme={theme}>
            <Routes/>
          </MuiThemeProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  ,
  document.getElementById('blue-collar-homeschool')
);

