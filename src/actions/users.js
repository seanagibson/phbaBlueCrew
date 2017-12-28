import api from '../api';
import { userLoggedIn } from './auth';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const signup = data => dispatch =>
  api.user.signup(data).then(res => {
    if (res.status === 200) {
      const { token } = res.data;
      window.localStorage.setItem('bluecrewStorage', token);
      setAuthorizationHeader(token);
      dispatch(userLoggedIn({ token, email: data.email, confirmed: true }));
    }
  });
