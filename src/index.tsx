
/*
https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

https://material.io/develop/web/
https://material.io/develop/web/components/top-app-bar/
https://material.io/resources/

https://material-ui.com/components/app-bar/
https://reactjs.org/docs/hooks-effect.html
*/

import { setConfig, cold } from 'react-hot-loader';

setConfig({
  reloadHooks: true,
  onComponentCreate: (type, name) => (
    String(type).indexOf('useState') > 0 ||
    String(type).indexOf('useEffect') > 0) && cold(type),
});

/*

client.query({ query: gql`
{
  rates(currency: "USD") {
    currency
    rate
  }
} `}
).then(console.log).catch(console.warn);
*/


import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import { ApolloProviderWrapper } from "./ApolloHelper";

import App from "./components/App";
import { GroupedContextProvider } from "./contexts/GroupedContextProvider";
import reducer from "./reducers";

export const store = createStore(reducer);

ReactDOM.render(
  <ApolloProviderWrapper>
    <Provider store={store}>
      <GroupedContextProvider>
        <App />
      </GroupedContextProvider>
    </Provider>
  </ApolloProviderWrapper>
  ,
  document.getElementById("app")
);

declare global {
  interface Window {
    gql: any;
    TEXT_CLIP_PAGE_VISIBILITY: any;
    client: any
  }
}

import gql from "graphql-tag";
window.gql = gql;
import { TEXT_CLIP_PAGE_VISIBILITY } from "./constants/Query";
window.TEXT_CLIP_PAGE_VISIBILITY = TEXT_CLIP_PAGE_VISIBILITY;
import { client } from "./ApolloHelper";
window.client = client;