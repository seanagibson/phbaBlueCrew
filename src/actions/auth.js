import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../types';
import api from '../api';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(res => {
    if (res.status === 200) {
      const { token } = res.data;
      window.localStorage.setItem('bluecrewStorage', token);
      setAuthorizationHeader(token);
      dispatch(userLoggedIn({ token, email: credentials.email, confirmed: true }));
    }
  });

export const logout = () => dispatch => {
  window.localStorage.removeItem('bluecrewStorage');
  setAuthorizationHeader();
  dispatch(userLoggedOut());
};

export const checkJWT = token => dispatch =>
  api.user.validateToken(token).then(res => {
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  });
