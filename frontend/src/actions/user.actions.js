import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  PASS_ALERT,
  RESET_ALERT,
} from './types';

export const passAlert = message => ({
  type: PASS_ALERT,
  payload: message,
});

export const verifyUserToken = ({ token }) => (dispatch) => {
  axios.post('/api/verifyToken', { token })
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data.user });
    }).catch(() => {
      localStorage.removeItem(token);
      dispatch({ type: UNAUTH_USER });
    });
};

export const signinUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: RESET_ALERT });

  axios.post('/api/signin', { email, password })
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
    }).catch(() => {
      dispatch(passAlert({
        message: 'Incorrect password or email',
        type: 'error',
      }));
    });
};

export const signupUser = values => (dispatch) => {
  const data = new FormData();
  data.append('email', values.email);
  data.append('password', values.password);
  data.append('firstName', values.firstName);
  data.append('middleName', values.middleName);
  data.append('surname', values.surname);
  data.append('address', values.address);
  data.append('postalcode', values.postalcode);
  data.append('country', values.country);
  data.append('city', values.city);
  data.append('state', values.state);
  data.append('identity', values.identity);
  data.append('residence', values.residence);

  axios.post('/api/signup', data)
    .then((response) => {
      dispatch(passAlert({
        message: response.data.message,
        type: 'success',
      }));
    }).catch((error) => {
      dispatch(passAlert({
        message: error.response.data.message,
        type: 'error',
      }));
    });
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
};

export const recoverPassword = email => (dispatch) => {
  dispatch({ type: RESET_ALERT });

  axios.post('/api/recoverPassword', { email })
    .then((response) => {
      dispatch(passAlert({
        message: response.data.message,
        type: 'success',
      }));
    }).catch((error) => {
      dispatch(passAlert({
        message: error.response.data.message,
        type: 'error',
      }));
    });
};

export const changePassword = (recoveryString, password) => (dispatch) => {
  dispatch({ type: RESET_ALERT });

  axios.post('/api/changePassword', { recoveryString, password })
    .then((response) => {
      dispatch(passAlert({
        message: response.data.message,
        type: 'success',
      }));
    }).catch((error) => {
      dispatch(passAlert({
        message: error.response.data.message,
        type: 'error',
      }));
    });
};

export const updateUserDocuments = values => (dispatch) => {
  dispatch({ type: RESET_ALERT });

  if (!values.identity && !values.residence) {
    return;
  }

  const data = new FormData();
  if (values.identity) {
    data.append('identity', values.identity);
  }

  if (values.residence) {
    data.append('residence', values.residence);
  }

  axios.post('/api/users/updateDocuments', data)
    .then((response) => {
      dispatch(passAlert({
        message: response.data.message,
        type: 'success',
      }));
    }).catch((error) => {
      dispatch(passAlert({
        message: error.response.data.message,
        type: 'error',
      }));
    });
};
