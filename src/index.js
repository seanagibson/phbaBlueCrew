import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import rootReducer from './rootReducer';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { userLoggedIn, checkJWT, logout } from './actions/auth';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store =
  process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
    : createStore(rootReducer, applyMiddleware(thunk));

const jwt = window.localStorage.getItem('bluecrewStorage');

if (jwt) {
  //check jwt is still valid
  if (checkJWT(jwt)) {
    const payload = decode(jwt);
    const user = {
      token: jwt,
      email: payload.email,
      confirmed: payload.confirmed,
    };
    setAuthorizationHeader(jwt);
    store.dispatch(userLoggedIn(user));
  } else {
    logout();
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,

  document.getElementById('root')
);

registerServiceWorker();
