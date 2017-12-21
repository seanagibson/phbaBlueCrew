import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import rootReducer from "./rootReducer";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./app";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";



const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bluecrewJWT) {
  const payload = decode(localStorage.bluecrewJWT);
  const user = {
    token: localStorage.bluecrewJWT,
    email: payload.email,
    confirmed: payload.confirmed
  };
  setAuthorizationHeader(localStorage.bluecrewJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

registerServiceWorker();